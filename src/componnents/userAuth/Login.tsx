import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InputPassword from "./InputPassword";
import InputText from "../../sharedComponents/InputText";
import Brand from "../../sharedComponents/Brand";
import LoadingButton from "../../sharedComponents/LoadingButton";
import useUserLogin from "../../customHooks/useUserLogin";
type loginProps = {
  chechIsUserAuth: () => void;
};
const Login = ({ chechIsUserAuth }: loginProps) => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const userInfo = {
    email,
    password,
  };
  const [authError, authStatus, handleUserAuth] = useUserLogin(userInfo);
  const navigate = useNavigate();
  const canSendData = [email, password].every(Boolean);

  React.useEffect(() => {
    if (authStatus === "succeeded") {
      //   dispatch(
      //     setSnackbarParam({
      //       alertMessage: "تم تسجيل الدخول بنجاح",
      //       alertType: "success",
      //     })
      //   );
      setEmail("");
      setPassword("");
      navigate("/create-place");
      chechIsUserAuth();
    } else if (authStatus === "failed") {
      //   dispatch(
      //     setSnackbarParam({
      //       alertMessage: "حدث خطا ما عند تسجيل الدخول",
      //       alertType: "error",
      //     })
      //   );
    }
  }, [authStatus, navigate]);

  return (
    <Grid
      sx={{
        minHeight: "70vh",
        my: 5,
      }}
      container
      justifyContent={"center"}
      alignItems="center"
    >
      <Grid item xs={11} sm={10} md={8} lg={6}>
        <Box
          sx={{
            p: 4,
            border: "1px solid var(--golden-color)",
            borderRadius: "1rem",
            boxShadow: "0px 0px 4px  var(--golden-color)",
          }}
        >
          <Stack
            justifyContent="space-evenly"
            alignItems={"center"}
            sx={{ my: 2 }}
            spacing={2}
          >
            <Brand />
          </Stack>
          <Stack justifyContent={"center"} alignItems={"center"} spacing={2}>
            <InputText label="اسم المدير" value={email} setValue={setEmail} />
            <InputPassword
              label="كلمة المرور"
              value={password}
              setValue={setPassword}
            />
          </Stack>
          {authStatus === "failed" && (
            <Box sx={{ color: "red", textAlign: "center", my: 3 }}>
              {authError}
            </Box>
          )}
          {canSendData && (
            <LoadingButton
              onClick={handleUserAuth}
              label="تسجيل الدخول"
              loading={authStatus === "loading"}
              sx={{ display: "block", m: "15px auto", minWidth: "50%" }}
            />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
