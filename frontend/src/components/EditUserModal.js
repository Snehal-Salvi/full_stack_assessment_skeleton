import React, { useState, useEffect } from "react";
import {
  useGetUsersByHomeQuery,
  useGetUsersQuery,
  useUpdateUsersByHomeMutation,
} from "../api/myApi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function EditUserModal({ home, onClose }) {
  // Fetch all users and handle loading/error states
  const { data: allUsers = [], isLoading, error } = useGetUsersQuery();

  // Fetch users related to the specific home and handle loading/error states
  const {
    data: homeUsers = [],
    isLoading: homeUsersLoading,
    error: homeUsersError,
    refetch: refetchHomeUsers, // Refetch function to refresh data
  } = useGetUsersByHomeQuery(home.street_address);

  // Mutation function to update users related to the home
  const [updateUsersByHome] = useUpdateUsersByHomeMutation();
  
  // State to manage selected users in the modal
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Update selected users state when homeUsers changes
  useEffect(() => {
    if (homeUsers) {
      const usernames = homeUsers.map((user) => user.username);
      setSelectedUsers((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(usernames)) {
          return usernames;
        }
        return prev;
      });
    }
  }, [homeUsers]);

  // Toggle user selection in the modal
  const handleCheckboxChange = (username) => {
    setSelectedUsers((prev) =>
      prev.includes(username)
        ? prev.filter((user) => user !== username) // Unselect user
        : [...prev, username] // Select user
    );
  };

  // Save the selected users related to the home
  const handleSave = async () => {
    try {
      await updateUsersByHome({
        streetAddress: home.street_address,
        usernames: selectedUsers,
      }).unwrap();
      
      // Refetch home users to ensure the UI is updated
      await refetchHomeUsers();
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error('Error updating users:', error); // Log any errors
    }
  };

  // Display loading skeleton if data is still loading
  if (isLoading || homeUsersLoading) {
    return (
      <div className="modal">
        <div className="modalContent">
          <h2>Edit Users for {home.street_address}</h2>
          <div>
            <Skeleton height={30} width={150} count={3} />
          </div>
        </div>
      </div>
    );
  }

  // Display error message if there was an error fetching data
  if (error || homeUsersError) return <p>Error loading data.</p>;

  return (
    <div className="modal">
      <div className="modalContent">
        <h2>Edit Users for {home.street_address}</h2>
        {allUsers.length === 0 ? (
          <p>No users available.</p>
        ) : (
          allUsers.map((user) => (
            <div className="checkbox" key={user.username}>
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.username)}
                onChange={() => handleCheckboxChange(user.username)}
              />
              {user.username}
            </div>
          ))
        )}
        <button
          className="saveButton"
          onClick={handleSave}
          disabled={selectedUsers.length === 0} // Disable if no users are selected
        >
          Save
        </button>
        <button className="closeButton" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
