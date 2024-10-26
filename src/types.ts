export type WatchlistContextType = {
  id: number;
  title: string;
  poster_path: string;
};

export type MovieCardType = {
  id: number;
  poster_path: string;
  title: string;
  backdrop_path?: string;
  overview?: string;
  release_date?: string;
};

export type MovieDetailsCast = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};
