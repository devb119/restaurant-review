import React, { useState } from "react";
import RestaurantSearchCard from "../components/RestaurantSearchCard/RestaurantSearchCard";
import PaginationSearch from "../components/PaginationSearch";
import Restaurant from "../models/restaurants"
import { getRestaurantsByName, getRestaurantsByFoodName, getRestaurantByDocId } from "../services/RestaurantApi";
import Footer from "../components/Footer";

const SearchPage = ({query, searchOption} : {query : string, searchOption: number}) => {
    const [searchData, setSearchData] = useState<Restaurant[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const restaurantsPerPage = 5;

    React.useEffect(() => {
        async function getSearchData(name : string) {
            const data : any =  await getRestaurantsByName('');
            const suitableData = data.filter((e : Restaurant) => e.name.toLowerCase().includes(name.trim().toLowerCase()));
            setSearchData([...suitableData]);
           
        }
        async function getSearchDataByFood(name : string) {
            const data : any = await getRestaurantsByFoodName(name);
            const restaurantData : any =  await getRestaurantsByName('');
            const suitableData = restaurantData.filter((e : Restaurant) => data.includes(e.id?.trim()));
            console.log(data);
            console.log(restaurantData);
            console.log(suitableData);
            setSearchData([...suitableData]);
        }
        if(searchOption === 1) {
            getSearchData(query);
        }
        else {
            getSearchDataByFood(query);
        }
        
        setCurrentPage(1);
    }, [query, searchOption]);

    const indexOfLastRestaurant = currentPage * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const currentRestaurants = searchData.length > restaurantsPerPage ? searchData.slice(indexOfFirstRestaurant, indexOfLastRestaurant)
    : searchData;

    const paginate = (pageNumber : number) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    }

    return (
        <React.Fragment>
            {(searchData.length > 0) ?
                <div>
                    {query.trim() === "" ? <h1 className="mb-8 text-2xl font-semibold flex">全部で {searchData.length}レストランがある </h1> : 
                        <h1 className="mb-8 text-2xl font-semibold flex">{searchData.length} 結果が見つけた： "{query}"</h1>
                    } 
                    
                     
                    {currentRestaurants.map((e) => {
                        // console.log(e);
                        return (
                            <RestaurantSearchCard restaurant={e} />
                        ) 
                    })}
                    <PaginationSearch 
                        restaurantsPerPage ={restaurantsPerPage}
                        totalRestaurants ={searchData.length}
                        currentPage={currentPage}
                        paginate={paginate}
                    />
                </div>
                : <div className="mx-auto max-w-[75rem] h-[25rem]">
                    {searchOption === 2 ? <h1 className="mb-8 text-2xl font-semibold flex">このフード名が見つけない："{query}"</h1>
                    : <h1 className="mb-8 text-2xl font-semibold flex">適切なレストランが見つけない："{query}"</h1>}
                </div>
            }
            <Footer />
            
        </React.Fragment>
    )
}

export default SearchPage;