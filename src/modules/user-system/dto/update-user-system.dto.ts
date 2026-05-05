import { PartialType } from '@nestjs/swagger';
import { CreateUserSystemDto } from './create-user-system.dto';

export class UpdateUserSystemDto extends PartialType(CreateUserSystemDto) {}
