import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-around",
});
const StyledTypography = styled(Typography)({
  display: "flex",
  cursor: "pointer",
  fontSize: "20px",
  fontWeight: "medium",
});
const StyledAppbar = styled(AppBar)({
  backgroundColor: "white",
  color: "black",
});

export const NavbarComp = () => {
  const navigate = useNavigate();
  return (
    <StyledAppbar position="sticky">
      <StyledToolbar>
        <StyledTypography
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
          onClick={() => navigate("/")}
        >
          Home
        </StyledTypography>

        <StyledTypography
          sx={{ display: "flex", gap: "10px" }}
          onClick={() => navigate("/login")}
        >
          Login
        </StyledTypography>

        <StyledTypography
          sx={{ display: "flex", gap: "10px" }}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Signup
        </StyledTypography>

        <StyledTypography
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
          onClick={() => {
            navigate("/task");
          }}
        >
          Add Task
        </StyledTypography>
      </StyledToolbar>
    </StyledAppbar>
  );
};
