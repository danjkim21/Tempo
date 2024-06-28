"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useSession, signIn } from "next-auth/react";

export default function SignInBtn() {
  const { status } = useSession();

  if (status === "loading") {
    return <Button>Loading...</Button>;
  } else if (status === "unauthenticated") {
    return <Button onClick={() => signIn()}>Sign In</Button>;
  } else if (status === "authenticated") {
    return (
      <Button asChild>
        <Link href="/playlists">Go to App</Link>
      </Button>
    );
  }
}
