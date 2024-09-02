/* This file sets up and exports the TypeORM DataSource 
instance for connecting to the MySQL database.
It loads database configuration from environment variables 
and specifies the entities to be used.*/

import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Home } from './entities/home.entity';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Home],
  synchronize: true,   
});
