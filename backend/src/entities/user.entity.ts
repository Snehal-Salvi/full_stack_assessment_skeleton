/* This file defines the User entity for the database, representing a user 
with properties such as username and email.
It also defines a many-to-many relationship with the Home entity, 
using a join table to manage the relationship.*/

import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Home } from './home.entity';

@Entity()
export class User {
  @PrimaryColumn()
  username!: string;

  @Column()
  email!: string;

  @ManyToMany(() => Home, home => home.users)
  @JoinTable({
    name: 'user_home',  // The name of the join table
    joinColumn: { name: 'username', referencedColumnName: 'username' }, // Column in the join table for User
    inverseJoinColumn: { name: 'street_address', referencedColumnName: 'street_address' } // Column in the join table for Home
  })
  homes!: Home[];
}
