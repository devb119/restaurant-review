import React, { useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { NavLink, useNavigate, Link, useLocation } from "react-router-dom";
import { ButtonPrimary, ButtonSecondary } from "./common";
import { searchOption } from "../models/enum/searchOption";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import AccountMenu from "./AccountMenu";

interface NavOption {
  // id là id của phần nội dung sẽ nhảy tới (HTML id)
  id: string;
  title: string;
}

const navOptions: NavOption[] = [
  { id: "japanese-favorites", title: "日本人好み" },
  { id: "restaurants", title: "レストラン" },
  { id: "search", title: "レストラン情報検索" },
];

type getQueryDataFunction = (query: string, option: number) => void;

export const Logo = (): JSX.Element => (
  <Link
    to="/"
    className="flex items-center px-6 py-4 gap-2 bg-white cursor-pointer w-52 h-20"
  >
    <img src="/logo.svg" className="w-12" alt="amumu" />
    <p className="text-3xl font-bold text-mainShade quicksand">amumu</p>
  </Link>
);

function Header({
  getQueryData,
}: {
  getQueryData: getQueryDataFunction;
}): JSX.Element {
  const [activeLink, setActiveLink] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const location = useLocation();
  const isManagePage = location.pathname.includes("manage");
  const handleSubmitSearch = (e: React.FormEvent, option: number): void => {
    e.preventDefault();
    getQueryData(query, option);
    navigate("/search");
    // console.log(query);
    setActiveLink("search");
    setQuery("");
  };

  return (
    <>
      <div className="flex fixed w-full h-20 bg-mainTint z-10 justify-between items-center pr-4 text-lg shadow-sm">
        <div onClick={() => setActiveLink("japanese-favorites")}><Logo /></div>
        {!isManagePage && (
          <>
            <ul className="flex gap-6 items-center">
              {navOptions.map((nav) =>
                nav.id !== "restaurants" ? (
                  <li
                    onClick={() => setActiveLink(nav.id)}
                    className={
                      nav.id === activeLink
                        ? "border-b-4 border-main font-semibold transition-all"
                        : "border-b-4 border-transparent hover:border-main hover:font-semibold transition-all"
                    }
                    key={nav.id}
                  >
                    <NavLink to={`${nav.id}`}>{nav.title}</NavLink>
                  </li>
                ) : (
                  <li
                    onClick={() => setActiveLink(nav.id)}
                    className={
                      nav.id === activeLink
                        ? "border-b-4 border-main font-semibold transition-all"
                        : "border-b-4 border-transparent hover:border-main hover:font-semibold transition-all"
                    }
                    key={nav.id}
                  >
                    <a href={`#${nav.id}`}>{nav.title}</a>
                  </li>
                )
              )}
            </ul>
            <form
              className="relative w-1/4"
              onSubmit={(e) =>
                handleSubmitSearch(e, searchOption.RestaurantSearch)
              }
            >
              <div className="relative rounded-3xl">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={
                    query === ""
                      ? "rounded-3xl py-3 pl-4 pr-32 w-full shadow-lg focus:outline-none"
                      : "rounded-t-3xl py-3 pl-4 pr-32 w-full shadow-lg focus:outline-none"
                  }
                  placeholder="料理、レストランの名前を入力"
                />

                <div
                  id="dropdown"
                  className="absolute z-10 bg-white  divide-y divide-gray-100 rounded-b-3xl shadow w-full dark:bg-gray-700"
                >
                  <ul
                    className={
                      query === ""
                        ? "hidden"
                        : "py-2 text-sm text-gray-700 dark:text-gray-200"
                    }
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <a
                        onClick={(e) =>
                          handleSubmitSearch(e, searchOption.RestaurantSearch)
                        }
                        href="#"
                        className="text-[#BC1F1F] block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-slate-950"
                      >
                        <strong>レストラン</strong>によって検索 (default)："
                        {query}"
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={(e) =>
                          handleSubmitSearch(e, searchOption.FoodSearch)
                        }
                        href="#"
                        className="text-[#BC1F1F] block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-slate-950"
                      >
                        <strong>料理</strong>によって検索："{query}"
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-main text-white 
        flex items-center gap-2 py-1 px-4 rounded-full hover:bg-mainShade transition-all"
                type="submit"
                onSubmit={(e) =>
                  handleSubmitSearch(e, searchOption.RestaurantSearch)
                }
              >
                <div className="text-xl">
                  <BsCheckLg />
                </div>
                <p>検索</p>
              </button>
            </form>
          </>
        )}

        <div className="flex items-center gap-2">
          {user ? (
            <AccountMenu />
          ) : (
            <>
              <Link to="/auth/sign-up">
                <ButtonPrimary title="登録する" />
              </Link>
              <Link to="/auth/login">
                <ButtonSecondary title="ログイン" />
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="h-20 mb-16"></div>
    </>
  );
}

export default Header;
