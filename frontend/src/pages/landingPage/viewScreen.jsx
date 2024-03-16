import { useState } from "react";
import FormTextArea from "../../components/forms/textArea";
import CloseIconSmall from "../../components/icons/close-s";
import TickIcon from "../../components/icons/tickIcon";
import StarRating from "../../components/starRating";
import RatingDisplayComponent from "./reviewScreen";
import { useDispatch, useSelector } from "react-redux";
import { addReviews } from "../../redux/actions/landingPage";

const ViewScreen = ({ list, setView }) => {
  const dispatch = useDispatch();
  const { reviews, user } = useSelector((state) => ({
    reviews: state?.landingPage?.reviews || [],
    user: state?.auth?.user,
  }));

  const { review: reviewAccess } = user?.roleAccess?.privileges || {};
  const [reviewObj, setReviewObj] = useState({
    rating: 0,
    comment: "",
    list: list.id,
  });
  return (
    <>
      <div className="ticket-detail-wrapper">
        <div className="row flex-center-space-between mb-two-s">
          <div className="col-lg-6 col-md-6">
            <img
              src={
                list?.imageUrl ||
                "https://m.timesofindia.com/photo/104701845/104701845.jpg"
              }
              alt=""
              height="300"
              width="300"
            />
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="row mb-two-s">
              <span className="issue-head">Restaurant</span>
              <span className="issue-body">{list.name}</span>
            </div>
            <div className="row mb-two-s">
              <span className="issue-head">Description</span>
              <span className="issue-body">{list.description}</span>
            </div>
            <div className="row mb-two-s">
              <span className="issue-head">Veg/Non-Veg</span>
              <span className="issue-body">
                {list.nonVeg ? "🔴 Non-Veg" : "🟢 Veg"}
              </span>
            </div>
            <div className="row mb-two-s">
              <span className="issue-head">Owner</span>
              <span className="issue-body">{list.owner}</span>
            </div>
            <div className="row mb-two-s">
              <span className="issue-head">Contact Details</span>
              <span className="issue-body">
                {" "}
                {(list?.address || "") + " " + (list?.phone || "")}
              </span>
            </div>
            <div className="row mb-two-s">
              <div className="mb-two-s ml-two-s">
                <span className="issue-head">Cost Per Person</span>
                <span className="issue-body">₹{list?.costPerPerson}</span>
              </div>
            </div>
            <div className="row mb-two-s">
              <span className="issue-head">Availability</span>
              <span className="issue-body">
                <div className="icon-wrap icon-s">
                  {list?.availability ? (
                    <TickIcon fill={"green"} />
                  ) : (
                    <CloseIconSmall fill={"red"} />
                  )}
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="ticket-detail-wrapper mt-two-s">
        <div className="row flex-center-space-between align-tems-center mb-two-s">
          <div className="col-lg-12 col-md-12 mb-two-s">
            <h4>Reviews :</h4>
          </div>
          {reviewAccess?.create && (
            <div className="col-lg-12 col-md-12">
              <div className="comment-wrapper mb-one-s">
                <span className="font-s grey2">
                  How would you rate your experience with this Restaurant?
                </span>
                <StarRating
                  rating={reviewObj?.rating || 0}
                  setRating={(rating) => {
                    setReviewObj({ ...reviewObj, rating });
                  }}
                />
                <FormTextArea
                  id="comment"
                  type="text"
                  isRequired={false}
                  labelText="Comment"
                  name="comment"
                  value={reviewObj?.comment || ""}
                  onChange={(e) => {
                    setReviewObj({ ...reviewObj, comment: e.target.value });
                  }}
                />
                <div
                  className={`btn btn-xsmall right btn-primary ${
                    reviewObj?.rating > 0 ? "" : "disabled"
                  }`}
                  onClick={() => {
                    dispatch(addReviews(reviewObj));
                    setReviewObj({ ...reviewObj, comment: "", rating: 0 });
                  }}
                >
                  Add
                </div>
                <div
                  className={`btn btn-xsmall right btn-secondary mr-one-s`}
                  onClick={() => {
                    setReviewObj({ ...reviewObj, comment: "", rating: 0 });
                  }}
                >
                  Cancel
                </div>
              </div>
            </div>
          )}
          <div className="col-lg-12 col-md-12">
            {reviews?.map((review) => (
              <RatingDisplayComponent
                feedbackDetails={review}
                privilege={reviewAccess}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="sidedraw-footer d-flex align-items-center flex-center-end">
        <div
          className="btn btn-xsmall btn-primary-border right mr-two-s"
          onClick={() => {
            setView(false);
          }}
        >
          Close
        </div>
      </div>
    </>
  );
};

export default ViewScreen;
