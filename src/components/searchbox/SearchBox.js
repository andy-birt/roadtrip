import { createControlComponent } from "@react-leaflet/core";
import { Control, DomUtil, DomEvent, LatLng, marker} from "leaflet";
import "./SearchBox.css";

//* Setup the SearchBox component
Control.SearchBox = Control.extend({
  options: {
    position: 'topleft'
  },
  //* When we add it to the map run this function
  onAdd: (map) => {
    //* Create the component from JS scratch basically
    //* We need to use DomUtil.create() here to create the element
    //* or else this will throw errors in the application
    let searchResults = [];

    const searchBoxContainer = DomUtil.create('div', 'search-container');

    const searchInput = DomUtil.create('input', 'form-control');
    searchInput.setAttribute('list', 'search-results');
    searchInput.placeholder = 'Search Here...';
    searchBoxContainer.appendChild(searchInput);

    const searchDataList = DomUtil.create('datalist', 'search-results-datalist');
    searchDataList.id="search-results";
    searchBoxContainer.appendChild(searchDataList);

    DomEvent.on(searchInput, 'keyup', (e) => {

      return fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${e.target.value}&accept-language=en&countrycodes=us&limit=5`)
      .then(res => res.json())
      .then(results => {
        searchResults = results.slice();
        document.getElementById('search-results').innerHTML = '';
        document.getElementById('search-results').append(...results.map( result => {
          const currentResult = DomUtil.create('option');
          currentResult.value = result.display_name;
          return currentResult;
        }));
      });
    });

    DomEvent.on(searchInput, 'input', (e) => {
      if (!e.inputType) {
        const selected = searchResults.find(r => r.display_name === e.target.value);
        const location = new LatLng(+selected.lat, +selected.lon);
        map.panTo(location);
        marker(location).addTo(map);
        console.log(selected)
        console.log(map)
      }
    });

    return searchBoxContainer;
  }
});

//* This is the actual component we will use in the map
export const SearchBox = createControlComponent((props) => new Control.SearchBox(props));