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
export const getAssets = async () => {
  try {
    const response = await apiClient.get('/assets');
    return response.data; // Return the assets data
  } catch (error) {
    console.error('Error fetching assets:', error);
    throw error; // Throw error if request fails
  }
};

// Create a new asset (POST /api/assets)
export const createAsset = async (asset) => {
  try {
    const response = await apiClient.post('/assets', asset);
    return response.data; // Return the created asset
  } catch (error) {
    console.error('Error creating asset:', error);
    throw error; // Throw error if request fails
  }
};

// Update an existing asset (PUT /api/assets/{id})
export const updateAsset = async (id, asset) => {
  try {
    const response = await apiClient.put(`/assets/${id}`, asset);
    return response.data; // Return the updated asset
  } catch (error) {
    console.error('Error updating asset:', error);
    throw error; // Throw error if request fails
  }
};

// Delete an asset (DELETE /api/assets/{id})
export const deleteAsset = async (id) => {
  try {
    const response = await apiClient.delete(`/assets/${id}`);
    return response.data; // Return a success message or the deleted asset
  } catch (error) {
    console.error('Error deleting asset:', error);
    throw error; // Throw error if request fails
  }
};
