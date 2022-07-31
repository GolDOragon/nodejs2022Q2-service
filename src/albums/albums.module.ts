import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/Album.entity';
import { Artist } from '../artists/entities/Artist.entity';
import { Track } from '../tracks/entities/Track.entity';
import { Favorite } from '../favorites/entities/Favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Artist, Track, Favorite])],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService], // TODO: ?
})
export class AlbumsModule {}
