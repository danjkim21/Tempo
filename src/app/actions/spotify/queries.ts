import { authOptions } from "@/server/auth";
import { type SpotifyPlaylist } from "@/types/spotifyTypes";

/**
 * Retrieves the user's playlists from the Spotify API.
 *
 * @return {Promise<Response>} A promise that resolves with the JSON response containing the user's playlists.
 */
export async function getPlaylists() {
  const session = await getServerSession(authOptions);

  const response: Response = await fetch(
    "https://api.spotify.com/v1/me/playlists?offset=0&limit=50",
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  );

  if (!response.ok) {
    // throw new Error(response.statusText);
    console.log(response.statusText);
  }

  return response.json();
}

/**
 * Retrieves the details of a Spotify playlist.
 *
 * @param {Object} params - The parameters for the function.
 * @param {string} params.playlistId - The ID of the playlist.
 * @return {Promise<SpotifyPlaylist>} A promise that resolves with the details of the playlist.
 */
export async function getPlaylistDetail({
  playlistId,
}: {
  playlistId: string;
}): Promise<SpotifyPlaylist> {
  const session = await getServerSession(authOptions);

  const fields = "images,description,href,id,name,tracks(total)";

  const response: Response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}?fields=${fields}`,
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  );

  if (!response.ok) {
    // throw new Error(response.statusText);
    console.log(response.statusText);
  }

  return response.json() as Promise<SpotifyPlaylist>;
}

import { getServerSession } from "next-auth";

/**
 * Retrieves all tracks of a Spotify playlist.
 *
 * @param {Object} params - The parameters for the function.
 * @param {string} params.playlistId - The ID of the playlist.
 * @param {number} [params.offset=0] - The offset of the tracks.
 * @return {Promise<Array<Object>>} A promise that resolves with an array of track objects.
 */
export async function getPlaylistTracks({
  playlistId,
  offset = 0,
}: {
  playlistId: string;
  offset?: number;
}) {
  const session = await getServerSession(authOptions);

  const limit = 100;

  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}&limit=${limit}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const { items, next } = await response.json();

  if (next) {
    const nextPageItems = await getPlaylistTracks({
      playlistId,
      offset: offset + limit,
      nextPageUrl: next,
    });

    items.push(...nextPageItems);
  }

  return items;
}
