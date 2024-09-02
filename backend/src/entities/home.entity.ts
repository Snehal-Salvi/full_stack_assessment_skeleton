/*This file defines the Home entity for the database, representing a home 
with various properties and its many-to-many relationship with the User entity.*/

import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Home {
  @PrimaryColumn()
  street_address!: string;

  @Column()
  state!: string;

  @Column()
  zip!: number;

  @Column('decimal')
  sqft!: number;

  @Column()
  beds!: number;

  @Column()
  baths!: number;

  @Column('decimal')
  list_price!: number;

  @ManyToMany(() => User, user => user.homes)
  users!: User[];
}
