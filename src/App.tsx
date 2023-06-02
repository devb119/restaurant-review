import React from "react";
import "./App.css";
import {
  createRestaurant,
  getRestaurantsByName,
  getRestaurantByDocId,
} from "./services/RestaurantApi";
import { Header } from "./components";

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
    <div>
      <Header />
    </div>
  );
}

export default App;
