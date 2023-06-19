import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { BiDotsHorizontalRounded } from "react-icons/bi";
interface Props {
  type: string;
}

const SubCommentCard = (props: Props) => {
  const [like, setLike] = useState(false);
  return (
    <div className="flex flex-col mb-10">
      <div className="flex gap-8 ">
        <div className="flex flex-col gap-2 mt-8">
          <img
            className="w-24 rounded-full aspect-square"
            src="/img/buncha.jpg"
          />
          <p className="font-bold">Username</p>
        </div>
        <div
          className={`w-full min-h-[8rem] bg-${
            props.type === "restaurant" ? "white" : "cream"
          } rounded-2xl px-10 py-5 relative`}
        >
          <div className="mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            labore, at ullam molestiae libero, quos officiis odit sequi nemo aut
            harum beatae exercitationem nisi earum culpa sint nostrum quo nobis?
          </div>
          <BiDotsHorizontalRounded className="absolute right-5 top-5 text-3xl stroke-[#f03e3e] cursor-pointer" />
        </div>
      </div>
      <div className="flex px-60 justify-around min-w-225 mt-5">
        {like === true ? (
          <FaHeart
            className="text-3xl fill-[#f03e3e] cursor-pointer inline"
            onClick={() => setLike(!like)}
          />
        ) : (
          <FiHeart
            className="text-3xl stroke-[#f03e3e] cursor-pointer inline"
            onClick={() => setLike(!like)}
          />
        )}
        <p className="font-bold text-mainShade text-sm">12/08/2022</p>
      </div>
    </div>
  );
};

export default SubCommentCard;
