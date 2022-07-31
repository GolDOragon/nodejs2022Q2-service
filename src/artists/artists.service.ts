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
    return this.artistRepository.save(createArtistDto).then(this.toResponse);
  }

  async findAll() {
    return this.artistRepository
      .find()
      .then((artists) => artists.map(this.toResponse));
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new ArtistNotFoundError();
    }

    return this.toResponse(artist);
  }

  async update(id: string, dto: UpdateArtistDto) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new ArtistNotFoundError();
    }

    return this.artistRepository.save({ ...artist, ...dto });
  }

  async remove(id: string) {
    const artist = await this.artistRepository.delete(id);

    if (!artist.affected) {
      throw new ArtistNotFoundError();
    }

    return artist;
  }

  private toResponse({ createdAt, updatedAt, ...artist }: Artist) {
    return artist;
  }
}
