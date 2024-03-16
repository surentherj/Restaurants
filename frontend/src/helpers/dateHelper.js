import { format } from "date-fns";

const DISPLAY_FORMAT = "dd MMM yy | kk:mm";

export const convertDateToDisplayFormat = (date) => {
  if (date && date !== "") {
    try {
      let formattedDate = new Date(date);
      formattedDate = format(formattedDate, DISPLAY_FORMAT);
      return formattedDate;
    } catch {
      return "";
    }
  } else {
    return "";
  }
};
