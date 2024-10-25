"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const MoviesDetails = () => {
  const [retrieveMovieData, setRetrieveMovieData] = useState<any>({});

  const { movie_id } = useParams();
  console.log(retrieveMovieData, "retrieve data");

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=4eeed1db0f15d9b8c88ef321e0e97f2c`
    )
      .then((res) => res.json())
      .then((data) => setRetrieveMovieData(data));
  }, []);
  return (
    <div className="mt-16">
      {retrieveMovieData?.id ? (
        <div>
          <Image
            src={`https://image.tmdb.org/t/p/original${retrieveMovieData?.poster_path}`}
            alt="Preview"
            width={1000}
            height={400}
          />
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default MoviesDetails;
