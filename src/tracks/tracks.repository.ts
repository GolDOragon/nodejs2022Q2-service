import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './schemas/track.schema';

@Injectable()
export class TracksRepository {
  private readonly tracks: Track[] = [];

  constructor() {
    this.tracks = [
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
    ];
  }

  async create(dto: CreateTrackDto) {
    const track = {
      id: randomUUID(),
      ...dto,
    };
    this.tracks.push(track);

    return track;
  }

  async findAll() {
    return this.tracks.slice();
  }

  async findOne(requiredId: string) {
    return this.tracks.find(({ id }) => id === requiredId) ?? null;
  }

  async update(id: string, newFields: UpdateTrackDto) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      return null;
    }

    const newTrack = {
      ...this.tracks[trackIndex],
      ...newFields,
    };

    this.tracks[trackIndex] = newTrack;

    return newTrack;
  }

  async remove(id: string) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      return null;
    }

    return this.tracks.splice(trackIndex, 1)[0];
  }
}
