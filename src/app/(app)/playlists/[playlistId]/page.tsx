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

async function fetchPlaylistDetail(params: {
  playlistId: string;
}): Promise<SpotifyPlaylist> {
  const session = await getServerSession(authOptions);

  const response: Response = await fetch(
    "https://api.spotify.com/v1/playlists/" + params.playlistId,
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

export default async function PlaylistDetailPage({
  params,
}: {
  params: { playlistId: string };
}) {
  const playlistDetail = await fetchPlaylistDetail({
    playlistId: params.playlistId,
  });

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
    </div>
  );
}
{
}
