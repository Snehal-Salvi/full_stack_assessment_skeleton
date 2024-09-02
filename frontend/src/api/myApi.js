import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define API service using RTK Query
export const myApi = createApi({
  reducerPath: 'myApi', // Unique key for the slice in the Redux store
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }), // Base URL for API requests
  endpoints: (builder) => ({
    // Define a query endpoint to get all users
    getUsers: builder.query({
      query: () => 'user/find-all', // Endpoint URL for fetching all users
      providesTags: ['User'], // Tags to manage cache invalidation and refetching
    }),
    // Define a query endpoint to get homes related to a specific user
    getHomesByUser: builder.query({
      query: (username) => `home/find-by-user/${username}`, // Endpoint URL for fetching homes by user
      providesTags: ['Home'], // Tags to manage cache invalidation and refetching
    }),
    // Define a query endpoint to get users related to a specific home
    getUsersByHome: builder.query({
      query: (streetAddress) => `home/find-by-home/${streetAddress}`, // Endpoint URL for fetching users by home
      providesTags: ['Home'], // Tags to manage cache invalidation and refetching
    }),
    // Define a mutation endpoint to update users related to a specific home
    updateUsersByHome: builder.mutation({
      query: ({ streetAddress, usernames }) => ({
        url: `home/update-users/${streetAddress}`, // Endpoint URL for updating users by home
        method: 'POST', // HTTP method for the request
        body: { usernames }, // Request payload with updated usernames
      }),
      invalidatesTags: (result, error, { streetAddress }) => [
        { type: 'Home', id: streetAddress }, // Invalidate the cache for the specific home
        { type: 'User' }, // Optional: Invalidate user query to refresh data if needed
      ],
    }),
  }),
});

// Export hooks for usage in components
export const { 
  useGetUsersQuery, // Hook for fetching all users
  useGetHomesByUserQuery, // Hook for fetching homes by user
  useGetUsersByHomeQuery, // Hook for fetching users by home
  useUpdateUsersByHomeMutation // Hook for updating users by home
} = myApi;
