import { Root } from '../../common/root';
import { Entity, OneToOne } from 'typeorm';
import { Artist } from '../../artists/entities/Artist.entity';
import { Album } from '../../albums/entities/Album.entity';
import { Track } from '../../tracks/entities/Track.entity';

@Entity()
export class Favorite extends Root {
  // TODO: favorites for each user
  // @OneToMany(()=> User, (user) => user.favorites)
  // user: User;

  @OneToOne(() => Artist, (artist) => artist.favorite, { nullable: true })
  artist: Artist | null;

  @OneToOne(() => Album, (album) => album.favorite, { nullable: true })
  album: Album | null;

  @OneToOne(() => Track, (track) => track.favorite, { nullable: true })
  track: Track | null;
}
