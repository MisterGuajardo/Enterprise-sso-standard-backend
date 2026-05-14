import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../application/auth.service';
import { LoginDto } from './dtos/login.dto';
import { LoginCredentials } from '../domain/types/login-credentials.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
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
