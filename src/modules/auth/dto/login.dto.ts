import { IsEmail, IsNotEmpty, IsString, MinLength, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ example: 'https://sistema-cliente.com' })
  @IsUrl({}, { message: 'El formato de la URL del sistema no es válido' })
  @IsNotEmpty({ message: 'La URL del sistema es requerida para validar el acceso' })
  systemUrl: string;
}