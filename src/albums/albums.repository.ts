import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { RootRepository } from 'src/common/root.repository';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './schemas/album.schema';

@Injectable()
export class AlbumsRepository extends RootRepository<
  Album,
  CreateAlbumDto,
  UpdateAlbumDto
> {
  constructor() {
    super([
      {
        id: randomUUID(),
        name: 'Folk music',
        year: 33,
        artistId: null,
      },
    ]);
  }
}
