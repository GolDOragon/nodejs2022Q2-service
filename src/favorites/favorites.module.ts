import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesRepository } from './favorites.repository';
import { ArtistsModule } from 'src/artists/artists.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';

@Module({
  imports: [ArtistsModule, TracksModule, AlbumsModule],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository],
})
export class FavoritesModule {}
