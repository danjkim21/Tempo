import Link from "next/link";
import SignOutBtn from "./auth/SignOutBtn";
import { Button } from "./ui/button";

export default function NavBar() {
  return (
    <header className="bg-background sticky top-0 z-10 border-b shadow-sm">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link
          href="/playlists"
          className="mr-6 flex items-center gap-2"
          prefetch={false}
        >
          <span className="text-lg font-bold">Tempo Runner</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <Button asChild className="hidden md:block">
            <Link
              href="https://open.spotify.com/"
              target="_blank"
              rel="noreferrer"
              prefetch={false}
            >
              Open Spotify
            </Link>
          </Button>
          <SignOutBtn />
        </nav>
      </div>
    </header>
  );
}
