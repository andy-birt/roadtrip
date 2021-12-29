// import { createControlComponent } from "@react-leaflet/core";
// import { Control, DomUtil, DomEvent, LatLng, marker} from "leaflet";
import { map, LatLng } from "leaflet";
import { useEffect, useState, useContext } from "react";
import { SearchContext } from "./SearchProvider";
import "./SearchBox.css";

//* Setup the SearchBox component
// Control.SearchBox = Control.extend({
//   options: {
//     position: 'topleft'
//   },
  //* When we add it to the map run this function
  // onAdd: (map) => {
    //* Create the component from JS scratch basically
    //* We need to use DomUtil.create() here to create the element
    //* or else this will throw errors in the application
    // let searchResults = [];

    // const searchBoxContainer = DomUtil.create('div', 'search-container');

    // const searchInput = DomUtil.create('input', 'form-control');
    // searchInput.id = "roadtrip-search-input";
    // searchInput.setAttribute('list', 'search-results');
    // searchInput.placeholder = 'Search Here...';
    // searchBoxContainer.appendChild(searchInput);

    // const searchDataList = DomUtil.create('datalist', 'search-results-datalist');
    // searchDataList.id="search-results";
    // searchBoxContainer.appendChild(searchDataList);

    // DomEvent.on(searchInput, 'keyup', (e) => {

    //   return fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${e.target.value}&accept-language=en&countrycodes=us&limit=5`)
    //   .then(res => res.json())
    //   .then(results => {
    //     searchResults = results.slice();
    //     document.getElementById('search-results').innerHTML = '';
    //     document.getElementById('search-results').append(...results.map( result => {
    //       const currentResult = DomUtil.create('option');
    //       currentResult.value = result.display_name;
    //       return currentResult;
    //     }));
    //   });
    // });

    // DomEvent.on(searchInput, 'input', (e) => {
    //   if (!e.inputType) {
    //     const selected = searchResults.find(r => r.display_name === e.target.value);
    //     const location = new LatLng(+selected.lat, +selected.lon);
    //     map.panTo(location);
    //     marker(location).addTo(map)
    //     .bindPopup(`<span>${selected.display_name}</span><button id='popup-${selected.place_id}' class='btn btn-primary form-control'>Add to Trip</button>`);
    //   }
    // });

    // DomEvent.on(document.body, 'click', (e) => {
    //   if (!!e.target.id && e.target.id.startsWith('popup')) {
    //     const [,placeId] = e.target.id.split('-');
    //     const selected = searchResults.find(r => r.place_id === +placeId);
    //     // return fetch(`http://localhost:8088/trips/`)
    //     console.log(selected)
    //     console.log(map)
    //   }
    // });

    // return searchBoxContainer;
//   }
// });

//! This is not the actual component we will use in the map
// export const SearchBox = createControlComponent((props) => new Control.SearchBox(props));

//* This is the actual component we will use in the map
export const SearchBox = () => {

  const { results, getResults } = useContext(SearchContext);

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
          id="roadtrip-search-input" 
          className="form-control" 
          list="search-results" 
          placeholder="Search Here..." 
          onInput={
            (e) => {
              if (e.nativeEvent.inputType === 'insertText' && e.data !== ' ') {
                setQuery(e.target.value);
              } else {
                const selected = results.find(r => r.display_name === e.target.value);
                const location = new LatLng(+selected.lat, +selected.lon);
                console.log(map);
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