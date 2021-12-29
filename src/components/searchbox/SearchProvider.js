import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {

  const [ results, setResults ] = useState([]);

  const getResults = (q) => {
    return fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${q}&accept-language=en&countrycodes=us&limit=5`)
    .then(res => res.json())
    .then(results => setResults(results));
  }

  return (
    <SearchContext.Provider value={{
      results, getResults
    }}>
      {children}
    </SearchContext.Provider>
  );
}