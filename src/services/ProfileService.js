import axios from 'axios';

// Base URL for the API
export const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api', // Change to your API base URL
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem("sb-vsuxlglyqozgmidnouuy-auth-token"))?.access_token}`, // Replace with your token logic
    },
  });

// Fetch all assets (GET /api/assets)
export const getProfile = async (userid) => {
  try {
    const response = await apiClient.get(`/user/profile/user/${userid}`);
    return response.data; // Return the assets data
  } catch (error) {
    console.error('Error fetching assets:', error);
    throw error; // Throw error if request fails
  }
};


// Update an existing asset (PUT /api/assets/{id})
export const updateProfile = async (userid,values) => {
  try {
    const response = await apiClient.put(`/user/profile/user/${userid}`,values);
    return response.data; // Return the updated asset
  } catch (error) {
    console.error('Error updating asset:', error);
    throw error; // Throw error if request fails
  }
};

