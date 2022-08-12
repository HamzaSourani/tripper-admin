import React from "react";
import axios from "axios";
import statusType from "../sharedType/responseStatus";
// import { isUserAuthContext } from "../App";
export type userLogin = {
  email: string;
  password: string;
};
const useUserLogin = (userInfo: userLogin) => {
  const [authStatus, setAuthStatus] = React.useState<statusType>("idle");
  const [authError, setAuthError] = React.useState<string>("");
  //   const chechIsUserAuth = React.useContext(isUserAuthContext );
  const handleUserAuth = async () => {
    try {
      setAuthStatus("loading");
      setAuthError("");
      const response = await axios({
        method: "post",
        url: "http://www.tripper.dentatic.com/api/admin/client/auth/login",
        data: { username: userInfo.email, password: userInfo.password },
        headers: {
          Accept: "application/json",
        },
      });
      if (response.data.data.bearer_token) {
        localStorage.clear();
        localStorage.setItem(
          "bearerToken",
          JSON.stringify(response.data.data.bearer_token)
        );
        localStorage.setItem("userInfo", JSON.stringify(response.data.data));
        setAuthStatus("succeeded");
      }
    } catch (error) {
      setAuthStatus("failed");
      console.log(error);
      const _error = error as {
        message: string;
      };
      setAuthError(_error.message);
    }
  };

  return [authError, authStatus, handleUserAuth] as const;
};

export default useUserLogin;
