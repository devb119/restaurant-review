import React from "react";
import RestaurantSearchCard from "../components/RestaurantSearchCard/RestaurantSearchCard";
import PaginationSearch from "../components/PaginationSearch";

const SearchPage = () => {
    return (
        <React.Fragment>
            <RestaurantSearchCard />
            <RestaurantSearchCard />
            <PaginationSearch />
        </React.Fragment>
    )
}

export default SearchPage;