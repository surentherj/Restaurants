// IMPORT PACKAGES
import React from "react";

// IMPORT ICONS
import StarIcon from "../icons/star";

const StarRatingDisplay = (props) => {
  const { rating } = props;

  let stars = [];

  for (let i = 1; i <= 5; i++) {
    let fillStar = "none";
    if (rating && rating >= i) {
      fillStar = "#FFA800";
    }

    stars.push(
      <span
        key={`star-rating-${i}`}
        className="star"
      >
        <StarIcon fill={fillStar} />
      </span>
    );
  }

  return (
    <div className="star-rating">
      {stars}
    </div>
  );
};

export default StarRatingDisplay;
