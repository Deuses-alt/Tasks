// src/user/users.controller.ts
import { Controller, Post } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('generate')
  async generateUsers() {
    return this.usersService.generateUsers(100); 
  }

  @Post('reset-problems')
  async resetProblems() {
    const count = await this.usersService.resetProblems();
    return { resetCount: count };
  }
}
