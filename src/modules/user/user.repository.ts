import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findUserWithSystemsByEmail(email: string): Promise<User | null> {
    return this.createQueryBuilder('user')
      .innerJoinAndSelect('user.state', 'state')
      .leftJoinAndSelect('user.userSystems', 'userSystem')
      .leftJoinAndSelect('userSystem.system', 'system')
      .where('user.email = :email', { email })
      .getOne();
  }
}