import React from "react";
import "./App.css";
import { createRestaurant } from "./services/RestaurantApi";
import { Header } from "./components";

function App() {
  //test db
  // React.useEffect(() => {
  //   async function pushData() {
  //     await createRestaurant({
  //       docId: "123",
  //       id: "abcdef",
  //       name: "Hoang Anh dep zai",
  //     }).then((res) => console.log(res));
  //   }
  //   pushData();
  // }, []);
  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
