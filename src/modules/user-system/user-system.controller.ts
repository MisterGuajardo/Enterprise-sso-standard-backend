import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserSystemService } from './user-system.service';
import { CreateUserSystemDto } from './dto/create-user-system.dto';
import { UpdateUserSystemDto } from './dto/update-user-system.dto';

@Controller('user-system')
export class UserSystemController {
  constructor(private readonly userSystemService: UserSystemService) {}

  @Post()
  create(@Body() createUserSystemDto: CreateUserSystemDto) {
    return this.userSystemService.create(createUserSystemDto);
  }

  @Get()
  findAll() {
    return this.userSystemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSystemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserSystemDto: UpdateUserSystemDto) {
    return this.userSystemService.update(+id, updateUserSystemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSystemService.remove(+id);
  }
}
