import Cookies from "js-cookie";

export const getUserSession = () => {
  return !!Cookies.get("user_token");
};

export const removeUserSession = () => {
  Cookies.remove("user_token");
};
