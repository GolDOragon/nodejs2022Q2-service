import { Root } from '../../common/root';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Artist } from '../../artists/entities/Artist.entity';
import { Track } from '../../tracks/entities/Track.entity';
import { Favorite } from '../../favorites/entities/Favorite.entity';

@Entity()
export class Album extends Root {
  @Column()
  name: string;

  @Column({ type: 'int' })
  year: number;

  @ManyToOne(() => Artist, (artist) => artist.albums, { nullable: true })
  artist: Artist | null;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];

  @OneToOne(() => Favorite, (favorite) => favorite.artist)
  favorite: Favorite;
}
