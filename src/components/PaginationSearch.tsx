import React from "react";

type paginateFunction = (pageNumber : number) => void;

const PaginationSearch = ({ restaurantsPerPage, totalRestaurants, paginate, currentPage } : {restaurantsPerPage : number, totalRestaurants : number, paginate : paginateFunction, currentPage : number}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRestaurants / restaurantsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <React.Fragment>
            <div className="mx-auto max-w-[75rem]">
                <nav aria-label="Page navigation example" className="mb-12 flex justify-end">
                    <ul className="list-style-none flex bg-[#C939191F]  p-3 rounded-full mr-20 justify-center gap-0.5 min-w-[15%]">
                        {pageNumbers.map(number => (
                            <li key={number} className='page-item'>
                                {/* <a onClick={() => paginate(number)} href='!#' className='page-link'>
                                {number}
                                </a> */}
                                
                                    <a
                                        className={number === currentPage ? " relative block rounded-full bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 bg-[#C9391969] text-white hover:bg-[#C9391969]" 
                                        : " relative block rounded-full bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 focus:bg-[#C9391969] hover:bg-[#C9391969] hover:text-white"}
                                        href="#!"
                                        onClick={() => paginate(number)}
                                    ><div className="w-2 flex items-center justify-center">{number}</div></a>
                                
                            </li>
                        ))}
                       
                        <li className="flex items-center justify-center">
                            <a
                                className="relative block rounded-full bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 hover:bg-[#C9391969] hover:text-white"
                                href="#" 
                                
                                onClick={() => paginate(currentPage + 1 < pageNumbers.length ? currentPage + 1 : pageNumbers.length)}
                            >
                                <svg width="8" height="11" fill="#B68787" viewBox="0 0 8 11"  xmlns="http://www.w3.org/2000/svg" >
                                    <path d="M8 5.5L0.5 10.2631L0.5 0.73686L8 5.5Z" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </React.Fragment>
    )
}

export default PaginationSearch;