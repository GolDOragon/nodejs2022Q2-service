import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistsModule } from 'src/artists/artists.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/Favorite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite]),

    ArtistsModule,
    TracksModule,
    AlbumsModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
