import React, { useState } from "react";
import "./App.css";
import {
  createRestaurant,
  getRestaurantsByName,
  getRestaurantByDocId,
  generateDummyRestaurant,
} from "./services/RestaurantApi";
import { Favorite, Header } from "./components";
import { Restaurants } from "./pages";
import JapaneseFavourites from "./pages/restaurant_lists/JapaneseFavourites";
import SearchPage from "./pages/SearchPage";

function App() {
  const [query, setQuery] = useState("");
  const getQueryDataHandler = (query: string) => {
    setQuery(query);
  };
  return (
    <>
      <Header getQueryData={getQueryDataHandler} />
      {/* <div className=" max-w-7xl mx-auto font-montserrat">
        <JapaneseFavourites></JapaneseFavourites>
        <div className="p-4"></div>
        <Restaurants></Restaurants>
      </div> */}
      <SearchPage query={query} />
    </>
  );
}

export default App;
