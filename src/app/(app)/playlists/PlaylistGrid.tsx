import PlaylistCard from "@/components/PlaylistCard";
import { type PlaylistType } from "./page";

export default function PlaylistGrid({
  playlists,
}: {
  playlists: PlaylistType[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {playlists?.map((playlist) => (
        <PlaylistCard
          key={playlist.id}
          id={playlist.id}
          name={playlist.name}
          trackCount={playlist.tracks.total}
          image={playlist.images[0] ?? ""}
        />
      ))}
    </div>
  );
}
