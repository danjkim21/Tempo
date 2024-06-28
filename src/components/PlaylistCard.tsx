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

// type PlaylistCardProps = {};

export default function PlaylistCard({
  name,
  trackCount,
  image,
}: {
  name: string;
  trackCount: number;
  image: string;
}) {
  // {}: PlaylistCardProps
  return (
    <Card className="playlist">
      <Link href="#" className="" prefetch={false}>
        <span className="sr-only">Select {name} Playlist</span>
      </Link>
      <CardHeader className="flex items-center gap-4">
        <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-full text-4xl">
          {/* <Music2Icon className="text-muted-foreground" /> */}
          <Image
            src={image.url}
            alt=""
            width={64}
            height={64}
            className="h-16 w-16 object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-muted-foreground text-sm">{trackCount} tracks</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Select</Button>
      </CardFooter>
    </Card>
  );
}

function Music2Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="18" r="4" />
      <path d="M12 18V2l7 4" />
    </svg>
  );
}
