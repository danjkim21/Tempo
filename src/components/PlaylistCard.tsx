import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type SVGProps } from "react";
import Image from "next/image";
import { Music2Icon } from "./Icons";

export default function PlaylistCard({
  name,
  id,
  trackCount,
  image,
}: {
  name: string;
  id: string;
  trackCount: number;
  image: string;
}) {
  return (
    <Card className="playlist">
      <Link href="#" className="" prefetch={false}>
        <span className="sr-only">Select {name} Playlist</span>
      </Link>
      <CardHeader className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-4xl">
          {image.url ? (
            <Image
              src={image.url}
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 object-cover"
            />
          ) : (
            <Music2Icon className="text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{trackCount} tracks</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={`playlists/${id}`}>Select</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
