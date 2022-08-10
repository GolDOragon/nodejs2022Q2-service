import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  RelationId,
} from 'typeorm';
import { Root } from '../../common/root';
import { Artist } from '../../artists/entities/Artist.entity';
import { Album } from '../../albums/entities/Album.entity';
import { Favorite } from '../../favorites/entities/Favorite.entity';

@Entity()
export class Track extends Root {
  @Column()
  name: string;

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'uuid', nullable: true })
  @RelationId((track: Track) => track.artist)
  artistId?: string;

  @JoinColumn()
  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist?: Artist;

  @Column({ type: 'uuid', nullable: true })
  @RelationId((track: Track) => track.album)
  albumId?: string | null;

  @JoinColumn()
  @ManyToOne(() => Album, (album) => album.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  album?: Album;

  @JoinColumn()
  @OneToOne(() => Favorite, (favorite) => favorite.artist)
  favorite?: Favorite;
}
