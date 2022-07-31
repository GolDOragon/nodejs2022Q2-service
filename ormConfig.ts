import { ConfigModule, registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DataSource } from 'typeorm';
import { User } from './src/users/entities/User.entity';
import { Artist } from './src/artists/entities/Artist.entity';
import { Album } from './src/albums/entities/Album.entity';
import { Track } from './src/tracks/entities/Track.entity';
import { Favorite } from './src/favorites/entities/Favorite.entity';
import { migrations } from './src/migrations';

export const ormConfig = registerAs('ormconfig', () => {
  const options: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
  };

  return options;
});

ConfigModule.forRoot({
  isGlobal: true,
  load: [ormConfig],
});

export default new DataSource({
  ...ormConfig(),
  entities: [User, Artist, Album, Track, Favorite],
  migrations,
});
