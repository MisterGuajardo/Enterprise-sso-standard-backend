import { IsEmail, IsNotEmpty, IsString, MinLength, IsUrl, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'usuario@empresa.com' })
  @IsEmail({}, { message: 'El formato del correo no es válido' })
  @IsNotEmpty({ message: 'El correo es requerido' })
  email: string;

  @ApiProperty({ example: 'MiSuperPassword123!' })
  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiPropertyOptional({ example: 'https://sistema-cliente.com' })
  @IsOptional()
  @IsUrl({}, { message: 'El formato de la URL del sistema no es válido' })
  systemUrl?: string;
}