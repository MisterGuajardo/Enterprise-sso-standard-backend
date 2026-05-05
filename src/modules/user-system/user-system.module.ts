import { Module } from '@nestjs/common';
import { UserSystemService } from './user-system.service';
import { UserSystemController } from './user-system.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSystem } from './entities/user-system.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSystem])],
  controllers: [UserSystemController],
  providers: [UserSystemService],
})
export class UserSystemModule {}
