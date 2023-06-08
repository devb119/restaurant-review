import React, { useState } from "react";
import "./App.css";
import JapaneseFavourites from "./pages/restaurant_lists/JapaneseFavourites";
import SearchPage from "./pages/SearchPage";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { getFavouriteFoodList } from "./services/FoodApi";

function App() {
  //test db
  React.useEffect(() => {
    async function getFavouriteFood() {
      console.log(await getFavouriteFoodList());
    }
    getFavouriteFood();
  }, []);
  const [query, setQuery] = useState("");
  const getQueryDataHandler = (query: string) => {
    setQuery(query);
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Home getQuery={getQueryDataHandler} />}>
          <Route path="" element={<JapaneseFavourites />}></Route>
          <Route
            path="japanese-favorites"
            element={
                <JapaneseFavourites />
            }
          ></Route>
          <Route path="search" element={<SearchPage query={query} />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
