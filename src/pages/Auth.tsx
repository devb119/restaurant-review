import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { Logo } from "../components/Header";
import { ButtonPrimary, ButtonSecondary } from "../components/common";
import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";

const Auth = (): JSX.Element => {
  return (
    <>
      <div className="flex justify-between items-center pr-4 mb-16 text-lg">
        <Logo />
        <div className="flex items-center gap-2">
          <Link to="/auth/sign-up">
            <ButtonPrimary title="登録する" />
          </Link>
          <Link to="/auth/login">
            <ButtonSecondary title="ログイン" />
          </Link>
        </div>
      </div>
      <div className=" max-w-7xl mx-auto flex justify-between items-center">
        <div className="w-1/2">
          <img src="/img/lemon.png" className="w-full" />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Auth;
