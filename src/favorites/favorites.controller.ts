import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { IdParams } from 'src/common/id-params.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('/track/:id')
  addTrack(@Param() params: IdParams) {
    return this.favoritesService.addTrack(params.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/track/:id')
  removeTrack(@Param() params: IdParams) {
    return this.favoritesService.removeTrack(params.id);
  }

  @Post('/album/:id')
  addAlbum(@Param() params: IdParams) {
    return this.favoritesService.addAlbum(params.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/album/:id')
  removeAlbum(@Param() params: IdParams) {
    return this.favoritesService.removeAlbum(params.id);
  }

  @Post('/artist/:id')
  addArtist(@Param() params: IdParams) {
    return this.favoritesService.addArtist(params.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/artist/:id')
  removeArtist(@Param() params: IdParams) {
    return this.favoritesService.removeArtist(params.id);
  }
}
