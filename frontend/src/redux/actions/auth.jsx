import apiEndPoints from "../../constants/apiEndPoints";
import api from "../../utils/api";
import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_GENERAL_STATE_VALUES,
  USER_LOADED
} from "../actionTypes";
import { setAlert } from "./toast";

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get(apiEndPoints.LOAD_USER());
    const { name, email, token } = res.data;
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    if (token) {
      localStorage.setItem("basictoken", token);
    }
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (accessToken) => async (dispatch) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: { token: accessToken },
  });
  dispatch(loadUser());
};

export const logout = () => (dispatch) => dispatch({ type: LOGOUT });

export const sendResetPasswordMail = (email) => (dispatch) => {
  api
    .post(apiEndPoints.GET_RESET_PASSWORD_MAIL(), { email })
    .then((res) => {
      dispatch(setAlert("Password Reset Mail Sent!", "success"));
    })
    .catch((err) => {
      dispatch(setAlert(err?.response?.data?.message, "danger", 2000));
    });
};

export const verifyResetPasswordLink = (resetPasswordToken) => (dispatch) => {
  api
    .post(apiEndPoints.VERIFY_RESET_PASSWORD_MAIL(), { resetPasswordToken })
    .then((res) => {
      dispatch({
        type: UPDATE_GENERAL_STATE_VALUES,
        payload: {
          key: "resetPasswordMail",
          value: res.data.email,
        },
      });
    })
    .catch((err) => {
      dispatch(setAlert(err?.response?.data?.message, "danger", 2000));
    });
};

export const resetPassword = (obj) => (dispatch) => {
  api
    .post(apiEndPoints.RESET_PASSWORD(), obj)
    .then((res) => {
      dispatch({
        type: UPDATE_GENERAL_STATE_VALUES,
        payload: {
          key: "resetPasswordMail",
          value: undefined,
        },
      });
      dispatch(setAlert(res.data.message, "success"));
    })
    .catch((err) => {
      dispatch(setAlert(err?.response?.data?.message, "danger", 2000));
    });
};
