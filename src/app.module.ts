import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { UsersModule } from './users/users.module';
import { FavoritesModule } from './favorites/favorites.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ormConfig } from '../ormConfig';
import { LoggingMiddleware } from './logging/logging.middleware';
import { LoggingService } from './logging/logging.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
    }),
    DatabaseModule,

    TracksModule,
    ArtistsModule,
    AlbumsModule,
    UsersModule,
    FavoritesModule,
  ],
  exports: [LoggingService],
  controllers: [AppController],
  providers: [AppService, LoggingService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
