import React, { useState } from "react";
import "./App.css";
import {
  createRestaurant,
  getRestaurantByDocId,
  generateDummyRestaurant,
  addMenuToRestaurant,
  getRestaurants,
} from "./services/RestaurantApi";
import { Favorite, Header } from "./components";

import Footer from "./components/Footer";
import { Restaurants } from "./pages";
import JapaneseFavourites from "./pages/restaurant_lists/JapaneseFavourites";
import SearchPage from "./pages/SearchPage";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { getFavouriteFoodList } from "./services/FoodApi";

function App() {
  //test db
  React.useEffect(() => {
    async function getFavouriteFood() {
      console.log(await getFavouriteFoodList());
    }
    // pushData();
    async function getDataByDoc() {
      console.log(await getRestaurantByDocId("0hR0mV6IS0R82FlwzmVs"));
    }
    
    async function addMenu() {
      console.log(await addMenuToRestaurant("0CzvkWMGowuSA9syrqUu", ["HMUWDm8jTikjmksOzKd9"], ["HMUWDm8jTikjmksOzKd9", "wgmpXMZu9p3Ky9u8tmAU"]));
    }
    // getData();
    // getDataByDoc();
    // generateDumyRestaurantData();
    // generateDumyFoodData();
    // addMenu();
    getFavouriteFood();
  }, []);
  const [query, setQuery] = useState("");
  const getQueryDataHandler = (query: string) => {
    setQuery(query);
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Home getQuery={getQueryDataHandler} />}>
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
