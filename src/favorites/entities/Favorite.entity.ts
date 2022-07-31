import { Root } from '../../common/root';
import { Column, Entity, OneToOne, RelationId } from 'typeorm';
import { Artist } from '../../artists/entities/Artist.entity';
import { Album } from '../../albums/entities/Album.entity';
import { Track } from '../../tracks/entities/Track.entity';
import { JoinColumn } from 'typeorm';

@Entity()
export class Favorite extends Root {
  @Column({ type: 'uuid', nullable: true })
  @RelationId((favorite: Favorite) => favorite.artist)
  artistId?: string | null;

  @JoinColumn()
  @OneToOne(() => Artist, (artist) => artist.favorite, {
    nullable: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  artist?: Artist | null;

  @Column({ type: 'uuid', nullable: true })
  @RelationId((favorite: Favorite) => favorite.album)
  albumId?: string | null;

  @JoinColumn()
  @OneToOne(() => Album, (album) => album.favorite, {
    nullable: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  album?: Album | null;

  @Column({ type: 'uuid', nullable: true })
  @RelationId((favorite: Favorite) => favorite.track)
  trackId?: string | null;

  @JoinColumn()
  @OneToOne(() => Track, (track) => track.favorite, {
    nullable: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  track?: Track | null;
}
