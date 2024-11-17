// src/user/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async generateUsers(count: number): Promise<User[]> {
    const users: User[] = [];
    for (let i = 0; i < count; i++) {
      const user = new User();
      user.firstName = faker.name.firstName();
      user.lastName = faker.name.lastName();
      user.age = faker.number.int({ min: 18, max: 100 })
      user.gender = faker.helpers.arrayElement(['male', 'female']);
      user.hasProblem = faker.datatype.boolean();

      users.push(user);
    }
    return this.userRepository.save(users);
  }

  async resetProblems(): Promise<number> {
    const usersWithProblems = await this.userRepository.find({ where: { hasProblem: true } });
    const count = usersWithProblems.length;

    // Сброс флага для всех пользователей
    await this.userRepository.update({ hasProblem: true }, { hasProblem: false });

    return count;
  }
}
