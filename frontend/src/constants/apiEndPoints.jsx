const apiBasePath = `${
  process.env.REACT_APP_PROXY
    ? process.env.REACT_APP_PROXY
    : window.location.origin
}`;

const apiEndPoints = {
  LOAD_USER: () => "/user",

  LOGIN_USER: () => "/user/login",

  REGISTER_USER: () => "/user/register",

  GET_RESET_PASSWORD_MAIL: () => `${apiBasePath}/user/getResetPasswordLink`,

  VERIFY_RESET_PASSWORD_MAIL: () =>
    `${apiBasePath}/user/verifyResetPasswordLink`,

  RESET_PASSWORD: () => `${apiBasePath}/user/resetPassword`,

  GET_LISTS: () => "/list/getLists",

  ADD_LIST: () => "/list/addlist",

  UPDATE_LIST: () => "/list/updatelist",

  DELETE_LIST: (id) => `/list/deleteList?id=${id}`,

  GET_RATINGS: (id) => `/rating/getratings?id=${id}`,

  ADD_RATING: () => `/rating/addrating`,

  UPDATE_RATING: () => "/rating/updaterating",

  DELETE_RATING: (id) => `/rating/deleterating?id=${id}`,

  GET_DASHBAORD_DATA: () => "/list/dashboardData",
};

export default apiEndPoints;
