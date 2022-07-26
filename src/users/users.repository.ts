import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: { ...dto, version: 1 },
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async update(id: string, newFields: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data: newFields,
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
