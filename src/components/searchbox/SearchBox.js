import { createControlComponent } from "@react-leaflet/core";
import { Control, DomUtil } from "leaflet";


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
    const searchInput = DomUtil.create('input', 'form-control');
    searchInput.placeholder = 'Search Here...';
    return searchInput;
  }
});

//* This is the actual component we will use in the map
export const SearchBox = createControlComponent((props) => new Control.SearchBox(props));