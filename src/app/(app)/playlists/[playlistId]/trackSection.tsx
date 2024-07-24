import { getPlaylistTracks } from "@/app/actions/spotify/queries";
import { Suspense } from "react";

export default async function TracksSectionSuspense({
  playlistId,
}: {
  playlistId: string;
}) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">Songs</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <TracksSection playlistId={playlistId} />
      </Suspense>
    </section>
  );
}

async function TracksSection({ playlistId }: { playlistId: string }) {
  const playlistTracksAll = await getPlaylistTracks({
    playlistId: playlistId,
  });

  console.log(playlistTracksAll);

  return (
    <div>
      {playlistTracksAll.map((trackDetail) => {
        return (
          <div key={trackDetail.track.id}>
            {trackDetail.track.name} - {trackDetail.track.album.name}
          </div>
        );
      })}
    </div>
  );
}
