import { Injectable } from '@nestjs/common';
import { ArtistNotFoundError } from './artist.error';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/Artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    return this.artistRepository.save(createArtistDto);
  }

  async findAll() {
    return this.artistRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new ArtistNotFoundError();
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new ArtistNotFoundError();
    }

    return this.artistRepository.save({ ...artist, ...updateArtistDto });
  }

  async remove(id: string) {
    const artist = await this.artistRepository.delete(id);

    if (!artist.affected) {
      throw new ArtistNotFoundError();
    }

    return artist;
  }
}
