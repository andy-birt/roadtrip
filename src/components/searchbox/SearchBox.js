import { useEffect, useState, useContext } from "react";
import { LatLng } from "leaflet";
import { useMap } from "react-leaflet";
import { SearchContext } from "./SearchProvider";
import { POIRoutesContext } from "../poiRoutes/POIRoutesProvider";
import { Spinner } from "react-bootstrap";
import "./SearchBox.css";

export const SearchBox = ({ homeCoords, setStartingLocation }) => {

  const map = useMap();

  const { results, getResults, selectedLocations, setSelectedLocations } = useContext(SearchContext);

  const { getRoutes } = useContext(POIRoutesContext);

  const [ query, setQuery ] = useState('');

  const [ loading, setLoading ] = useState(false);

  const handleInput = (e) => {
    if (e.nativeEvent.inputType === 'insertText' && e.data !== ' ') {
      
      //* Here we are basically setting the query for the search, that's it
      setQuery(e.target.value);

    } else if (e.nativeEvent.inputType !== 'deleteContentBackward' && e.nativeEvent.inputType !== 'deleteContentForward') {
      
      //* When a user clicks or selects one of the results
      //* Get that result and place it on the map
      const selected = results.find(r => r.display_name === e.target.value);
      const location = new LatLng(+selected.lat, +selected.lon);
      

      //* This condition mainly runs in the trip detail since we have a starting location 
      //* Else the trip is a new trip and it needs a starting location
      if (homeCoords) {
        map.setView(location, 13);
        getRoutes([[homeCoords[0], homeCoords[1]], [location.lat, location.lng]])
        .then((res) => {
          const isRoutable = res ? true : false;
          setSelectedLocations([
            ...selectedLocations,
            {
              textContents: selected.display_name,
              latlon: location,
              isRoutable: isRoutable
            }
          ]);
        });
      } else {
        map.setView([location.lat + 0.01, location.lng], 13);
        setStartingLocation({
          position: location,
          textContents: selected.display_name
        });
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    if (query !== '' && query.length > 2) {
      setLoading(true);
      getResults(query, controller.signal).then((res) => {
        if (res !== 'AbortError') setLoading(false);
      });
    }

    return () => controller.abort();
  }, [query]);

  return (
    <div className="search-container leaflet-control leaflet-bar">
      <input 
        className="form-control" 
        list="search-results" 
        placeholder="Search Here..." 
        onInput={handleInput}
      />
      { loading && <Spinner animation="border" role="status" /> }
      <datalist 
        className="search-results-datalist" 
        id="search-results"
      >
      {
        results.map(r => <option key={r.place_id} value={r.diaply_name}>{r.display_name}</option>)
      }
      </datalist>
    </div> 
  );
}