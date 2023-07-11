import React from "react";
import { BiX } from "react-icons/bi";
export interface ISearchBarProps {
  searchText: string;
  setSearchText: any;
}

function SearchBar(props: ISearchBarProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { searchText, setSearchText } = props;
  return (
    <div className="flex w-full items-center">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          // value={searchText}
          type="text"
          ref={inputRef}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              if (inputRef.current) setSearchText(inputRef.current.value);
              // console.log(event);
            }
          }}
          className="text-gray-900 text-sm rounded-2xl block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {searchText && searchText !==""&&
          inputRef.current && (
            <p
              onClick={() => {
                setSearchText("");
                inputRef.current!.value = "";
              }}
              className="absolute z-10 inset-y-0 right-2 flex items-center pl-3 pointer-events-non text-2xl text-gray cursor-pointer"
            >
              <BiX></BiX>
            </p>
          )}
      </div>
    </div>
  );
}

export default SearchBar;
