import { User } from '../users/entities/User.entity';
import { Artist } from '../artists/entities/Artist.entity';
import { Album } from '../albums/entities/Album.entity';
import { Track } from '../tracks/entities/Track.entity';
import { Favorite } from '../favorites/entities/Favorite.entity';

export const entities = [Album, Artist, Favorite, Track, User];
