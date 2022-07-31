import { HttpException, HttpStatus } from '@nestjs/common';

export class UnprocessableEntityError extends HttpException {
  constructor(name: string) {
    super(`${name} not found`, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class EntityAlreadyInFavoritesError extends HttpException {
  constructor(name: string) {
    super(`${name} is aldeady in favorites`, HttpStatus.CONFLICT);
  }
}

export class EntityNotInFavoritesError extends HttpException {
  constructor(name: string) {
    super(`${name} isn\'t in favorites`, HttpStatus.NOT_FOUND);
  }
}
