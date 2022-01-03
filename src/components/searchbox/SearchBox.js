import { useEffect, useState, useContext } from "react";
import { LatLng } from "leaflet";
import { useMap } from "react-leaflet";
import { SearchContext } from "./SearchProvider";
import "./SearchBox.css";

//* This is the actual component we will use in the map
export const SearchBox = () => {

  const map = useMap();

  const { results, getResults, selectedLocations, setSelectedLocations } = useContext(SearchContext);

  const [ query, setQuery ] = useState('');

  useEffect(() => {
    if (query !== '' && query.length > 2) {
      getResults(query);
    }
  }, [query]);

  return (
    <div className="leaflet-top leaflet-left">
      <div className="search-container leaflet-control leaflet-bar">
        <input 
          className="form-control" 
          list="search-results" 
          placeholder="Search Here..." 
          onInput={
            (e) => {
              if (e.nativeEvent.inputType === 'insertText' && e.data !== ' ') {
                setQuery(e.target.value);
              } else if (e.nativeEvent.inputType !== 'deleteContentBackward' && e.nativeEvent.inputType !== 'deleteContentForward') {
                const selected = results.find(r => r.display_name === e.target.value);
                const location = new LatLng(+selected.lat, +selected.lon);
                map.panTo(location);
                setSelectedLocations([
                  ...selectedLocations,
                  {
                    textContents: selected.display_name,
                    latlon: location
                  }
                ]);
              }
            }
          }
        />
        <datalist 
          className="search-results-datalist" 
          id="search-results"
          onChange={(e) => console.log(e)}
        >
        {
          results.map(r => <option key={r.display_name} value={r.diaply_name}>{r.display_name}</option>)
        }
        </datalist>
      </div> 
    </div>
  );
}