import React, { useState } from "react";
import { BsCheckLg } from "react-icons/bs";

interface NavOption {
  // id là id của phần nội dung sẽ nhảy tới (HTML id)
  id: string;
  title: string;
}

const navOptions: NavOption[] = [
  { id: "favorite", title: "日本人好み" },
  { id: "restaurant", title: "レストラン" },
  { id: "search", title: "レストラン情報検索" },
];

const Logo = (): JSX.Element => (
  <div className="flex items-center px-6 py-4 gap-2 bg-white cursor-pointer">
    <img src="/logo.svg" className="w-12" alt="amumu" />
    <p className="text-3xl font-bold text-mainShade quicksand">amumu</p>
  </div>
);

function Header(): JSX.Element {
  const [activeLink, setActiveLink] = useState("");
  const [query, setQuery] = useState("");

  const handleSubmitSearch = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log(query);
  };

  return (
    <div className="flex justify-between items-center pr-4 mb-16 text-lg">
      <Logo />
      <ul className="flex gap-8 items-center">
        {navOptions.map((nav) => (
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
        ))}
      </ul>
      <form className="relative" onSubmit={handleSubmitSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-full py-3 pl-4 pr-32 w-460 border-none shadow-lg focus:outline-none"
          placeholder="料理、レストランの名前を入力"
        ></input>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-main text-white 
        flex items-center gap-2 py-1 px-4 rounded-full hover:bg-mainShade transition-all"
          type="submit"
          onSubmit={handleSubmitSearch}
        >
          <div className="text-xl">
            <BsCheckLg />
          </div>
          <p>検索</p>
        </button>
      </form>
      <div className="flex items-center gap-4">
        <button className="border-2 border-white text-white bg-main hover:bg-mainShade py-2 px-4 rounded-full ">
          サインアップ
        </button>
        <button className="border-2 border-white py-2 px-4 rounded-full hover:bg-mainShade hover:text-white transition-all">
          ログイン
        </button>
      </div>
    </div>
  );
}

export default Header;
