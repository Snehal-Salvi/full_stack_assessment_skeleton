import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Home } from '../entities/home.entity';
import { User } from '../entities/user.entity';

// Handler function to find all homes associated with a specific user
export const findHomesByUser = async (req: Request, res: Response) => {
    // Get the User repository from the data source
    const userRepository = AppDataSource.getRepository(User);
    // Extract the username parameter from the request
    const { username } = req.params;
  
    try {
      // Find the user by username, including the related homes
      const user = await userRepository.findOne({
        where: { username },
        relations: ['homes'] // Load the homes relationship
      });
  
      // Check if the user was found
      if (user) {
        // Respond with the homes and the total count
        res.json({
          homes: user.homes,
          total: user.homes.length
        });
      } else {
        // If the user was not found, respond with a 404 status and message
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      // Log and respond with a 500 status in case of an error
      console.error('Error fetching homes by user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

// Handler function to find all users associated with a specific home
export const findUsersByHome = async (req: Request, res: Response) => {
    // Get the Home repository from the data source
    const homeRepository = AppDataSource.getRepository(Home);
    // Extract the street_address parameter from the request
    const { street_address } = req.params;
  
    try {
      // Find the home by street address, including the related users
      const home = await homeRepository.findOne({
        where: { street_address },
        relations: ['users'] // Load the users relationship
      });
  
      // Check if the home was found
      if (home) {
        // Respond with the users associated with the home
        res.json(home.users);
      } else {
        // If the home was not found, respond with a 404 status and message
        res.status(404).json({ message: 'Home not found' });
      }
    } catch (error) {
      // Log and respond with a 500 status in case of an error
      console.error('Error fetching users by home:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

// Handler function to update the users associated with a specific home
export const updateUsersByHome = async (req: Request, res: Response) => {
    // Get the Home and User repositories from the data source
    const homeRepository = AppDataSource.getRepository(Home);
    const userRepository = AppDataSource.getRepository(User);
    // Extract the street_address parameter from the request
    const { street_address } = req.params;
    // Extract the usernames array from the request body
    const { usernames } = req.body;
  
    try {
      // Find the home by street address, including the related users
      const home = await homeRepository.findOne({
        where: { street_address },
        relations: ['users'] // Load the users relationship
      });
  
      // Check if the home was found
      if (!home) {
        // If the home was not found, respond with a 404 status and message
        return res.status(404).json({ message: 'Home not found' });
      }
  
      // Remove existing user relationships from the home
      home.users = [];
      await homeRepository.save(home); // Save the home with no users
  
      // Add new users to the home based on the provided usernames
      for (const username of usernames) {
        // Find each user by username
        const user = await userRepository.findOne({ where: { username } });
        if (user) {
          // Add the user to the home if found
          home.users.push(user);
        }
      }
      
      // Save the home with the updated list of users
      await homeRepository.save(home);
      // Respond with the updated home information
      res.json(home);
    } catch (error) {
      // Log and respond with a 500 status in case of an error
      console.error('Error updating users by home:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};
