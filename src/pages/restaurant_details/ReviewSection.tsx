import React, { useState } from "react";
import CommentCard from "../../components/CommentCard";
import SubCommentCard from "../../components/SubCommentCard";
import ReviewForm from "./ReviewForm";

const ReviewSection = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <React.Fragment>
      <div className="mt-8 relative">
        <h1 className="text-center font-bold text-xl mb-8">レビューリスト</h1>
        <button
          className="absolute right-0 top-0 bg-main text-white flex items-center gap-2 py-1 px-4 rounded-full hover:bg-mainShade transition-all"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          + 新しいレビュー
        </button>
        <CommentCard />
        <div className="ml-40">
          <SubCommentCard />
        </div>
      </div>
      {modalOpen && <ReviewForm setOpenModal={setModalOpen} username="" />}
    </React.Fragment>
  );
};

export default ReviewSection;
