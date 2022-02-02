import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import logo from "./logo.gif";

function Header(props) {
  const { sections, title } = props;

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <div style={{position: "absolute", left: "0", zIndex: "-1"}}>
          <img src={logo} alt="Display logo" width="150px" height="100px" />
        </div>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1, display: {lg: "block", md: "block", xs: "none"} }}
        >
          {title}
        </Typography>
        <Typography
          component="h5"
          variant="h6"
          color="inherit"
          align="right"
          position="absolute"
          right="0"
          noWrap
          width="150px"
        >
          <a
            href="https://github.com/Bastistr99"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            GitHub
          </a>
        </Typography>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto", ml:"auto", mr:"auto" }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
