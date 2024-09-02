import React from 'react';
import { useGetUsersQuery } from '../api/myApi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Dropdown({ onUserSelect }) {
  // Fetch users data from the API
  const { data: users = [], error, isLoading } = useGetUsersQuery();

  // Show loading skeleton while data is being fetched
  if (isLoading) {
    return (
      <div>
        <Skeleton height={30} width={200} />
      </div>
    );
  }

  // Display error message if there was an issue fetching the users
  if (error) return <p>Error fetching users.</p>;

  return (
    <select onChange={(e) => onUserSelect(e.target.value)}>
      {/* Default option prompting the user to select a user */}
      <option value="">Select User</option>
      {/* Map over the users array to create an option for each user */}
      {users.map((user) => (
        <option key={user.username} value={user.username}>
          {user.username}
        </option>
      ))}
    </select>
  );
}
