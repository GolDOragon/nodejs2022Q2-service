import { Injectable } from '@nestjs/common';
import { AlbumNotFoundError } from './album.error';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/Album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return this.albumRepository.save(createAlbumDto);
  }

  async findAll() {
    return this.albumRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new AlbumNotFoundError();
    }

    return album;
  }

  async update(id: string, dto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new AlbumNotFoundError();
    }

    return this.albumRepository.save({ ...album, ...dto });
  }

  async remove(id: string) {
    const album = await this.albumRepository.delete(id);

    if (!album.affected) {
      throw new AlbumNotFoundError();
    }

    return album;
  }
}
