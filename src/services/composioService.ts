import axios from "axios";

const BASE_URL = "https://api.composio.dev/v1";
const API_KEY = import.meta.env.VITE_COMPOSIO_API_KEY || "your-default-api-key";

// Helper function for configuring headers
const getHeaders = () => ({
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
});

// Fetch all sources
export const fetchComposioSources = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/sources`, {
      headers: getHeaders(),
    });
    return response.data.sources;
  } catch (err: any) {
    console.error("Error fetching Composio sources:", err.response || err);
    throw new Error(err.response?.data?.message || "Failed to fetch sources.");
  }
};

// Connect to a specific source
export const connectComposioSource = async (
  sourceId: string,
  connectionDetails: Record<string, any>
) => {
  try {
    await axios.post(
      `${BASE_URL}/sources/${sourceId}/connect`,
      { connectionDetails },
      { headers: getHeaders() }
    );
  } catch (err: any) {
    console.error("Error connecting source:", err.response || err);
    throw new Error(err.response?.data?.message || "Failed to connect source.");
  }
};

// Disconnect from a specific source
export const disconnectComposioSource = async (sourceId: string) => {
  try {
    await axios.post(
      `${BASE_URL}/sources/${sourceId}/disconnect`,
      {},
      { headers: getHeaders() }
    );
  } catch (err: any) {
    console.error("Error disconnecting source:", err.response || err);
    throw new Error(
      err.response?.data?.message || "Failed to disconnect source."
    );
  }
};