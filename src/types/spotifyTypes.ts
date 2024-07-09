type SpotifyImage = {
  height: number | null;
  url: string;
  width: number | null;
};

type SpotifyExternalUrls = {
  spotify: string;
};

type SpotifyFollowers = {
  href: string | null;
  total: number;
};

type SpotifyOwner = {
  display_name: string;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
};

type SpotifyTrack = {
  album: {
    album_type: string;
    artists: Array<{
      external_urls: SpotifyExternalUrls;
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }>;
    available_markets: string[];
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  };
  artists: Array<{
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }>;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
};

type SpotifyTracks = {
  href: string;
  items: SpotifyTrack[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

export type SpotifyPlaylist = {
  collaborative: boolean;
  description: string;
  external_urls: SpotifyExternalUrls;
  followers: SpotifyFollowers;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  owner: SpotifyOwner;
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: SpotifyTracks;
  type: string;
  uri: string;
};
