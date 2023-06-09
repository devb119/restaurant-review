import React, { useState } from "react";
import "./App.css";
import JapaneseFavourites from "./pages/restaurant_lists/JapaneseFavourites";
import { Route, Routes } from "react-router-dom";
import { Home, NotFound, SearchPage, Auth } from "./pages";
import { Login, Signup } from "./components";
import { getFavouriteFoodList } from "./services/FoodApi";
import { UserLogin, createUser } from "./services/auth/Auth";
import { IUserModel } from "./models";
import { UserGender, UserRole } from "./models/enum";

function App() {
  const testUser: IUserModel = {
    email: "hoanganhdepzai1234566@gmail.com",
    username: "hoanh dep zai 2",
    fullname: "Hoanh dep zai 2",
    gender: UserGender.Male,
<<<<<<< HEAD
    phone: "01234567892",
    nationality: "Duc Quoc Xa 2",
    point: "cho nay sao lai la string nhi 2",
    image: "https://seeklogo.com/images/L/liverpool-fc-logo-027452BE2B-seeklogo.com.png?v=638133601200000000",
    role: UserRole.Reviewer,
=======
    phone: "01234567891",
    nationality: "Duc Quoc Xa",
    point: 0,
    image:
      "https://seeklogo.com/images/L/liverpool-fc-logo-027452BE2B-seeklogo.com.png?v=638133601200000000",
    role: UserRole.Guest,
>>>>>>> 162dc695695dbe1ea51b5fcaabb8304b6644ca15
    is_active: true,
    created_at: new Date(Date.now()),
  };
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
        <Route path="auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<Signup />} />
        </Route>
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
