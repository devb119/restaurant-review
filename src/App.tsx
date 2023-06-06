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
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  const [query, setQuery] = useState("");
  const getQueryDataHandler = (query: string) => {
    setQuery(query);
  };
  return (
    <>
      <Routes>
        <Route path="/" element={ <Home getQuery={ getQueryDataHandler } />}>
          <Route path="" element={<JapaneseFavourites />}></Route>
          <Route
            path="japanese-favorites"
            element={<JapaneseFavourites />}
          ></Route>
          <Route path="restaurants" element={<Restaurants />}></Route>
          <Route path="search" element={<SearchPage query={query} />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
