import { AiOutlineArrowRight } from "react-icons/ai";

function Favorite(): JSX.Element {
  return (
    <div>
      <section>
        <h1 className="text-2xl font-semibold mb-4">日本人好み料理</h1>
        <div>
          <div className="w-3/5 flex gap-4">
            <div className="relative w-80 overflow-hidden">
              <img src="/img/buncha.jpg" className="w-full rounded" />
              <button
                className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1 bg-white rounded w-4/5
               font-bold text-lg flex items-center justify-between hover:bg-mainTint transition-all"
              >
                <p>Bun Cha</p>
                <span className="text-xl text-mainShade">
                  <AiOutlineArrowRight />
                </span>
              </button>
            </div>
            <div className="relative w-80 overflow-hidden">
              <img src="/img/buncha.jpg" className="w-full rounded" />
              <button
                className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1 bg-white rounded w-4/5
               font-bold text-lg flex items-center justify-between hover:bg-mainTint transition-all"
              >
                <p>Bun Cha</p>
                <span className="text-xl text-mainShade">
                  <AiOutlineArrowRight />
                </span>
              </button>
            </div>
            <div className="relative w-80 overflow-hidden">
              <img src="/img/buncha.jpg" className="w-full rounded" />
              <button
                className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1 bg-white rounded w-4/5
               font-bold text-lg flex items-center justify-between hover:bg-mainTint transition-all"
              >
                <p>Bun Cha</p>
                <span className="text-xl text-mainShade">
                  <AiOutlineArrowRight />
                </span>
              </button>
            </div>
          </div>
          <div className="w-2/5 relative"></div>
        </div>
      </section>
    </div>
  );
}

export default Favorite;
