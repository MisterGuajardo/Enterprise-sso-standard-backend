import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenProvider } from '../../domain/ports/token.provider';
import { JwtPayload } from '../../domain/types/jwt-payload.type';

@Injectable()
export class JwtRsaAdapter implements ITokenProvider {
  constructor(private readonly jwtService: JwtService) {}

  async signPayload(payload: JwtPayload): Promise<string> {
    try {
      const token = await this.jwtService.signAsync(payload);
      return token;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al firmar las credenciales de identidad',
      );
    }
  }
}
