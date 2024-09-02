import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/user.entity';

// Handler function to retrieve all users from the database
export const findAllUsers = async (req: Request, res: Response) => {
  // Get the User repository from the data source
  const userRepository = AppDataSource.getRepository(User);

  try {
    // Fetch all users from the User repository
    const users = await userRepository.find();

    // Respond with the list of users in JSON format
    res.json(users);
  } catch (error) {
    // Log the error and respond with a 500 status and message in case of an error
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
