import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  createUser(createDto: CreateUserDto) {
    const newUser: User = {
      id: Date.now(),
      ...createDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: any) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updateUserDto };
      return this.users[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index !== -1) {
      const deletedUser = this.users.splice(index, 1);
      return this.users;
    }
    return null;
  }
}
