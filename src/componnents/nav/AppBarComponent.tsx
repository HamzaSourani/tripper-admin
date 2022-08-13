import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Brand from "../../sharedComponents/Brand";
type appBarProps = {
  isUserAuth: boolean;
};
const AppBarComponent = ({ isUserAuth }: appBarProps) => {
  const navigate = useNavigate();
  return (
    <Box flexGrow={1} mb={5}>
      <AppBar
        sx={{
          backgroundColor: "#fff",
          direction: "ltr",
          boxShadow: 2,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        position="fixed"
      >
        <Toolbar>
          {!isUserAuth ? (
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
              endIcon={<LoginIcon />}
            >
              تسجيل الدخول
            </Button>
          ) : (
            <Button variant="contained" endIcon={<LogoutIcon />}>
              تسجيل الخروج
            </Button>
          )}
          <Stack alignItems={"flex-end"} sx={{ flexGrow: 1 }}>
            <Brand />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppBarComponent;
