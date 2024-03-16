// IMPORT PACKAGES
import React, { useState } from "react";
// IMPORT ICONS
import StarIcon from "../icons/star";

const StarRating = (props) => {
  const { rating, setRating } = props;

  const [tempRating, setTempRating] = useState(null);

  // Rate when on click star
  const rate = (temp) => {
    setRating(temp);
    setTempRating(temp);
  };

  // When hover on star
  const starOver = (temp) => {
    setTempRating(rating);
    setRating(temp);
  };

  // When hover out of star
  const starOut = () => {
    setRating(tempRating);
  };

  let stars = [];

  for (let i = 1; i <= 5; i++) {
    let fillStar = "none";
    if (rating && rating >= i) {
      fillStar = "#FFA800";
    }

    stars.push(
      <span
        key={`star-rating-${i}`}
        className="star zoom"
        onClick={() => {
          rate(i);
        }}
        onMouseOver={() => starOver(i)}
        onMouseOut={() => starOut()}
      >
        <StarIcon fill={fillStar} />
      </span>
    );
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
