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
  setReviewList: () => null,
});

const ReviewSection = (props: Props) => {
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = React.useCallback(async () => {
    if (!props.id) return;
    const data = await getReviewsByRestaurantId(props.id);
    setLoading(false);
    console.log(data);
    console.log(
      data.sort(function (a, b) {
        if (b.created_at && a.created_at) {
          console.log(b.created_at, a.created_at);
          return b.created_at.getTime() - a.created_at.getTime();
        } else return 0;
      })
    );
    setReviewList(data as Review[]);
  }, [props.id]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <React.Fragment>
      <div className="mt-8 relative">
        <h1 className="text-center font-bold text-3xl mb-12">レビューリスト</h1>
        {user && (
          <button
            className="absolute right-0 top-0 bg-main text-white flex items-center gap-2 py-1 px-4 rounded-full hover:bg-mainShade transition-all"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <div className="p-1">+ 新しいレビュー</div>
          </button>
        )}
        {loading ? (
          <Loading></Loading>
        ) : (
          reviewList.map((review) => (
            <CommentCard
              key={review.id}
              type="restaurant"
              review={review}
              foodReview={null}
            />
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
