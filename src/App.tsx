import React, { useState } from "react";
import "./App.css";
import JapaneseFavourites from "./pages/restaurant_lists/JapaneseFavourites";
import SearchPage from "./pages/SearchPage";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { getFavouriteFoodList } from "./services/FoodApi";
import { UserLogin, createUser } from "./services/auth/Auth";
import { IUserModel } from "./models";
import { UserGender, UserRole } from "./models/enum";
import { Login } from "./pages";

function App() {
  const testUser: IUserModel = {
    email: "hoanganhdepzai123@gmail.com",
    username: "hoanh dep zai",
    fullname: "Hoanh dep zai",
    gender: UserGender.Male,
    phone: "01234567891",
    nationality: "Duc Quoc Xa",
    point: "cho nay sao lai la string nhi",
    image: "https://seeklogo.com/images/L/liverpool-fc-logo-027452BE2B-seeklogo.com.png?v=638133601200000000",
    role: UserRole.Guest,
    is_active: true,
    created_at: new Date(Date.now()),
  }
  //test db
  React.useEffect(() => {
    async function getFavouriteFood() {
      console.log(await getFavouriteFoodList());
    }
    getFavouriteFood();
    async function createMockUser() {
      console.log(await createUser(testUser, "12345678"));
    }
    // createMockUser();
    async function LoginTest() {  
      console.log(await UserLogin("hoanganhdepzai123@gmail.com", "12345678"));
    }
    // LoginTest();
  }, []);
  const [query, setQuery] = useState("");
  const getQueryDataHandler = (query: string) => {
    setQuery(query);
  };
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Home getQuery={getQueryDataHandler} />}>
          <Route path="" element={<JapaneseFavourites />}></Route>
          <Route path="japanese-favorites" element={<JapaneseFavourites />} />
          <Route path="search" element={<SearchPage query={query} />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
