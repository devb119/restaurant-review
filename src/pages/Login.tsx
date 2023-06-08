import { Link } from "react-router-dom";
import { Logo } from "../components/Header";
import { ButtonPrimary, ButtonSecondary } from "../components/common";

const Login = (): JSX.Element => {
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
        <form className="w-1/2 flex justify-center items-center flex-col h-full gap-8">
          <p className="text-xl font-bold">ログイン</p>
          <div>
            <span>abc</span>
            <input className="focus:outline-none border-none" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
