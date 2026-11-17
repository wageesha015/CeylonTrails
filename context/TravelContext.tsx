import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Place } from '../data/placeData';

interface TravelContextType {
  bucketList: Place[];
  toggleBucketList: (place: Place) => void;
  isSaved: (id: string) => boolean;
}

const TravelContext = createContext<TravelContextType>({
  bucketList: [],
  toggleBucketList: () => {},
  isSaved: () => false,
});

export const TravelProvider = ({ children }: { children: ReactNode }) => {
  const [bucketList, setBucketList] = useState<Place[]>([]);

  const toggleBucketList = (place: Place) => {
    setBucketList((prev) => {
      const exists = prev.some((item) => item.id === place.id);
      if (exists) {
        return prev.filter((item) => item.id !== place.id);
      } else {
        return [...prev, place];
      }
    });
  };

  const isSaved = (id: string) => bucketList.some((item) => item.id === id);

  return (
    <TravelContext.Provider value={{ bucketList, toggleBucketList, isSaved }}>
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = (): TravelContextType => useContext(TravelContext);