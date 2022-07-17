import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksRepository } from './tracks.repository';

@Injectable()
export class TracksService {
  constructor(private readonly tracksRepository: TracksRepository) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = await this.tracksRepository.create(createTrackDto);

    return track;
  }

  async findAll() {
    const tracks = await this.tracksRepository.findAll();

    return tracks;
  }

  async findOne(id: string) {
    const track = await this.tracksRepository.findOne(id);

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  async update(id: string, dto: UpdateTrackDto) {
    const track = await this.tracksRepository.update(id, dto);

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  async remove(id: string) {
    const track = await this.tracksRepository.remove(id);

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return track;
  }
}
