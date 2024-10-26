"use client";
import Loader from "@/components/Loader";
import MovieCard from "@/components/MovieCard";
import { MovieCardType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type IFormInput = { title: string };

const page = () => {
  const [page, setPage] = useState(1);
  const [pageForSearch, setPageForSearch] = useState(1);
  const [data, setData] = useState<MovieCardType[]>([]);
  const [inputValue, setInputValue] = useState("");
  // console.log(process.env.NEXT_PUBLIC_API_KEY, "env");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  // hande submit search
  const onSubmit: SubmitHandler<IFormInput> = (value) => {
    setInputValue(value.title);
  };

  // fetch search value
  const fetchSearch = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${inputValue}&page=${pageForSearch}`;
    const res = await fetch(url);
    return res.json();
  };

  const {
    data: { results: searchResults = [] } = {},
    isLoading: isLoadingSearch,
    isSuccess: isSuccessSearch,
  } = useQuery({
    queryKey: ["searchMovies", inputValue, pageForSearch],
    queryFn: fetchSearch,
    enabled: Boolean(inputValue),
  });

  // store previous data when load more click in search
  useEffect(() => {
    if (pageForSearch > 1) {
      setData((prev: MovieCardType[]) => [...prev, ...searchResults]);
    } else {
      setData(searchResults);
    }
  }, [isSuccessSearch, pageForSearch]);

  // movies fetch function
  const fetchMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`;
    const res = await fetch(url);
    return res.json();
  };

  // movies fetching in tanstack query
  const {
    data: { results = [] } = {},
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["movies", page],
    queryFn: fetchMovies,
  });

  // store previous data when load more click
  useEffect(() => {
    if (page > 1) {
      setData((prev: MovieCardType[]) => [...prev, ...results]);
    } else {
      setData(results);
    }
  }, [isSuccess, page]);

  const conditionalFetch = () => {
    if (searchResults?.length) {
      if (pageForSearch > 1) return data;
      else return searchResults;
    } else {
      if (page > 1) return data;
      else return results;
    }
  };

  return (
    <div className="mt-16">
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
        <input
          {...register("title", {
            required: true,
            minLength: 4,
          })}
          placeholder="Search Movies title..."
          className="pl-2.5 outline-0 bg-cyan-900 text-gray-200 placeholder-gray-300 py-2 w-full"
        />
        <button
          type="submit"
          className="bg-gray-700 text-white py-2 px-4 border-0"
        >
          Search
        </button>
      </form>
      {errors.title && <p className="text-red-700">Minimum four character</p>}

      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
        {isLoadingSearch || isLoading
          ? Array(4)
              .fill(null)
              ?.map((_, index: number) => <Loader key={index} />)
          : conditionalFetch()?.map((item: MovieCardType, index: number) => (
              <MovieCard key={index} item={item} />
            ))}
      </div>

      <div className="text-center mt-7">
        <button
          onClick={() =>
            searchResults?.length
              ? setPageForSearch((prev: number) => prev + 1)
              : setPage((prev: number) => prev + 1)
          }
          className="bg-gray-600 hover:bg-gray-700 duration-300 text-white p-3 w-2/5"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default page;
