import { OpenAIToolSet } from "composio-core";

const API_KEY = process.env.REACT_APP_COMPOSIO_API_KEY;

// Ensure your API key is properly loaded
if (!API_KEY || API_KEY === "your-default-api-key") {
  throw new Error("Composio API key is missing or invalid. Please check the .env file.");
}

const toolset = new OpenAIToolSet({ apiKey: API_KEY });


// Type for integration details response
interface GmailIntegrationDetails {
  integration: {
    id?: string | undefined;
    [key: string]: any; // Additional fields from Composio integration response
  };
  expectedInputFields: Record<string, any>; // Adjust based on expected structure
}

// Fetch Gmail integration details
export const fetchGmailIntegrationDetails = async (
  integrationId: string
): Promise<GmailIntegrationDetails> => {
  if (!integrationId) {
    throw new Error("Integration ID is required to fetch Gmail integration details.");
  }

  try {
    const integration = await toolset.integrations.get({ integrationId });
    if (!integration.id) {
      throw new Error("Integration ID is missing in the response.");
    }
    const expectedInputFields = await toolset.integrations.getRequiredParams(
      integration.id
    );

    return { integration, expectedInputFields };
  } catch (err: any) {
    console.error("Error fetching Gmail integration details:", err.response || err);
    throw new Error(
      err.response?.data?.message || "Failed to fetch Gmail integration details."
    );
  }
};


// Type for connected account response
interface ConnectedAccountResponse {
  connectionStatus: string;
  connectedAccountId: string;
  redirectUrl?: string | null; // URL for redirection, if applicable
}

// Initiate a Gmail connection
export const initiateGmailConnection = async (
  integrationId: string,
  entityId: string
): Promise<ConnectedAccountResponse> => {
  if (!integrationId || !entityId) {
    throw new Error("Both integration ID and entity ID are required to initiate Gmail connection.");
  }

  try {
    const connectedAccount = await toolset.connectedAccounts.initiate({
      integrationId,
      entityId,
    });

    return connectedAccount;
  } catch (err: any) {
    console.error("Error initiating Gmail connection:", err.response || err);
    throw new Error(
      err.response?.data?.message || "Failed to initiate Gmail connection."
    );
  }
};