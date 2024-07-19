// import { Button } from "@/components/ui/button";
import { Music2Icon } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { authOptions } from "@/server/auth";
import { type SpotifyPlaylist } from "@/types/spotifyTypes";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { PlaylistTable } from "./playlistTable";
import { useEffect } from "react";

async function fetchPlaylistDetail(params: {
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

  return response.json();
}

async function fetchPlaylistTracks({
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

export default async function PlaylistDetailPage({
  params,
}: {
  params: { playlistId: string };
}) {
  const playlistDetail = await fetchPlaylistDetail({
    playlistId: params.playlistId,
  });

  const playlistTracksAll = await fetchPlaylistTracks({
    playlistId: params.playlistId,
  });

  console.log(playlistTracksAll.length);

  return (
    <div>
      <section>
        <h1 className="mb-4 text-2xl font-bold">Playlist Details</h1>
        <Card>
          <CardHeader className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-4xl">
              {playlistDetail.images[0]!.url ? (
                <Image
                  src={playlistDetail.images[0]!.url}
                  alt=""
                  width={64}
                  height={64}
                  className="h-16 w-16 object-cover"
                />
              ) : (
                <Music2Icon className="text-muted-foreground" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold">{playlistDetail.name}</h2>
              <p className="text-muted-foreground">
                {playlistDetail.tracks.total} tracks
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <p>
              {playlistDetail.description
                ? playlistDetail.description
                : "No description"}
            </p>
          </CardContent>
          <CardFooter className="">
            <Button>Edit</Button>
            <Button>Save new playlist</Button>
          </CardFooter>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Songs</h2>

        {/* <div> */}
        {/*   {playlistDetail.tracks.items.map((trackDetail) => { */}
        {/*     return ( */}
        {/*       <div key={trackDetail.track.id}> */}
        {/*         {trackDetail.track.name} - {trackDetail.track.album.name} */}
        {/*       </div> */}
        {/*     ); */}
        {/*   })} */}
        {/* </div> */}

        {/* <PlaylistTable /> */}
      </section>
    </div>
  );
}
{
}
