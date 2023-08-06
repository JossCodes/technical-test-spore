import Cookies from "js-cookie";

export const useCookieSession = () => {
  const saveUserSession = (token: string) => {
    Cookies.set("user_token", token);
  };

  const onCloseSession = () => {
    Cookies.remove("user_token");
  };

  return {
    saveUserSession,
    onCloseSession,
  };
};
