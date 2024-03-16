import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import FormTextArea from "../../components/forms/textArea.jsx";
import DeleteIcon from "../../components/icons/delete.jsx";
import EditIcon from "../../components/icons/edit.jsx";
import { convertDateToDisplayFormat } from "../../helpers/dateHelper.js";
import { addReviews, deleteReview } from "../../redux/actions/landingPage.jsx";

const ResponseDisplayComponent = ({ feedbackDetails, privilege }) => {
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
  return (
    <>
      {edit ? (
        <div className="comment-wrapper mb-one-s">
          <FormTextArea
            id="comment"
            type="text"
            isRequired={false}
            labelText="Reply Comment"
            name="comment"
            value={reviewObj?.comment || ""}
            onChange={(e) => {
              setReviewObj({ ...reviewObj, comment: e.target.value });
            }}
          />
          <div
            className={`btn btn-xsmall right btn-primary ${
              reviewObj?.comment?.length > 0 ? "" : "disabled"
            }`}
            onClick={() => {
              dispatch(addReviews(reviewObj));
              setEdit(false);
            }}
          >
            Update Reply
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
                (user.roleid === 1 &&
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
              <div className="feedback-comment">
                {feedbackDetails?.comment || ""}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResponseDisplayComponent;
