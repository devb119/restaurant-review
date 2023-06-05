import React, { useState } from "react";
import RestaurantSearchCard from "../components/RestaurantSearchCard/RestaurantSearchCard";
import PaginationSearch from "../components/PaginationSearch";
import Restaurant from "../models/restaurants"
import { getRestaurantsByName } from "../services/RestaurantApi";

const SearchPage = () => {
    const [searchData, setSearchData] = useState<Restaurant[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const restaurantsPerPage = 2;

    React.useEffect(() => {
        async function getSearchData(name : string) {
            let data : any =  await getRestaurantsByName(name);
            setSearchData([...data]);
            console.log(data);
        }
        getSearchData('');
    }, []);

    const indexOfLastRestaurant = currentPage * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const currentRestaurants = searchData.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

    const paginate = (pageNumber : any) => setCurrentPage(pageNumber)

    return (
        <React.Fragment>
            {currentRestaurants.map((e) => {
                return (
                    <RestaurantSearchCard address={e.address}/>
                ) 
            })}
            <PaginationSearch 
                restaurantsPerPage ={restaurantsPerPage}
                totalRestaurants ={searchData.length}
                paginate={paginate}
            />
        </React.Fragment>
    )
}

export default SearchPage;