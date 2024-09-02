import React from "react";

export default function HomeCard({ home, onEdit }) {
  return (
    <div className="card">
      {/* Display the street address of the home */}
      <h3>{home.street_address}</h3>
      
      {/* Display various details about the home */}
      <p>List Price: {home.list_price}</p>
      <p>State: {home.state}</p>
      <p>Zip: {home.zip}</p>
      <p>Sqft: {home.sqft}</p>
      <p>Beds: {home.beds}</p>
      <p>Baths: {home.baths}</p>
      
      {/* Button to trigger the edit users functionality */}
      <button onClick={() => onEdit(home)}>Edit Users</button>
    </div>
  );
}
