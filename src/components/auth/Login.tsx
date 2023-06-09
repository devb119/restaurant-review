import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";

const Login = (): JSX.Element => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-1/2 flex justify-center items-center flex-col h-full gap-10 border-white border-dashed border-2 p-8 rounded-md">
      <p className="text-3xl font-bold">ログイン</p>
      <form className="flex flex-col items-center gap-8 w-full">
        <div className="flex justify-center items-center w-2/3 relative">
          <label
            htmlFor="email"
            className="bg-white text-2xl rounded-full absolute left-4 z-10 text-main"
          >
            <AiOutlineUser />
          </label>
          <input
            type="text"
            id="email"
            className="focus:outline-none rounded-full w-full py-2 px-12 shadow-lg focus:shadow-xl"
            placeholder="ユーザー名"
          />
        </div>
        <div className="flex justify-center items-center w-2/3 relative">
          <label
            htmlFor="password"
            className="bg-white text-2xl rounded-full absolute left-4 z-10 text-main"
          >
            <AiOutlineLock />
          </label>
          <input
            type={visible ? "text" : "password"}
            id="password"
            className="focus:outline-none rounded-full w-full py-2 px-12 shadow-lg focus:shadow-xl"
            placeholder="パスワード"
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
          <Link to="/auth/sign-up" className="font-bold text-main">
            登録
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
