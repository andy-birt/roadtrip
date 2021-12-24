import { createControlComponent } from "@react-leaflet/core";
import { Control, DomUtil } from "leaflet";
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

    const searchBoxContainer = DomUtil.create('div', 'search-container');

    const searchInput = DomUtil.create('input', 'form-control');
    searchInput.setAttribute('list', 'search-results');
    searchInput.placeholder = 'Search Here...';
    searchBoxContainer.appendChild(searchInput);

    const searchDataList = DomUtil.create('datalist', 'search-results-datalist');
    searchDataList.id="search-results";
    searchBoxContainer.appendChild(searchDataList);

    const testResult1 = DomUtil.create('option');
    testResult1.innerText = 'result1';

    searchDataList.appendChild(testResult1)

    return searchBoxContainer;
  }
});

//* This is the actual component we will use in the map
export const SearchBox = createControlComponent((props) => new Control.SearchBox(props));