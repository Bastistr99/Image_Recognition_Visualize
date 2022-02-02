import React from "react";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <div>
      <Toolbar
        sx={{
          borderTop: 1,
          borderColor: "divider",
          position: "relative",
          bottom: 0,
          height: "3vh",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Typography variant="body2">Sebastian Straub</Typography>
        <Typography variant="body2">Moritz Neubert</Typography>
      </Toolbar>
    </div>
  );
};

export default Footer;
