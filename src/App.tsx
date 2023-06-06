import React from "react";
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
  //test db
  React.useEffect(() => {
    // async function generateDumyRestaurantData() {
    //   await generateDummyRestaurant(5);
    // }
    // async function pushData() {
    //   await createRestaurant({
    //     name: "Hoang Anh dep zai 345",
    //     email: "hoanhdz@gmail.com",
    //     address: "so 7 ho Thien Quang 2",
    //     manager_id: "1",
    //     description: "quan ngon",
    //     image: "",
    //     phone: "113",
    //     license_image: "",
    //     is_active: true,
    //     food_list: [],
    //   });
    // }
    // async function getData() {
    //   console.log(await getRestaurantsByName("Hoang Ah"));
    // }
    // // pushData();
    // async function getDataByDoc() {
    //   console.log(await getRestaurantByDocId("0hR0mV6IS0R82FlwzmVs"));
    // }
    // getDataByDoc();
    // getData();
    // getDataByDoc();
    // generateDumyRestaurantData();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route
            path=""
            element={<JapaneseFavourites />}
          ></Route>
          <Route
            path="japanese-favorites"
            element={<JapaneseFavourites />}
          ></Route>
          <Route path="restaurants" element={<Restaurants />}></Route>
          <Route path="search" element={<SearchPage />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
