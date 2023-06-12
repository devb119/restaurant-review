import React, { useState } from "react";
import "./App.css";
import JapaneseFavourites from "./pages/restaurant_lists/JapaneseFavourites";
import { Route, Routes } from "react-router-dom";
import { Home, NotFound, SearchPage, Auth } from "./pages";
import { Login, Signup } from "./components";
import { getFavouriteFoodList } from "./services/FoodApi";
import { UserLogin, createUser } from "./services/auth/Auth";
import { IUserModel } from "./models";
import { createNewReview, getReviewsByRestaurantId, deleteReview } from "./services/ReviewApi";
import { createNewFoodReview, getFoodReviewsById, deleteFoodReview} from "./services/FoodReviewApi";
import Review from "./models/reviews";
import FoodReview from "./models/food_reviews";
import { UserGender, UserRole } from "./models/enum";

function App() {
  const testUser: IUserModel = {
    email: "hoanganhdepzai123@gmail.com",
    username: "hoanh dep zai",
    fullname: "Hoanh dep zai",
    gender: UserGender.Male,
    phone: "01234567891",
    nationality: "Duc Quoc Xa",
    point: 0,
    image:
      "https://seeklogo.com/images/L/liverpool-fc-logo-027452BE2B-seeklogo.com.png?v=638133601200000000",
    role: UserRole.Guest,
    is_active: true,
    created_at: new Date(Date.now()),
  };

  const testReview : Review = {
    id: "22",
    restaurant_id: "2",
    user_id: "30",
    about_space: "ban",
    about_quality: "ban vcl deo chiu duoc",
    other_review: "ban vai l",
    star: 1.0,
    is_active: true,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now()),
    food_review_list: [],
  }

  const testFoodReview : FoodReview = {
    id: "2",
    food_id: "1",
    star: 5.0,
    about_price: " not good bro",
    about_decoration: "bad vcl bro",
    other: "good bro"
  }
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

    // async function addReview() {
    //   console.log(await createNewFoodReview(testFoodReview));
    // }

    // async function getReview() {
    //   console.log(await getFoodReviewsById("2"));
    // }

    // async function deleteReviewById() {
    //   console.log(await deleteFoodReview("5lMCOnPVJ3MfwBOYkGPM"));
    // }

    // addReview();
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
          <Route path="search" element={<SearchPage query={query} searchOption={searchOption} />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
