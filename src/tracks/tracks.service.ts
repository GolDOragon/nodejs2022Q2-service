import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackNotFoundError } from './track.error';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './entities/Track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    return this.trackRepository.save(createTrackDto);
  }

  async findAll() {
    return this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new TrackNotFoundError();
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new TrackNotFoundError();
    }

    return this.trackRepository.save({ ...track, ...updateTrackDto });
  }

  async remove(id: string) {
    const track = await this.trackRepository.delete(id);

    if (!track.affected) {
      throw new TrackNotFoundError();
    }

    return track;
  }
}
