import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksRepository } from './tracks.repository';
import { TracksService } from './tracks.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, TracksRepository],
})
export class TracksModule {}
