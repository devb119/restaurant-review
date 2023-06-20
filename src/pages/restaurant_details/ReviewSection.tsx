import React, { useEffect, useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import CommentCard from "../../components/CommentCard";
import ReviewForm from "./ReviewForm";
import { getReviewsByRestaurantId } from "../../services/ReviewApi";
import Review from "../../models/reviews";
import { Loading } from "../../components/common";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface Props {
  id: string;
}

export interface OutletContextProps {
  reviewList: Review[];
  setReviewList: (reviewList: Review[]) => void;
}

export interface iReviewContext {
  reviewList: Review[];
  setReviewList: (reviewList: Review[]) => void;
}

export const reviewContext = createContext<iReviewContext>({
  reviewList: [],
  setReviewList: () => {},
});

const ReviewSection = (props: Props) => {
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!props.id) return;
    const data = await getReviewsByRestaurantId(props.id);
    setReviewList(data as Review[]);
    setLoading(false);
  };

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <React.Fragment>
      <div className="mt-8 relative">
        <h1 className="text-center font-bold text-xl mb-8">レビューリスト</h1>
        {user && (
          <button
            className="absolute right-0 top-0 bg-main text-white flex items-center gap-2 py-1 px-4 rounded-full hover:bg-mainShade transition-all"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            + 新しいレビュー
          </button>
        )}
        {loading ? (
          <Loading></Loading>
        ) : (
          reviewList.map((review) => (
            <CommentCard type="restaurant" review={review} foodReview={null} />
          ))
        )}
        {/* <div className="ml-40">
          <SubCommentCard type="restaurant" />
        </div> */}
      </div>

      {modalOpen && (
        <reviewContext.Provider value={{ reviewList, setReviewList }}>
          <ReviewForm
            setOpenModal={setModalOpen}
            restaurant_id={props.id}
            id={user?.id || ""}
          />
        </reviewContext.Provider>
      )}
      <Outlet context={{ reviewList, setReviewList }} />
    </React.Fragment>
  );
};

export default ReviewSection;
