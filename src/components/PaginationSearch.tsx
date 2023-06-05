import React from "react";

const PaginationSearch = ({ restaurantsPerPage, totalRestaurants, paginate } : {restaurantsPerPage : number, totalRestaurants : number, paginate : Function}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRestaurants / restaurantsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <React.Fragment>
            <div className="mx-auto max-w-[75rem]">
                <nav aria-label="Page navigation example" className="mb-12 flex justify-end">
                    <ul className="list-style-none flex bg-[#C939191F]  p-3 rounded-full mr-20 justify-center gap-0.5">
                        {pageNumbers.map(number => (
                            <li key={number} className='page-item'>
                                {/* <a onClick={() => paginate(number)} href='!#' className='page-link'>
                                {number}
                                </a> */}
                                <li>
                                    <a
                                        className="relative block rounded-full bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 focus:bg-[#C9391969] focus:text-white hover:bg-[#C9391969] hover:text-white"
                                        href="#!"
                                        onClick={() => paginate(number)}
                                    >{number}</a>
                                </li>
                            </li>
                        ))}
                       
                        <li className="flex items-center justify-center">
                            <a
                                className="relative block rounded-full bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 focus:bg-[#C9391969] focus:text-white hover:bg-[#C9391969] hover:text-white"
                                href="#" 
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