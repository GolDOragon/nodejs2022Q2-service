import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackNotFoundError } from './track.error';
import { TracksRepository } from './tracks.repository';

@Injectable()
export class TracksService {
  constructor(private readonly tracksRepository: TracksRepository) {}

  async create(dto: CreateTrackDto) {
    const track = await this.tracksRepository.create(dto);

    return track;
  }

  async findAll() {
    const tracks = await this.tracksRepository.findAll();

    return tracks;
  }

  async findOne(id: string) {
    const track = await this.tracksRepository.findOne(id);

    if (!track) {
      throw new TrackNotFoundError();
    }

    return track;
  }

  async update(id: string, dto: UpdateTrackDto) {
    const track = await this.tracksRepository.update(id, dto);

    if (!track) {
      throw new TrackNotFoundError();
    }

    return track;
  }

  async remove(id: string) {
    const track = await this.tracksRepository.remove(id);

    if (!track) {
      throw new TrackNotFoundError();
    }

    return track;
  }
}
