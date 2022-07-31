import { Injectable } from '@nestjs/common';
import { RootRepository } from 'src/common/root.repository';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './schemas/favorite.schema';

@Injectable()
export class FavoritesRepository extends RootRepository<
  Favorite,
  CreateFavoriteDto,
  UpdateFavoriteDto
> {}
