"use client";
import { WatchlistContextType } from "@/types";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type ContextType = {
  watchlistData: WatchlistContextType;
  setWatchlistData: Dispatch<SetStateAction<WatchlistContextType>>;
};

export const WatchListContext = createContext<ContextType | unknown>(null);

const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlistData, setWatchlistData] = useState<WatchlistContextType[]>(
    []
  );
  return (
    <WatchListContext.Provider value={{ watchlistData, setWatchlistData }}>
      {children}
    </WatchListContext.Provider>
  );
};

export default WatchlistProvider;
