import apiEndPoints from "../../constants/apiEndPoints";
import api from "../../utils/api";
import {
  UPDATE_LANDING_PAGE,
  UPDATE_LANDING_PAGE_LIST,
  UPDATE_LIST_DELETE_VALUES,
  UPDATE_LP_STATE_VALUES,
} from "../actionTypes";
import { setAlert } from "./toast";

export const getListsOnLazyScroll = (obj) => (dispatch) => {
  api
    .post(apiEndPoints.GET_LISTS(), obj)
    .then((res) => {
      dispatch({
        type: UPDATE_LANDING_PAGE,
        payload: {
          lists: res.data.lists,
          maxResult: res.data.maxResult,
          startAt: res.data.startAt,
          total: res.data.total,
          searchValue: res.data.searchValue,
        },
      });
    })
    .catch((err) => {
      dispatch(setAlert(err?.response?.data?.message, "danger", 2000));
    });
};

export const addOrUpdateList = (obj) => (dispatch) => {
  api
    .post(obj?.id ? apiEndPoints.UPDATE_LIST() : apiEndPoints.ADD_LIST(), obj)
    .then((res) => {
      dispatch({
        type: UPDATE_LANDING_PAGE_LIST,
        payload: {
          item: res.data,
        },
      });

      dispatch(
        setAlert(
          (obj?.id ? "Updated" : "Created") + " Successfully",
          "success",
          2000
        )
      );
    })
    .catch((err) => {
      dispatch(setAlert(err?.response?.data?.message, "danger", 2000));
    });
};

export const deleteList = (id) => (dispatch) => {
  api
    .delete(apiEndPoints.DELETE_LIST(id))
    .then((res) => {
      dispatch({
        type: UPDATE_LIST_DELETE_VALUES,
        payload: {
          id,
        },
      });

      dispatch(setAlert("Deleted Successfully", "success", 2000));
    })
    .catch((err) => {
      dispatch(setAlert(err?.response?.data?.message, "danger", 2000));
    });
};

export const getReviews = (id) => (dispatch) => {
  api
    .get(apiEndPoints.GET_RATINGS(id))
    .then((res) => {
      dispatch({
        type: UPDATE_LP_STATE_VALUES,
        payload: {
          key: "reviews",
          value: res.data,
        },
      });
    })
    .catch((err) => {
      dispatch(setAlert(err?.response?.data?.message, "danger", 2000));
    });
};

export const addReviews = (obj) => (dispatch) => {
  api
    .post(
      obj?.id ? apiEndPoints.UPDATE_RATING() : apiEndPoints.ADD_RATING(),
      obj
    )
    .then((res) => {
      dispatch(getReviews(obj.list));
      dispatch(
        setAlert(
          obj?.id ? "Updated Successfully" : "Added Successfully",
          "success",
          2000
        )
      );
    })
    .catch((err) => {
      dispatch(setAlert(err?.response?.data?.message, "danger", 2000));
    });
};

export const deleteReview = (id, listId) => (dispatch) => {
  api
    .delete(apiEndPoints.DELETE_RATING(id))
    .then((res) => {
      dispatch(getReviews(listId));
      dispatch(setAlert("Deleted Successfully", "success", 2000));
    })
    .catch((err) => {
      dispatch(setAlert(err?.response?.data?.message, "danger", 2000));
    });
};

export const getDahboardData = () => (dispatch) => {
  api
    .get(apiEndPoints.GET_DASHBAORD_DATA())
    .then((res) => {
      dispatch({
        type: UPDATE_LP_STATE_VALUES,
        payload: {
          key: "dashboard",
          value: res.data,
        },
      });
    })
    .catch((err) => {
      dispatch(setAlert(err?.response?.data?.message, "danger", 2000));
    });
};
