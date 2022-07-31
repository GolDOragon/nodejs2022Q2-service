import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
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

  @OneToMany(() => Artist, (artist) => artist.tracks)
  artist: Artist;

  @OneToMany(() => Album, (album) => album.tracks)
  album: Album;

  @OneToOne(() => Favorite, (favorite) => favorite.artist)
  favorite: Favorite;
}
