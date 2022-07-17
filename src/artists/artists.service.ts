import { Injectable } from '@nestjs/common';
import { ArtistNotFoundError } from './artist.error';
import { ArtistsRepository } from './artists.repository';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private readonly artistsRepository: ArtistsRepository) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = await this.artistsRepository.create(createArtistDto);

    return artist;
  }

  async findAll() {
    const artists = this.artistsRepository.findAll();

    return artists;
  }

  async findOne(id: string) {
    const artist = await this.artistsRepository.findOne(id);

    if (!artist) {
      throw new ArtistNotFoundError();
    }

    return artist;
  }

  async update(id: string, dto: UpdateArtistDto) {
    const artist = await this.artistsRepository.update(id, dto);

    if (!artist) {
      throw new ArtistNotFoundError();
    }

    return artist;
  }

  async remove(id: string) {
    const artist = await this.artistsRepository.remove(id);

    if (!artist) {
      throw new ArtistNotFoundError();
    }

    return artist;
  }
}
