import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { RootRepository } from 'src/common/root.repository';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './schemas/track.schema';

Injectable();
export class TracksRepository extends RootRepository<
  Track,
  CreateTrackDto,
  UpdateTrackDto
> {
  constructor() {
    super([
      // TODO: update relations
      {
        id: randomUUID(),
        name: 'taras',
        artistId: randomUUID(),
        albumId: randomUUID(),
        duration: 30000,
      },
      {
        id: randomUUID(),
        name: 'bulba',
        artistId: randomUUID(),
        albumId: randomUUID(),
        duration: 100000,
      },
    ]);
  }
}
