import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [UsersController],
  imports: [PrismaModule],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
