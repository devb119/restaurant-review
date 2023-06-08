import { useMemo, useState } from "react";

const Rate = ({ count, rating, color, onRating } : {count: number, rating: number, color: {
    filled: "#FFBA00",
    unfilled: "#FFE8E0",
  }, onRating: (rate : number) => number }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const getColor = (index:number) => {
    if (hoverRating >= index) {
      return color.filled;
    } else if (!hoverRating && rating >= index) {
      return color.filled;
    }

    return color.unfilled;
  };

  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <svg width="40" height="44" viewBox="0 0 60 64" style={{ fill: getColor(idx) }} xmlns="http://www.w3.org/2000/svg" key={idx}
            className="cursor-pointer inline"
            onClick={() => onRating(idx)} 
            onMouseEnter={() => setHoverRating(idx)}
            onMouseLeave={() => setHoverRating(0)}>
            <path d="M31.3877 54.3698C30.3605 53.7883 29.1514 53.7883 28.1242 54.3698L14.9591 61.8221C12.1709 63.4004 9.03152 60.5493 9.78758 57.1254L12.8658 43.1853C13.1602 41.8524 12.8499 40.4411 12.0381 39.42L1.87657 26.6373C-0.148955 24.0893 1.28987 20.0181 4.3088 19.7551L18.4844 18.5206C19.8104 18.4051 20.9759 17.482 21.5262 16.1113L26.4342 3.88686C27.7305 0.658161 31.7813 0.658155 33.0776 3.88685L37.9856 16.1113C38.5359 17.482 39.7014 18.4051 41.0274 18.5206L55.203 19.7551C58.222 20.0181 59.6608 24.0893 57.6353 26.6373L47.4737 39.42C46.6619 40.4411 46.3517 41.8524 46.646 43.1853L49.7242 57.1254C50.4803 60.5493 47.3409 63.4004 44.5527 61.8221L31.3877 54.3698Z" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
       
      ));
  }, [count, rating, hoverRating]);

  return <div>{starRating}</div>;
};


Rate.defaultProps = {
  count: 5,
  rating: 0,
  color: {
    filled: "#FFBA00",
    unfilled: "#FFE8E0",
  },
};

export default Rate;
