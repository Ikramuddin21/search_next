"use client";
import MovieCard from "@/components/MovieCard";
import useWatchListContext from "@/hooks/useWatchListContext";
import image from "@/assets/no_data_found1.png";
import Image from "next/image";
import { WatchlistContextType } from "@/types";

const Watchlist = () => {
  const { watchlistData }: any = useWatchListContext();

  return (
    <>
      {watchlistData?.length ? (
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
          {watchlistData?.map((item: WatchlistContextType, index: number) => (
            <MovieCard key={index} item={item} />
          ))}
        </div>
      ) : (
        <div className="mt-16 max-w-[550px] w-full mx-auto flex justify-center">
          <Image src={image} alt="Preview" className="w-full" />
        </div>
      )}
    </>
  );
};

export default Watchlist;
