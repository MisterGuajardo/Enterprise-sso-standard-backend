import { Injectable } from '@nestjs/common';
import { CreateUserSystemDto } from './dto/create-user-system.dto';
import { UpdateUserSystemDto } from './dto/update-user-system.dto';

@Injectable()
export class UserSystemService {
  create(createUserSystemDto: CreateUserSystemDto) {
    return 'This action adds a new userSystem';
  }

  findAll() {
    return `This action returns all userSystem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userSystem`;
  }

  update(id: number, updateUserSystemDto: UpdateUserSystemDto) {
    return `This action updates a #${id} userSystem`;
  }

  remove(id: number) {
    return `This action removes a #${id} userSystem`;
  }
}
