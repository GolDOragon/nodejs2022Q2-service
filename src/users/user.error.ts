import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundError extends HttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}

export class UserInvalidPasswordError extends HttpException {
  constructor() {
    super('Invalid password', HttpStatus.FORBIDDEN);
  }
}
