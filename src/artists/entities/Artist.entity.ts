import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Root } from '../../common/root';
import { Album } from '../../albums/entities/Album.entity';
import { Track } from '../../tracks/entities/Track.entity';
import { Favorite } from '../../favorites/entities/Favorite.entity';

@Entity()
export class Artist extends Root {
  @Column()
  name: string;

  @Column({ type: 'bool', default: false })
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];

  @OneToOne(() => Favorite, (favorite) => favorite.artist)
  favorite: Favorite;
}
