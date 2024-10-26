"use client";
import Loader from "@/components/Loader";
import MovieCard from "@/components/MovieCard";
import useWatchListContext from "@/hooks/useWatchListContext";
import { MovieCardType, MovieDetailsCast, WatchlistContextType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useParams } from "next/navigation";

const MoviesDetails = () => {
  const { movie_id } = useParams();
  const { watchlistData, setWatchlistData }: any = useWatchListContext();

  // movie details fetch
  const fetchMovieDetails = async () => {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
    const res = await fetch(url);
    return res.json();
  };

  const { data: retrieveMovieData = {}, isLoading: isLoadingMovieDetails } =
    useQuery({
      queryKey: ["movieDetails"],
      queryFn: fetchMovieDetails,
      refetchInterval: 1000 * 60,
    });

  // cast fetch api
  const fetchCast = async () => {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
    const res = await fetch(url);
    return res.json();
  };

  const { data: { cast: castData } = {}, isLoading: isLoadingCast } = useQuery({
    queryKey: ["cast"],
    queryFn: fetchCast,
  });

  // recommendation fetch api
  const fetchRecommendation = async () => {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
    const res = await fetch(url);
    return res.json();
  };

  const {
    data: { results: recommendationData } = {},
    isLoading: isLoadingRecommendation,
  } = useQuery({
    queryKey: ["recommendations"],
    queryFn: fetchRecommendation,
    refetchInterval: 1000 * 60,
  });

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
      setWatchlistData((prev: WatchlistContextType[]) => [
        ...prev,
        { id: data?.id, title: data?.title, poster_path: data?.poster_path },
      ]);
    }
  };

  return (
    <div className="mt-16">
      <div
        className="h-auto md:h-[670px] w-[95vw] p-4 content-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original${retrieveMovieData?.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {isLoadingMovieDetails || isLoadingCast ? (
          <h1 className="text-gray-200 text-center font-bold">Loading...</h1>
        ) : (
          <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
            <div className="self-center">
              <img
                src={`https://image.tmdb.org/t/p/original${retrieveMovieData?.poster_path}`}
                alt="Preview"
                className="w-auto mx-auto h-[450px] border border-gray-700"
              />
            </div>

            <div className="text-gray-200 w-full md:w-3/5">
              <p>{retrieveMovieData?.overview}</p>
              <ul className="mt-3 ml-4 list-disc">
                {retrieveMovieData?.genres?.map(
                  (item: { id: number; name: string }) => (
                    <li key={item?.id}>{item?.name}</li>
                  )
                )}
              </ul>
              <div className="mt-2 flex items-center gap-4">
                <h5>
                  <span className="font-bold">Release: </span>
                  <span className="text-sm">
                    {moment(retrieveMovieData?.release_date).format("LL")}
                  </span>
                </h5>
                <button
                  onClick={() => handleWatchlist(retrieveMovieData)}
                  className="bg-gray-500 hover:bg-gray-700 duration-300 text-white py-1 px-3 rounded z-10"
                >
                  {watchlistData?.some(
                    (value: WatchlistContextType) =>
                      value?.id === retrieveMovieData?.id
                  )
                    ? "Remove from Watchlist"
                    : "Add to Watchlist"}
                </button>
              </div>
              {/* cast section */}
              <div
                className="mt-6 flex items-center gap-4 overflow-x-auto scrollbar-hide"
                style={{
                  scrollbarColor: "#164e63 #374151",
                  scrollbarWidth: "thin",
                }}
              >
                {castData?.map((item: MovieDetailsCast) => (
                  <div
                    key={item?.id}
                    className="w-[140px] pb-4 shadow-md bg-white"
                  >
                    <img
                      className="w-full h-[180px]"
                      src={`https://image.tmdb.org/t/p/original${item?.profile_path}`}
                      alt="Preview"
                    />
                    <div className="w-[140px] pt-2 pl-2 pr-0.5 text-gray-900">
                      <h4 title={item?.name} className="font-bold truncate">
                        {item?.name}
                      </h4>
                      <h4
                        title={item?.character}
                        className="text-sm truncate mt-1"
                      >
                        {item?.character}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* recommendation movies */}
      <div className="mt-8 place-items-center">
        <h2 className="text-[22px] font-bold">Recommendations</h2>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoadingRecommendation
            ? Array(4)
                .fill(null)
                ?.map((_, index: number) => <Loader key={index} />)
            : recommendationData?.map((item: MovieCardType, index: number) => (
                <MovieCard key={index} item={item} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesDetails;
