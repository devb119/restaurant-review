import React, { useState } from "react";
import CommentCard from "../../components/CommentCard";
import SubCommentCard from "../../components/SubCommentCard";
import MyComment from "../../components/MyComment";

const FoodReviewSection = () => {
  return (
    <React.Fragment>
      <div className="mt-8 relative">
        <CommentCard type="food" />
        <div className="ml-40 mb-28">
          <SubCommentCard type="food" />
          <SubCommentCard type="food" />
          <MyComment type="sub" />
        </div>
      </div>
      <MyComment type="main" />
    </React.Fragment>
  );
};

export default FoodReviewSection;
