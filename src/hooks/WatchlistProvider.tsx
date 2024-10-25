"use client";
import { WatchlistContextType } from "@/types";
import React, { createContext, ReactNode, useState } from "react";

export const WatchListContext = createContext(null);

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
