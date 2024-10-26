import useWatchListContext from "@/hooks/useWatchListContext";
import { MovieCardType, WatchlistContextType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const MovieCard = ({ item }: { item: MovieCardType }) => {
  const { watchlistData, setWatchlistData }: any = useWatchListContext();
  const router = useRouter();

  // handle watchlist
  const handleWatchlist = (data: MovieCardType) => {
    const matchedItem = watchlistData?.find(
      (item: WatchlistContextType) => item?.id === data?.id
    );
    if (matchedItem?.id) {
      const removeDuplicateItem = watchlistData?.filter(
        (item: WatchlistContextType) => item?.id !== matchedItem?.id
      );
      setWatchlistData(removeDuplicateItem);
    } else {
      setWatchlistData((prev: WatchlistContextType | any) => [
        ...prev,
        { id: data?.id, title: data?.title, poster_path: data?.poster_path },
      ]);
    }
  };

  return (
    <div className="w-[200px]">
      <div
        className="relative group cursor-pointer border"
        onClick={() => router.push(`/movies/${item?.id}`)}
      >
        <Image
          src={`https://image.tmdb.org/t/p/original${item?.poster_path || ""}`}
          alt="Preview"
          width={200}
          height={250}
        />
        {/* hover content start */}
        <div
          className="absolute top-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300"
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))",
          }}
        >
          <button
            onClick={(event) => {
              event.stopPropagation();
              handleWatchlist(item);
            }}
            className="bg-gray-500 hover:bg-gray-700 duration-300 text-white p-3"
          >
            {watchlistData?.some(
              (value: WatchlistContextType) => value?.id === item?.id
            )
              ? "Remove from Watchlist"
              : "Add to Watchlist"}
          </button>
        </div>
        {/* hover content end */}
      </div>

      <div className="mt-2">
        <h3
          onClick={() => router.push(`/movies/${item?.id}`)}
          title={item?.title}
          className="text-[17px] max-w-[190px] truncate font-semibold cursor-pointer w-fit hover:text-blue-500 duration-300"
        >
          {item?.title}
        </h3>
      </div>
    </div>
  );
};

export default MovieCard;
