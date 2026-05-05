import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Domain Modules
import { UserModule } from './modules/user/user.module';
import { StateModule } from './modules/state/state.module';
import { SystemModule } from './modules/system/system.module';
import { UserSystemModule } from './modules/user-system/user-system.module';

// Configuration Files
import appConf from './config/app.conf';
import dbConf from './config/db.conf';
import jwtConf from './config/jwt.conf';
import { envValidationSchema } from './config/env.joi';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConf, dbConf, jwtConf],
      validationSchema: envValidationSchema,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('db.host'),
        port: configService.get<number>('db.port'),
        username: configService.get<string>('db.username'),
        password: configService.get<string>('db.password'),
        database: configService.get<string>('db.database'),
        synchronize: configService.get<boolean>('db.sync'),
        autoLoadEntities: true,
        options: {
          encrypt: false,
          trustServerCertificate: true,
        },
      }),
    }),

    UserModule,
    StateModule,
    SystemModule,
    UserSystemModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}