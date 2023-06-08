import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../components/Header";
import { ButtonPrimary, ButtonSecondary } from "../components/common";
import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";

const Login = (): JSX.Element => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center pr-4 mb-16 text-lg">
        <Logo />
        <div className="flex items-center gap-2">
          <Link to="/sign-up">
            <ButtonPrimary title="サインアップ" />
          </Link>
          <Link to="/login">
            <ButtonSecondary title="ログイン" />
          </Link>
        </div>
      </div>
      <div className=" max-w-7xl mx-auto font-montserrat flex justify-between">
        <img src="/img/lemon.png" className="w-1/2" />
        <div className="w-1/2 flex justify-center items-center flex-col h-full gap-10 border-white border-dashed border p-8 rounded-md">
          <p className="text-xl font-bold">ログイン</p>
          <form className="flex flex-col items-center gap-8 w-full">
            <div className="flex justify-center items-center w-2/3 relative">
              <span className="bg-white text-2xl rounded-full absolute left-4 z-10">
                <AiOutlineUser />
              </span>
              <input
                type="text"
                className="focus:outline-none rounded-full w-full py-2 px-12 shadow-lg focus:shadow-xl"
              />
            </div>
            <div className="flex justify-center items-center w-2/3 relative">
              <span className="bg-white text-2xl rounded-full absolute left-4 z-10">
                <AiOutlineLock />
              </span>
              <input
                type={visible ? "text" : "password"}
                className="focus:outline-none rounded-full w-full py-2 px-12 shadow-lg focus:shadow-xl"
              />
              <span
                className="bg-white text-2xl rounded-full absolute z-10 right-4 cursor-pointer"
                onClick={() => setVisible(!visible)}
              >
                {visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            <p className="-mt-6 w-2/3 text-right cursor-pointer hover:font-semibold transition-all">
              パスワードを忘れた?
            </p>
            <button
              type="submit"
              className="bg-main text-white py-2 px-10 rounded hover:bg-mainShade transition-all"
            >
              ログイン
            </button>
            <p>
              新しいアカウントを登録する?{" "}
              <Link to="/sign-up" className="font-bold text-main">
                登録
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
