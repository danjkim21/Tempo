import { getServerSession } from "next-auth";
import PlaylistGrid from "./PlaylistGrid";
import { authOptions } from "@/server/auth";

// TODO: fix types for spotify response later
export type playlistResponseType = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: PlaylistType[];
};
export type PlaylistType = {
  collaborative: boolean;
  description: string;
  external_urls: Record<string, string>;
  href: string;
  id: string;
  images: string[];
  name: string;
  owner: Record<string, unknown>;
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: Record<string, unknown>;
  type: string;
  uri: string;
};

async function fetchPlaylists(): Promise<playlistResponseType> {
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

  return response.json() as Promise<playlistResponseType>;
}

export default async function PlaylistsPage() {
  const playlists: playlistResponseType = await fetchPlaylists();

  return (
    <div className="grid gap-8">
      <section>
        <h2 className="mb-4 text-2xl font-bold">Select a Playlist</h2>
        <PlaylistGrid playlists={playlists.items} />
      </section>

      {/* <section>
        <h2 className="mb-4 text-2xl font-bold">Playlist Details</h2>
        <Card>
          <CardHeader className="flex items-center gap-4">
            <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-full text-4xl">
              <Music2Icon className="text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Chill Vibes</h3>
              <p className="text-muted-foreground">20 tracks</p>
            </div>
          </CardHeader>
          <CardContent>
            <p>
              This playlist is perfect for relaxing and unwinding. It features a
              mix of chill electronic, indie, and acoustic tracks.
            </p>
          </CardContent>
          <CardFooter>
            <Button>Use Playlist</Button>
          </CardFooter>
        </Card>
      </section> */}
    </div>
  );
}
