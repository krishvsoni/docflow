import { google } from "googleapis";
import dotenv from "dotenv";
import User from "../../auth/schema.js";

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:5000/auth/google/callback"
);

const scopes = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/drive.metadata",
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/drive.readonly"
];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  prompt: "consent",
});
console.log("Authorize this app by visiting this URL:", authUrl);

async function refreshAccessToken(user) {
  try {
    if (!user.refreshToken) {
      throw new Error("No refresh token available.");
    }
    
    oauth2Client.setCredentials({ refresh_token: user.refreshToken });
    
    const response = await oauth2Client.refreshAccessToken();
    
    if (!response || !response.credentials || !response.credentials.access_token) {
      console.error("Invalid response from refreshAccessToken:", response);
      throw new Error("Failed to refresh access token: Invalid response");
    }
    
    user.accessToken = response.credentials.access_token;
    await user.save();
    
    console.log("Access token refreshed successfully");
    return response.credentials.access_token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw new Error(`Failed to refresh access token: ${error.message}`);
  }
}



async function uploadToDrive(userId, title, content) {
  try {
    const user = await User.findById(userId);
    if (!user || !user.accessToken) {
      throw new Error("User not authenticated with Google Drive.");
    }

    oauth2Client.setCredentials({ access_token: user.accessToken });

    const drive = google.drive({ version: "v3", auth: oauth2Client });

    try {
      const fileMetadata = { name: `${title}.txt`, mimeType: "text/plain" };
      const media = { mimeType: "text/plain", body: content };

      const response = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: "id, webViewLink",
      });

      return response.data;
    } catch (error) {
      if (error.code === 403 && user.refreshToken) {
        console.log("Access token expired, refreshing...");
        await refreshAccessToken(user);
        
        oauth2Client.setCredentials({ access_token: user.accessToken });
        
        const fileMetadata = { name: `${title}.txt`, mimeType: "text/plain" };
        const media = { mimeType: "text/plain", body: content };

        const response = await drive.files.create({
          resource: fileMetadata,
          media: media,
          fields: "id, webViewLink",
        });

        return response.data;
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error("Error uploading file to Drive:", error);
    throw error;
  }
}

export { uploadToDrive, refreshAccessToken };
