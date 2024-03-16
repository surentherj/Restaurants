import {
  UPDATE_LANDING_PAGE,
  UPDATE_LANDING_PAGE_LIST,
  UPDATE_LIST_DELETE_VALUES,
  UPDATE_LP_STATE_VALUES,
} from "../actionTypes";

const initialState = {};

function LandingPageReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_LANDING_PAGE:
      let lists = payload.startAt > 0 ? state?.lists || [] : [];
      return {
        ...state,
        lists: getDistinctObjectsByKey([...lists, ...payload.lists], "id"),
        maxResult: payload.maxResult,
        startAt: payload.startAt,
        total: payload.total,
        searchValue: payload.searchValue,
      };
    case UPDATE_LANDING_PAGE_LIST:
      let list = state?.lists || [];
      let index = list?.findIndex((x) => x.id === payload.item.id);
      if (index > -1) {
        list[index] = payload.item;
      } else {
        list = [payload.item, ...list];
      }
      return {
        ...state,
        lists: list,
      };
    case UPDATE_LIST_DELETE_VALUES:
      let deletelist = state?.lists || [];
      return {
        ...state,
        lists: deletelist.filter((x) => x.id !== payload.id),
      };
    case UPDATE_LP_STATE_VALUES:
      return {
        ...state,
        [payload.key]: payload.value,
      };
    default:
      return state;
  }
}

function getDistinctObjectsByKey(objects, key) {
  const seen = new Set();
  return objects.filter((obj) => {
    const keyValue = obj[key];
    return seen.has(keyValue) ? false : seen.add(keyValue);
  });
}

export default LandingPageReducer;
