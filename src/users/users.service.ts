import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserInvalidPasswordError, UserNotFoundError } from './user.error';
import { UsersRepository } from './users.repository';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create({
      ...createUserDto,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.toResponse(user);
  }

  async findAll() {
    const users = await this.usersRepository.findAll();

    return users.map(this.toResponse);
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return this.toResponse(user);
  }

  async update(id: string, dto: UpdatePasswordDto) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new UserNotFoundError();
    }
    if (user.password !== dto.oldPassword) {
      throw new UserInvalidPasswordError();
    }

    await this.usersRepository.update(id, {
      password: dto.newPassword,
      version: user.version + 1,
      // updatedAt: new Date(),
    });

    return this.findOne(id);
  }

  async remove(id: string) {
    const user = await this.usersRepository.remove(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  private toResponse({ password, ...user }: User) {
    return user;
  }
}
