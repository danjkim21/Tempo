"use client";

import PlaylistCard from "@/components/PlaylistCard";
import { useSession } from "next-auth/react";

export default function PlaylistsPage() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="grid gap-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Select a Playlist</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <PlaylistCard />
        </div>
      </div>

      {/* <div>
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
      </div> */}
    </div>
  );
}
