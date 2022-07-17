import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { RootRepository } from 'src/common/root.repository';
import { User } from './schemas/user.schema';

type CreateUser = Omit<User, 'id'>;
type UpdateUser = Omit<User, 'id' | 'login' | 'createdAt'>;

type Response = Omit<User, 'password'>; // eslint-disable-line @typescript-eslint/no-unused-vars

@Injectable()
export class UsersRepository extends RootRepository<
  User,
  CreateUser,
  UpdateUser
> {
  constructor() {
    super([
      {
        id: randomUUID(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        login: 'admin',
        password: 'password',
        version: 1,
      },
    ]);
  }
}
