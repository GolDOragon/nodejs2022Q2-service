import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotExistError extends HttpException {
  constructor(name: string) {
    super(`${name} not found`, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class EntityNotInFavoritesError extends HttpException {
  constructor(name: string) {
    super(`${name} not in favorites`, HttpStatus.NOT_FOUND);
  }
}
