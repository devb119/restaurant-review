import React, { createContext, useEffect, useState } from "react";
import CommentCard from "../../components/CommentCard";
import SubCommentCard from "../../components/SubCommentCard";
import MyComment from "../../components/MyComment";
import { getFoodReviewsById } from "../../services/FoodReviewApi";
import FoodReview from "../../models/food_reviews";
import { Loading } from "../../components/common";

interface Props {
  id: string | undefined;
}

export interface iFoodReviewContext {
  reviewList: FoodReview[];
  setReviewList: (reviewList: FoodReview[]) => void;
}

export const FoodReviewContext = createContext<iFoodReviewContext>({
  reviewList: [],
  setReviewList: () => {},
});

const FoodReviewSection = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [reviewList, setReviewList] = useState<FoodReview[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log(props.id);
    if (!props.id) return;
    const data = await getFoodReviewsById(props.id);
    setReviewList(data as FoodReview[]);
    setLoading(false);
  };
  return (
    <React.Fragment>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="mt-8 relative">
          {
            reviewList.map((review) => (
              <CommentCard type="food" foodReview={review} review={null} />
            ))
            /* <div className="ml-40 mb-28">
            <SubCommentCard type="food" />
            <SubCommentCard type="food" />
            <MyComment type="sub" />
          </div> */
          }
        </div>
      )}
      <FoodReviewContext.Provider value={{ reviewList, setReviewList }}>
        <MyComment type="main" id={props.id || ""} />
      </FoodReviewContext.Provider>
    </React.Fragment>
  );
};

export default FoodReviewSection;
