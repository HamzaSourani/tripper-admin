import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddCardIcon from "@mui/icons-material/AddCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const MainComponent = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Drawer
        sx={{
          width: 200,

          [`& .MuiDrawer-paper`]: {
            pt: 4,
            backgroundColor: "var(--primary-color)",
            width: 200,
            boxSizing: "border-box",
            boxShadow: 3,
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem onClick={() => navigate("/create-place")} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LocationOnIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText sx={{ color: "white" }} primary={"إنشاء مكان"} />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ my: 1 }} />
            <ListItem onClick={() => navigate("/add-products")} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AddCardIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  sx={{ color: "white" }}
                  primary={"إضافة منتجات"}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Toolbar />
      <Outlet />
    </Box>
  );
};

export default MainComponent;
