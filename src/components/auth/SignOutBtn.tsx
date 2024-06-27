"use client";

import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export default function SignOutBtn() {
  return <Button onClick={() => signOut()}>Log Out</Button>;
}
