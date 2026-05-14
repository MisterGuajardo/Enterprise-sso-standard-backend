import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
} from '@nestjs/swagger';
import { AuthService } from '../application/auth.service';
import { LoginDto } from './dtos/login.dto';
import { LoginCredentials } from '../domain/types/login-credentials.type';

/**
 * Controller responsible for handling authentication-related HTTP requests.
 * 
 * This class acts as a driving adapter in the Hexagonal Architecture, 
 * receiving external HTTP requests, validating incoming payloads via DTOs, 
 * and delegating the business logic to the application layer (AuthService).
 */
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  /**
   * Initializes the AuthController with the necessary application service.
   *
   * @param {AuthService} authService - The application service orchestrating the login use case.
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint to authenticate a user and issue a Single Sign-On (SSO) token.
   * 
   * It validates the provided credentials against an external identity provider 
   * and sets a secure, HTTP-only cookie containing the JWT for subsequent requests 
   * across satellite systems.
   *
   * @param {LoginDto} loginDto - The data transfer object containing the user's email and password.
   * @param {Response} response - The Express response object used to set the secure cookie.
   * @returns An object containing a success message and the generated access token.
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Authenticate user and generate SSO token',
    description: 'Validates credentials against an external system and returns an RSA-signed JWT. The token is also automatically set as an HttpOnly cookie.',
  })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'Authentication successful. Token generated and cookie set.',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Autenticación exitosa',
        },
        token: {
          type: 'string',
          description: 'JWT signed with RSA private key',
          example: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials or user not found in the external system.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error, configuration missing, or external system unreachable.',
  })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const credentials: LoginCredentials = {
      email: loginDto.email,
      plainPassword: loginDto.password,
    };

    const { accessToken } = await this.authService.login(credentials);

    response.cookie('sso_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    return {
      message: 'Autenticación exitosa',
      token: accessToken,
    };
  }
}