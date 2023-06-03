import React from "react";

const PaginationSearch = () => {
    return (
        <React.Fragment>
            <div className="mx-auto max-w-[75rem]">
                <nav aria-label="Page navigation example" className="mb-12 flex justify-end">
                    <ul className="list-style-none flex bg-[#C939191F] max-w-xs p-3 rounded-full w-1/5 mr-20 justify-center gap-0.5">
                        <li>
                        <a
                            className="relative block rounded-full bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 focus:bg-[#C9391969] focus:text-white hover:bg-[#C9391969] hover:text-white"
                            href="#!"
                            >1</a>
                        </li>
                        <li aria-current="page">
                        <a
                            className="relative block rounded-full bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 focus:bg-[#C9391969] focus:text-white hover:bg-[#C9391969] hover:text-white"
                            href="#!">2
                            <span
                            className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
                            >(current)</span>
                        </a>
                        </li>
                        <li>
                        <a
                            className="relative block rounded-full bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 focus:bg-[#C9391969] focus:text-white hover:bg-[#C9391969] hover:text-white"
                            href="#!"
                            >3</a>
                        </li>
                        <li>
                        <a
                            className="relative block rounded-full bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 focus:bg-[#C9391969] focus:text-white hover:bg-[#C9391969] hover:text-white"
                            href="#!"
                            >4</a>
                        </li>
                        <li>
                        <a
                            className="relative block rounded-full bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 focus:bg-[#C9391969] focus:text-white hover:bg-[#C9391969] hover:text-white"
                            href="#!"
                            >5</a>
                        </li>
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