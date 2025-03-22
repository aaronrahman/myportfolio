// pages/api/spotify.ts

export async function handler(req: any, res: any) {
    // Spotify API credentials (from environment variables)
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
  
    // Get Spotify access token
    const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  
    try {
      // Step 1: Get Access Token
      const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${auth}`,
        },
        body: "grant_type=client_credentials",
      });
  
      const tokenData = await tokenResponse.json();
      const token = tokenData.access_token;
  
      // Step 2: Fetch Playlist Tracks
      const PLAYLIST_IDS = [
        "0qhkqNmvqlb663MoWccx5z",
        "2M7Uoo0ToVPBAtYy2iEjkE",
        "723fc0q8MFCbcVAV7zbTMg",
      ];
  
      let allTracks: any[] = [];
      let nextUrl: string | null = `https://api.spotify.com/v1/playlists/${PLAYLIST_IDS[0]}/tracks?limit=100`;
  
      while (nextUrl) {
        const response = await fetch(nextUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const data = await response.json();
        allTracks = [...allTracks, ...data.items];
        nextUrl = data.next;
      }
  
      // Send response to client with all tracks
      res.status(200).json(allTracks.reverse());
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  }  