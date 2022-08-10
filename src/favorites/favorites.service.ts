import { Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import {
  EntityAlreadyInFavoritesError,
  EntityNotInFavoritesError,
  UnprocessableEntityError,
} from './favorite.error';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/Favorite.entity';
import { Repository } from 'typeorm';

type EntityNames = 'Artist' | 'Album' | 'Track';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,

    private readonly artistsService: ArtistsService,

    private readonly tracksService: TracksService,

    private readonly albumsService: AlbumsService,
  ) {}

  async findAll() {
    const favorites = await this.favoriteRepository.find();

    return favorites.reduce(
      (acc, item) => {
        if (item.artist) {
          return {
            ...acc,
            artists: acc.artists.concat(item.artist),
          };
        }
        if (item.track) {
          return {
            ...acc,
            tracks: acc.tracks.concat(item.track),
          };
        }
        if (item.album) {
          return {
            ...acc,
            albums: acc.albums.concat(item.album),
          };
        }
      },
      {
        artists: [],
        albums: [],
        tracks: [],
      },
    );
  }

  async addArtist(artistId: string) {
    await this.isEntityExist(artistId, this.artistsService, 'Artist');
    await this.isEntityInFavorites('Artist', { artistId });

    return this.favoriteRepository.save({ artistId });
  }

  async removeArtist(artistId: string) {
    const favorite = await this.favoriteRepository.delete({ artistId });

    if (!favorite.affected) {
      throw new EntityNotInFavoritesError('Artist');
    }

    return favorite;
  }

  async addTrack(trackId: string) {
    await this.isEntityExist(trackId, this.tracksService, 'Track');
    await this.isEntityInFavorites('Track', { trackId });

    return this.favoriteRepository.save({ trackId });
  }

  async removeTrack(trackId: string) {
    const favorite = await this.favoriteRepository.delete({ trackId });

    if (!favorite.affected) {
      throw new EntityNotInFavoritesError('Track');
    }

    return favorite;
  }

  async addAlbum(albumId: string) {
    await this.isEntityExist(albumId, this.albumsService, 'Album');
    await this.isEntityInFavorites('Album', { albumId });

    return this.favoriteRepository.save({ albumId });
  }

  async removeAlbum(albumId: string) {
    const favorite = await this.favoriteRepository.delete({ albumId });

    if (!favorite.affected) {
      throw new EntityNotInFavoritesError('Album');
    }

    return favorite;
  }

  private async isEntityExist(
    id: string,
    service: ArtistsService | AlbumsService | TracksService,
    name: EntityNames,
  ) {
    try {
      await service.findOne(id);
    } catch {
      throw new UnprocessableEntityError(name);
    }
  }

  private async isEntityInFavorites(
    name: EntityNames,
    criteria: Pick<Favorite, 'artistId' | 'albumId' | 'trackId'>,
  ) {
    const isEntityInFavorites = await this.favoriteRepository
      .findOneBy(criteria)
      .then((favorite) => !!favorite);

    if (isEntityInFavorites) {
      throw new EntityAlreadyInFavoritesError(name);
    }
  }
}
