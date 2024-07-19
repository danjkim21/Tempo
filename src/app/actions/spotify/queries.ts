import { authOptions } from "@/server/auth";
import { type SpotifyPlaylist } from "@/types/spotifyTypes";

export async function fetchPlaylists() {
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

export async function fetchPlaylistDetail(params: {
  playlistId: string;
}): Promise<SpotifyPlaylist> {
  const session = await getServerSession(authOptions);

  const fields = "images,description,href,id,name,tracks(total)";

  const response: Response = await fetch(
    `https://api.spotify.com/v1/playlists/${params.playlistId}?fields=${fields}`,
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

export async function fetchPlaylistTracks({
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
    const nextPageItems = await fetchPlaylistTracks({
      playlistId,
      offset: offset + limit,
      nextPageUrl: next,
    });

    items.push(...nextPageItems);
  }

  return items;
}
