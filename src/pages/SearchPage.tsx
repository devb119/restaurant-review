import React, { useState } from "react";
import RestaurantSearchCard from "../components/RestaurantSearchCard/RestaurantSearchCard";
import PaginationSearch from "../components/PaginationSearch";
import Restaurant from "../models/restaurants"
import { getRestaurantsByName } from "../services/RestaurantApi";

const SearchPage = ({query} : {query : string}) => {
    const [searchData, setSearchData] = useState<Restaurant[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const restaurantsPerPage = 2;

    React.useEffect(() => {
        async function getSearchData(name : string) {
            let data : any =  await getRestaurantsByName(name);
            setSearchData([...data]);
            console.log(data);
        }
        getSearchData(query);
        setCurrentPage(1);
    }, [query]);

    const indexOfLastRestaurant = currentPage * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const currentRestaurants = searchData.length > restaurantsPerPage ? searchData.slice(indexOfFirstRestaurant, indexOfLastRestaurant)
    : searchData;

    const paginate = (pageNumber : any) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    }

    return (
        <React.Fragment>
            {currentRestaurants.map((e) => {
                return (
                    <RestaurantSearchCard address={e.address} name={e.name}/>
                ) 
            })}
            <PaginationSearch 
                restaurantsPerPage ={restaurantsPerPage}
                totalRestaurants ={searchData.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </React.Fragment>
    )
}

export default SearchPage;