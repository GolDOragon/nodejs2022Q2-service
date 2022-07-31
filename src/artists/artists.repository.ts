import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { RootRepository } from 'src/common/root.repository';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './schemas/artist.schema';

@Injectable()
export class ArtistsRepository extends RootRepository<
  Artist,
  CreateArtistDto,
  UpdateArtistDto
> {
  constructor() {
    super([{ id: randomUUID(), name: 'Imagine dragons', grammy: false }]);
  }
}
