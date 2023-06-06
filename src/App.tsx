import React from "react";
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
import SearchPage from "./pages/SearchPage";
import JapaneseFavourites from "./pages/restaurant_lists/JapaneseFavourites";

function App() {
  //test db
  React.useEffect(() => {
    async function generateDumyRestaurantData() {
      await generateDummyRestaurant(10);
    }
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
      console.log(await getRestaurants(1, 5));
    }
    // pushData();
    async function getDataByDoc() {
      console.log(await getRestaurantByDocId("0hR0mV6IS0R82FlwzmVs"));
    }
    
    async function addMenu() {
      console.log(await addMenuToRestaurant("0CzvkWMGowuSA9syrqUu", ["HMUWDm8jTikjmksOzKd9"], ["HMUWDm8jTikjmksOzKd9", "wgmpXMZu9p3Ky9u8tmAU"]));
    }
    getData();
    // getDataByDoc();
    // generateDumyRestaurantData();
    // generateDumyFoodData();
    // addMenu();
  }, []);
  return (
    <>
      <Header />
      <div className=" max-w-7xl mx-auto font-montserrat">
        <JapaneseFavourites></JapaneseFavourites>
        <div className="p-4"></div>
        <Restaurants></Restaurants>
      </div>
      <Footer />
    </>
  );
}

export default App;
