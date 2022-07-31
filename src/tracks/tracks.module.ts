import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/Track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService], // TODO?
})
export class TracksModule {}
