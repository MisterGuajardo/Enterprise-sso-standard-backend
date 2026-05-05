import { Test, TestingModule } from '@nestjs/testing';
import { UserSystemController } from './user-system.controller';
import { UserSystemService } from './user-system.service';

describe('UserSystemController', () => {
  let controller: UserSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSystemController],
      providers: [UserSystemService],
    }).compile();

    controller = module.get<UserSystemController>(UserSystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
