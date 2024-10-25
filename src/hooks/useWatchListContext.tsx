"use client";
import { useContext } from "react";
import { WatchListContext } from "./WatchlistProvider";

const useWatchListContext = () => {
  return useContext(WatchListContext);
};

export default useWatchListContext;
