import Link from "next/link";
import SignOutBtn from "./auth/SignOutBtn";

export default function NavBar() {
  return (
    <header className="bg-background sticky top-0 z-10 border-b shadow-sm">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link
          href="#"
          className="mr-6 flex items-center gap-2"
          prefetch={false}
        >
          <span className="text-lg font-bold">Tempo Runner</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <Link
            href="/playlists"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            Playlists
          </Link>
          <Link
            href="/profile"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            Profile
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            Open Spotify
          </Link>
          <SignOutBtn />
        </nav>
      </div>
    </header>
  );
}
