import React from "react";
import RestaurantSearch from "../components/RestaurantSearch/RestaurantSearch";
import PaginationSearch from "../components/PaginationSearch";

const SearchPage = () => {
    return (
        <React.Fragment>
            <RestaurantSearch />
            <PaginationSearch />
        </React.Fragment>
    )
}

export default SearchPage;