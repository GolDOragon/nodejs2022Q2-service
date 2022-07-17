import { Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import {
  EntityNotExistError,
  EntityNotInFavoritesError,
} from './favorite.error';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,

    private readonly artistsService: ArtistsService,

    private readonly tracksService: TracksService,

    private readonly albumsService: AlbumsService,
  ) {}

  async findAll() {
    const favorites = await this.favoritesRepository.findAll();

    const { favoriteArtistIds, favoriteTrackIds, favoriteAlbumIds } =
      favorites.reduce(
        (acc, item) => {
          if (item.artistId) {
            return {
              ...acc,
              favoriteArtistIds: acc.favoriteArtistIds.concat(item.artistId),
            };
          }
          if (item.trackId) {
            return {
              ...acc,
              favoriteTrackIds: acc.favoriteTrackIds.concat(item.trackId),
            };
          }
          if (item.albumId) {
            return {
              ...acc,
              favoriteAlbumIds: acc.favoriteAlbumIds.concat(item.albumId),
            };
          }
        },
        {
          favoriteArtistIds: [],
          favoriteTrackIds: [],
          favoriteAlbumIds: [],
        },
      );

    const artists = this.artistsService
      .findAll()
      .then((allArtists) =>
        allArtists.filter(({ id }) => favoriteArtistIds.includes(id)),
      );

    const tracks = this.tracksService
      .findAll()
      .then((allTracks) =>
        allTracks.filter(({ id }) => favoriteTrackIds.includes(id)),
      );

    const albums = this.albumsService
      .findAll()
      .then((allAlbums) =>
        allAlbums.filter(({ id }) => favoriteAlbumIds.includes(id)),
      );

    return Promise.all([artists, tracks, albums]).then(
      ([artists, tracks, albums]) => ({
        artists,
        tracks,
        albums,
      }),
    );
  }

  async addArtist(id: string) {
    const artist = await this.artistsService.findOne(id);

    if (!artist) {
      throw new EntityNotExistError('Artist');
    }

    this.favoritesRepository.create({
      artistId: id,
      trackId: null,
      albumId: null,
    });
  }

  async removeArtist(artistId: string) {
    const favorite = await this.favoritesRepository.findOneBy({ artistId });

    if (!favorite) {
      throw new EntityNotInFavoritesError('Artist');
    }

    await this.favoritesRepository.remove(favorite.id);
  }

  async addTrack(id: string) {
    const track = await this.tracksService.findOne(id);

    if (!track) {
      throw new EntityNotExistError('Track');
    }

    this.favoritesRepository.create({
      artistId: null,
      trackId: id,
      albumId: null,
    });
  }

  async removeTrack(trackId: string) {
    const favorite = await this.favoritesRepository.findOneBy({ trackId });

    if (!favorite) {
      throw new EntityNotInFavoritesError('Track');
    }

    await this.favoritesRepository.remove(favorite.id);
  }

  async addAlbum(id: string) {
    const album = await this.albumsService.findOne(id);

    if (!album) {
      throw new EntityNotExistError('Album');
    }

    this.favoritesRepository.create({
      artistId: null,
      trackId: null,
      albumId: id,
    });
  }

  async removeAlbum(albumId: string) {
    const favorite = await this.favoritesRepository.findOneBy({ albumId });

    if (!favorite) {
      throw new EntityNotInFavoritesError('Album');
    }

    await this.favoritesRepository.remove(favorite.id);
  }
}
