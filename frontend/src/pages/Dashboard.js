import React, { useState } from 'react';
import { useGetHomesByUserQuery } from '../api/myApi';
import Dropdown from '../components/Dropdown';
import HomeCard from '../components/HomeCard';
import EditUserModal from '../components/EditUserModal';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Dashboard() {
  // State to manage the selected user and home for editing
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedHome, setSelectedHome] = useState(null);

  // Fetch homes by the selected user with query refetch control
  const { data = {}, isLoading, error, refetch } = useGetHomesByUserQuery(selectedUser, {
    skip: !selectedUser, // Skip the query if no user is selected
  });

  const homes = data.homes || []; // Extract homes from the query data

  // Handle user selection from dropdown
  const handleUserSelect = (username) => {
    setSelectedUser(username);
  };

  // Handle click on edit button in a home card
  const handleEditClick = (home) => {
    setSelectedHome(home); // Set the selected home for editing
  };

  // Close the modal and refetch the homes data
  const handleCloseModal = () => {
    setSelectedHome(null); // Reset selected home
    refetch(); // Refetch homes data to reflect any changes
  };

  return (
    <div>
      {/* Dropdown to select a user */}
      <div className="dropdown">
        <h1>Select User:
          <Dropdown onUserSelect={handleUserSelect} />
        </h1>
      </div>
      
      {selectedUser && (
        <>
          {/* Show loading skeleton if data is loading */}
          {isLoading && (
            <div className="skeleton-container">
              <Skeleton height={200} width={300} count={3} />
            </div>
          )}
          
          {/* Show error message if there was an error fetching homes */}
          {error && <p>Error fetching homes: {error.message}</p>}
          
          {/* Display home cards or message if no homes found */}
          <div className="cardContainer">
            {homes.length > 0 ? (
              homes.map((home) => (
                <HomeCard key={home.street_address} home={home} onEdit={handleEditClick} />
              ))
            ) : (
              !isLoading && <p>No homes found for this user.</p>
            )}
          </div>
        </>
      )}
      
      {/* Render the EditUserModal if a home is selected */}
      {selectedHome && (
        <EditUserModal
          home={selectedHome}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
