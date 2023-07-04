import { useContext, useState } from "react";
import { paginationContext } from "./Admin";

type paginateFunction = (pageNumber : number) => void;

const AdminPageOption = ({ restaurantsPerPage, totalRestaurants, paginate } : {restaurantsPerPage : number, totalRestaurants : number, paginate : paginateFunction}) => {
    const pageNumbers = [];
    const [dropdownActive, setDropdownActive] =  useState(false);

    const data = useContext(paginationContext)

    for (let i = 1; i <= Math.ceil(totalRestaurants / restaurantsPerPage); i++) {
        pageNumbers.push(i);
    }

    // const getPageOptionHandler = (e : any) => {
    //     paginate(e.target.value);
    // }
        
        
        

    return (
        <>
            <div >
                                    
               
                <button onClick={() => setDropdownActive(!dropdownActive)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="shadow-lg border-0 text-slate-0 bg-white  font-medium rounded-lg text-sm px-4 py-3 text-center inline-flex items-center" type="button">ページ {data.currentPage} 
                    <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>

                {dropdownActive ? (<div id="dropdown" className="absolute z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-[6.7rem] dark:bg-gray-700 ">
                    <ul className="h-20 overflow-y-scroll py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    {pageNumbers.map(number => (
                        <li className="hover:bg-slate-200">
                            <a href="#" onClick={() => {
                                setDropdownActive(false);
                                paginate(number)}
                            } 
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-slate-600">ページ {number}</a>
                        </li>
                    ))}
                    
                    </ul>
                </div>) : ""}
            </div>
        </>
    )
}

export default AdminPageOption;
