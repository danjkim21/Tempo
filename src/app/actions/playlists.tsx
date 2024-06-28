"use server";

export async function getMyPlaylists() {
  const response = await fetch(
    "https://api.spotify.com/v1/me/playlists?offset=0&limit=50",
    {
      headers: {
        // Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch playlists");
  }

  const data = await response.json();
  return data;
}
