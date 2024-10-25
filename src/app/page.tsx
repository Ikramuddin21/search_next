"use client";
import MovieCard from "@/components/MovieCard";
import useWatchListContext from "@/hooks/useWatchListContext";
import { useEffect, useState } from "react";

const page = () => {
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);

  const { watchlistData }: any = useWatchListContext();

  console.log(watchlistData, "use watchlist");
  console.log(process.env.API_KEY, "env");
  // (https://api.themoviedb.org/3/search/movie?query=...).
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=4eeed1db0f15d9b8c88ef321e0e97f2c&page=${page}`
    )
      .then((res) => res.json())
      .then((res) => setData((prev: any) => [...prev, ...res?.results]));
  }, [page]);

  // search result
  // useEffect(() => {
  //   fetch(
  //     `https://api.themoviedb.org/3/search/movie?query=${}&page=${page}`
  //   )
  //     .then((res) => res.json())
  //     .then((res) => setData((prev: any) => [...prev, ...res?.results]));
  // }, [page]);
  console.log(data, "data");

  return (
    <div className="mt-16">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search Movies title..."
          className="pl-2.5 outline-0 bg-cyan-900 text-gray-200 placeholder-gray-300 py-2 w-full"
        />
        <button className="bg-gray-700 text-white py-2 px-4 border-0">
          Search
        </button>
      </div>

      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
        {data?.map((item: any, index: number) => (
          <MovieCard key={index} item={item} />
        ))}
      </div>

      <div className="text-center mt-7">
        <button
          onClick={() => setPage((prev: number) => prev + 1)}
          className="bg-gray-600 hover:bg-gray-700 duration-300 text-white p-3 w-2/5"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default page;
