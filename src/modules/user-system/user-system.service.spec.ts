import { Test, TestingModule } from '@nestjs/testing';
import { UserSystemService } from './user-system.service';

describe('UserSystemService', () => {
  let service: UserSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSystemService],
    }).compile();

    service = module.get<UserSystemService>(UserSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
