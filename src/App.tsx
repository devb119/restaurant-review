import React from "react";
import "./App.css";
import {
  createRestaurant,
  getRestaurantsByName,
  getRestaurantByDocId,
} from "./services/RestaurantApi";
import { Favorite, Header } from "./components";
import JapaneseFavourites from "./pages/restaurant_lists/japaneseFavourites";
import { Restaurants } from "./pages";
import RestaurantSearch from "./components/RestaurantSearch/RestaurantSearch";
import SearchPage from "./pages/SearchPage";

function App() {
  //test db
  React.useEffect(() => {
    async function pushData() {
      await createRestaurant({
        name: "Hoang Anh dep zai 345",
        email: "hoanhdz@gmail.com",
        address: "so 7 ho Thien Quang 2",
        manager_id: "1",
        description: "quan ngon",
        image: "",
        phone: "113",
        license_image: "",
        is_active: true,
        food_list: [],
      });
    }
    async function getData() {
      console.log(await getRestaurantsByName("Hoang Ah"));
    }
    // pushData();
    async function getDataByDoc() {
      console.log(await getRestaurantByDocId("0hR0mV6IS0R82FlwzmVs"));
    }
    getData();
    // getDataByDoc();
  }, []);
  return (
    <>
      <Header />
      <div className=" max-w-7xl mx-auto font-montserrat">
        <JapaneseFavourites></JapaneseFavourites>
        <div className="p-4"></div>
        <Restaurants></Restaurants>
      </div>
      <SearchPage />
    </>
  );
}

export default App;
