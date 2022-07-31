import { Injectable } from '@nestjs/common';
import { AlbumNotFoundError } from './album.error';
import { AlbumsRepository } from './albums.repository';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(private readonly albumsRepository: AlbumsRepository) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = await this.albumsRepository.create(createAlbumDto);

    return album;
  }

  async findAll() {
    const albums = await this.albumsRepository.findAll();

    return albums;
  }

  async findOne(id: string) {
    const album = await this.albumsRepository.findOne(id);

    if (!album) {
      throw new AlbumNotFoundError();
    }

    return album;
  }

  async update(id: string, dto: UpdateAlbumDto) {
    const album = await this.albumsRepository.update(id, dto);

    if (!album) {
      throw new AlbumNotFoundError();
    }

    return album;
  }

  async remove(id: string) {
    const album = await this.albumsRepository.remove(id);

    if (!album) {
      throw new AlbumNotFoundError();
    }

    return album;
  }
}
