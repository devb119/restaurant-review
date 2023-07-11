import React, { useState } from "react";
import "./App.css";
import JapaneseFavourites from "./pages/restaurant_lists/JapaneseFavourites";
import { Route, Routes } from "react-router-dom";
import { Home, NotFound, SearchPage, Auth } from "./pages";
import { Login, Signup } from "./components";
import RestaurantDetail from "./pages/restaurant_details/RestaurantDetail";
import FoodDetail from "./pages/food_details/FoodDetail";
import { useAuth } from "./hooks/useAuth";
import { searchOption } from "./models/enum/searchOption";
import ManageMenu from "./pages/manage_restaurant/ManageMenu";
import { Dialog } from "./components/common";
import Admin from "./pages/admin/Admin";


// eslint-disable-next-line react-refresh/only-export-components
export const searchContext = React.createContext({query: "", searchOption: searchOption.RestaurantSearch, activeLink: ""});

function App() {
  const user = useAuth();
  console.log(user);

 
  const [query, setQuery] = useState("");
  const [searchOption, setSearchOption] = useState(1);
  const [activeLink, setActiveLink] = useState("");
  const getQueryDataHandler = (query: string, option: number) => {
    setQuery(query);
    setSearchOption(option);
    setActiveLink("search");
  };

  return (
    <>
      <searchContext.Provider value={{query, searchOption, activeLink}}>
        <Routes>
          <Route path="auth" element={<Auth />}>
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<Signup />} />
          </Route>
          
          <Route path="/" element={ <Home getQuery={ getQueryDataHandler } /> }>
              <Route path="admin" element={<Admin></Admin>}></Route>
              <Route path="manage-menu" element={<ManageMenu></ManageMenu>}></Route>
              <Route path="" element={<JapaneseFavourites />}></Route>
              <Route path="japanese-favorites" element={<JapaneseFavourites />} />
              <Route
                path="restaurants/:id"
                element={<RestaurantDetail></RestaurantDetail>}
              ></Route>
              <Route path="food/:id" element={<FoodDetail></FoodDetail>}></Route>
              <Route
                path="search"
                element={<SearchPage/>}
              ></Route>
          </Route>
            
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Dialog></Dialog>
      </searchContext.Provider>
    </>
  );
}

export default App;
