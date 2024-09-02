-- Use the existing database 'home_db'
USE home_db;

-- Create the 'user' table with 'username' as the primary key
CREATE TABLE user (
    username VARCHAR(255) PRIMARY KEY,  -- Unique identifier for each user
    email VARCHAR(255) NOT NULL         -- Email associated with the user
);

-- Create the 'home' table with an auto-incrementing primary key
CREATE TABLE home (
    home_id INT AUTO_INCREMENT PRIMARY KEY,       -- Unique identifier for each home
    street_address VARCHAR(255) NOT NULL,        -- Address of the home
    state VARCHAR(255) NOT NULL,                  -- State where the home is located
    zip INT NOT NULL,                             -- ZIP code of the home
    sqft DECIMAL(10, 2) NOT NULL,                 -- Square footage of the home
    beds INT NOT NULL,                           -- Number of beds in the home
    baths INT NOT NULL,                          -- Number of baths in the home
    list_price DECIMAL(15, 2) NOT NULL,          -- Listing price of the home
    UNIQUE (street_address, state, zip)           -- Ensure each address in a specific state and zip is unique
);

-- Populate the 'user' table with distinct users from the old 'user_home' table
INSERT INTO user (username, email)
SELECT DISTINCT username, email
FROM user_home;

-- Populate the 'home' table with distinct homes from the old 'user_home' table
INSERT INTO home (street_address, state, zip, sqft, beds, baths, list_price)
SELECT DISTINCT street_address, state, zip, sqft, beds, baths, list_price
FROM user_home;

-- Create a new 'user_home' table with foreign keys to the 'user' and 'home' tables
CREATE TABLE new_user_home (
    username VARCHAR(255),
    street_address VARCHAR(255),
    PRIMARY KEY (username, street_address), -- Composite primary key to ensure uniqueness
    FOREIGN KEY (username) REFERENCES user(username) ON DELETE CASCADE, -- Cascade delete on user deletion
    FOREIGN KEY (street_address) REFERENCES home(street_address) ON DELETE CASCADE -- Cascade delete on home deletion
);

-- Migrate data from the old 'user_home' table to the new 'user_home' table
INSERT INTO new_user_home (username, street_address)
SELECT DISTINCT username, street_address FROM user_home;

-- Drop the old 'user_home' table as it's no longer needed
DROP TABLE user_home;

-- Rename 'new_user_home' to 'user_home' to finalize the migration
ALTER TABLE new_user_home RENAME TO user_home;
