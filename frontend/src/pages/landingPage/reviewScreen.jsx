import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "../../components/icons/delete.jsx";
import EditIcon from "../../components/icons/edit.jsx";
import StarRatingDisplay from "../../components/starRating/display.jsX";
import { convertDateToDisplayFormat } from "../../helpers/dateHelper.js";
import { addReviews, deleteReview } from "../../redux/actions/landingPage.jsx";
import StarRating from "../../components/starRating/index.jsx";
import FormTextArea from "../../components/forms/textArea.jsx";
import ResponseDisplayComponent from "./responseScreen.jsx";

const RatingDisplayComponent = ({ feedbackDetails, privilege }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({
    user: state?.auth?.user,
  }));
  const initial = {
    list: feedbackDetails.list,
    id: feedbackDetails.id,
    comment: feedbackDetails.comment,
    rating: feedbackDetails.rating,
  };
  const [edit, setEdit] = useState(false);
  const [reviewObj, setReviewObj] = useState(initial);
  const [replyObj, setReplyObj] = useState({
    comment: "",
    list: feedbackDetails.list,
    reply: feedbackDetails.id,
  });
  return (
    <>
      {edit ? (
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
              setEdit(false);
            }}
          >
            Update
          </div>
          <div
            className={`btn btn-xsmall right btn-secondary mr-one-s`}
            onClick={() => {
              setReviewObj(initial);
              setEdit(false);
            }}
          >
            Cancel
          </div>
        </div>
      ) : (
        <div className="comment-wrapper mt-one-s">
          <div className="comment-list">
            <div className="comment-head">
              <div className="avatar avatar-rounded avatar-s">
                <span>{feedbackDetails?.createdBy?.name?.[0] || "U"}</span>
              </div>
              <div className="comment-author">
                {feedbackDetails?.createdBy?.name || "Username"}
              </div>
              <div className="comment-date ml-three-s">
                {convertDateToDisplayFormat(feedbackDetails?.createdAt)}
              </div>
              {(user.roleid === 3 ||
                (user.roleid === 2 &&
                  user.userId === feedbackDetails?.createdBy?.id)) && (
                <div className="right ml-three-s d-flex">
                  {privilege?.update && (
                    <div
                      className="icon-wrap icon-s"
                      onClick={(e) => {
                        e.stopPropagation();
                        setReviewObj(initial);
                        setEdit(true);
                      }}
                    >
                      <EditIcon fill={"grey"} />
                    </div>
                  )}
                  {privilege?.delete && (
                    <div
                      className="icon-wrap icon-s"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(
                          deleteReview(
                            feedbackDetails?.id,
                            feedbackDetails?.list
                          )
                        );
                      }}
                    >
                      <DeleteIcon fill={"red"} />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="feedback-wrapper">
              <div className="star-rating">
                <StarRatingDisplay rating={feedbackDetails?.rating || null} />
              </div>
              <div className="feedback-comment">
                {feedbackDetails?.comment || ""}
              </div>
              {feedbackDetails?.reply?.length > 0 && (
                <div className="mt-one-s">
                  {feedbackDetails?.reply?.map((reply) => (
                    <ResponseDisplayComponent
                      feedbackDetails={reply}
                      privilege={privilege}
                    />
                  ))}
                </div>
              )}
              {(user.roleid === 3 || user.roleid === 1) && (
                <div className="mt-two-s">
                  <FormTextArea
                    id="comment"
                    type="text"
                    isRequired={false}
                    labelText="Reply Comment"
                    name="comment"
                    value={replyObj?.comment || ""}
                    onChange={(e) => {
                      setReplyObj({ ...replyObj, comment: e.target.value });
                    }}
                  />
                  <div
                    className={`btn btn-xsmall right btn-primary`}
                    onClick={() => {
                      dispatch(addReviews(replyObj));
                      setReplyObj({
                        comment: "",
                        list: feedbackDetails.list,
                        reply: feedbackDetails.id,
                      });
                    }}
                  >
                    Reply
                  </div>
                  <div
                    className={`btn btn-xsmall right btn-secondary mr-one-s`}
                    onClick={() => {
                      setReplyObj({
                        comment: "",
                        list: feedbackDetails.list,
                        reply: feedbackDetails.id,
                      });
                    }}
                  >
                    Cancel
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RatingDisplayComponent;
