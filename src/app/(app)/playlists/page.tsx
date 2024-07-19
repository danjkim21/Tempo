import PlaylistGrid from "./PlaylistGrid";
import { fetchPlaylists } from "@/app/actions/spotify/queries";

export default async function PlaylistsPage() {
  const playlists = await fetchPlaylists();

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
