import React, { useState } from "react";
import "./App.css";
import JapaneseFavourites from "./pages/restaurant_lists/JapaneseFavourites";
import { Route, Routes } from "react-router-dom";
import { Home, NotFound, SearchPage, Auth } from "./pages";
import { Login, Signup } from "./components";
import RestaurantDetail from "./pages/restaurant_details/RestaurantDetail";
import FoodDetail from "./pages/food_details/FoodDetail";
import { useAuth } from "./hooks/useAuth";

function App() {
  // const testFoodReview: FoodReview = {
  //   id: "2",
  //   food_id: "1",
  //   star: 5.0,
  //   about_price: " not good bro",
  //   about_decoration: "bad vcl bro",
  //   other: "good bro",
  // };
  const user = useAuth();
  console.log(user);
  // const testCoupon: Coupons = {
  //   id: "1",
  //   restaurant_id: "U0JWRsWq2wAn4xmaOV8y",
  //   name: "mua 2 tang 1",
  //   description: "onlyfans",
  //   sale: 20,
  //   point: 50,
  //   quantity: 5,
  //   expired_at: new Date(Date.now()),
  //   status: 1,
  //   image: "abc",
  //   created_at: new Date(Date.now()),
  //   updated_at: new Date(Date.now()),
  // };
  //test db
  React.useEffect(() => {
    /* 
                          dung xoa de namduong test nha :D
    */

    // async function getFavouriteFood() {
    //   console.log(await getFavouriteFoodList());
    // }
    // getFavouriteFood();
    // async function createMockUser() {
    //   console.log(await createUser(testUser, "12345678"));
    // }
    // // createMockUser();
    // async function LoginTest() {
    //   console.log(await UserLogin("hoanganhdepzai123@gmail.com", "12345678"));
    // }

    // async function addCoupon() {
    //   console.log(await createNewCoupon(testCoupon));
    // }

    // async function getReview() {
    //   console.log(await getFoodReviewsById("2"));
    // }

    // async function deleteReviewById() {
    //   console.log(await deleteFoodReview("5lMCOnPVJ3MfwBOYkGPM"));
    // }

    // addCoupon();
    // getReview();
    // deleteReviewById();
    // LoginTest();
  }, []);
  const [query, setQuery] = useState("");
  const [searchOption, setSearchOption] = useState(1);
  const getQueryDataHandler = (query: string, option: number) => {
    setQuery(query);
    setSearchOption(option);
  };
  return (
    <>
      <Routes>
        <Route path="auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<Signup />} />
        </Route>
        <Route path="/" element={<Home getQuery={getQueryDataHandler} />}>
          <Route path="" element={<JapaneseFavourites />}></Route>
          <Route path="japanese-favorites" element={<JapaneseFavourites />} />
          <Route
            path="restaurants/:id"
            element={<RestaurantDetail></RestaurantDetail>}
          ></Route>
          <Route path="food/:id" element={<FoodDetail></FoodDetail>}></Route>
          <Route
            path="search"
            element={<SearchPage query={query} searchOption={searchOption} />}
          ></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
