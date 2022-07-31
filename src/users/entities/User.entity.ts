import { Column, Entity } from 'typeorm';
import { Root } from '../../common/root';

@Entity()
export class User extends Root {
  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ type: 'int', default: 1 })
  version: number;
}
