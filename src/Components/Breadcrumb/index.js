import { Breadcrumbs, Icon, styled, useTheme } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const BreadcrumbRoot = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
}));

// const BreadcrumbName = styled("h4")(() => ({
//   margin: 0,
//   fontSize: "16px",
//   paddingBottom: "1px",
//   verticalAlign: "middle",
//   textTransform: "capitalize",
// }));

const SubName = styled("span")(({ theme }) => ({
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
  fontSize: 14,
}));

// const Separator = styled("h4")(({ theme }) => ({
//   margin: 0,
//   marginLeft: 8,
//   paddingBottom: "3px",
//   color: theme.palette.text.hint,
//   fontSize: 14,
// }));

// const StyledIcon = styled(Icon)(() => ({
//   marginLeft: 8,
//   marginBottom: "4px",
//   verticalAlign: "middle",
//   fontSize: 18,
// }));

const Index = ({ routeSegments }) => {
  const theme = useTheme();
  // const hint = theme.palette.text.hint;
  const [hoverStyle, setHoverStyle] = useState("none");

  const changeHoverStyle = (a) => {
    setHoverStyle(a);
  };

  return (
    <BreadcrumbRoot>
      {/* {routeSegments ? (
        <Hidden xsDown>
          <BreadcrumbName>
            {routeSegments[routeSegments.length - 1]["name"]}
          </BreadcrumbName>
          <Separator>|</Separator>
        </Hidden>
      ) : null} */}

      <Breadcrumbs
        separator={"/"}
        sx={{ display: "flex", alignItems: "center", position: "relative" }}
      >
        {/* <NavLink to="/dashboard">
          <StyledIcon color="primary">home</StyledIcon>
        </NavLink> */}

        {routeSegments
          ? routeSegments.map((route, index) => {
              return index !== routeSegments.length - 1 ? (
                <NavLink
                  key={index}
                  to={route.path == "Settings" ? "#" : route.path}
                  style={{
                    textDecoration: hoverStyle,
                  }}
                  onMouseOver={() => changeHoverStyle("underline")}
                  onMouseOut={() => changeHoverStyle("none")}
                >
                  <SubName>{route.name}</SubName>
                </NavLink>
              ) : (
                <SubName key={index} sx={{ fontWeight: "bold" }}>
                  {route.name}
                </SubName>
              );
            })
          : null}
      </Breadcrumbs>
    </BreadcrumbRoot>
  );
};

export default Index;
