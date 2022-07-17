import { randomUUID } from 'crypto';
import { RootEntity } from './root.schema';

export class RootRepository<
  TEntity extends RootEntity,
  TCreateDTO,
  TUpdateDTO,
> {
  private readonly entities: TEntity[] = [];

  constructor(defaultItems: TEntity[]) {
    this.entities = defaultItems;
  }

  async create(dto: TCreateDTO) {
    const entity = {
      id: randomUUID(),
      ...dto,
    } as unknown as TEntity;

    this.entities.push(entity);

    return entity;
  }

  async findAll() {
    return this.entities.slice();
  }

  async findOne(requiredId: string) {
    return this.entities.find(({ id }) => id === requiredId) ?? null;
  }

  async update(id: string, newFields: TUpdateDTO) {
    const index = this.entities.findIndex((track) => track.id === id);

    if (index === -1) {
      return null;
    }

    const newEntity = {
      ...this.entities[index],
      ...newFields,
    } as TEntity;

    this.entities[index] = newEntity;

    return newEntity;
  }

  async remove(id: string) {
    const index = this.entities.findIndex((track) => track.id === id);

    if (index === -1) {
      return null;
    }

    return this.entities.splice(index, 1)[0];
  }
}
