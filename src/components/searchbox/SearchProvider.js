import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {

  const [ results, setResults ] = useState([]);

  const [ selectedLocations, setSelectedLocations ] = useState([]);

  const getResults = (q, signal) => {
    return fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${q}&accept-language=en&countrycodes=us&limit=5`, { signal })
    .then(res => res.json())
    .then(results => {
      setResults(results);
      return results;
    })
    .catch((e) => {
      if (e.name === 'AbortError') return e.name;
    });
  }

  return (
    <SearchContext.Provider value={{
      results, getResults, selectedLocations, setSelectedLocations
    }}>
      {children}
    </SearchContext.Provider>
  );
}