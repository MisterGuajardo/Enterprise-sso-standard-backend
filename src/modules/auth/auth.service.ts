import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { StateEnum } from '../state/state.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password, systemUrl } = loginDto;

    const user = await this.userService.findForAuth(email);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (user.stateId === StateEnum.INACTIVE) {
      throw new UnauthorizedException('El usuario se encuentra inactivo');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }


    const activeSystemRelation = user.userSystems.find(
      (userSystem) => userSystem.system && userSystem.system.url === systemUrl
    );

    const hasSystemAccess = !!activeSystemRelation;

    const destinationUrl = hasSystemAccess 
      ? systemUrl 
      : this.configService.get<string>('app.portalUrl');

    const activeSystem = hasSystemAccess ? activeSystemRelation.system : null;

    const payload: any = {
      sub: user.id,
      email: user.email,
      stateId: user.stateId,
    };

    if (activeSystem) {
      payload.currentSystemId = activeSystem.id;
    }

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      redirectUrl: destinationUrl,
      accessGrantedToRequestedSystem: hasSystemAccess,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      system: activeSystem ? {
        id: activeSystem.id,
        name: activeSystem.name,
      } : null,
    };
  }
}