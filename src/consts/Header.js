import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  useMediaQuery,
  IconButton,
  ThemeProvider,
  createTheme,
  Box,
  List,
  ListItem,
  ListItemText,
  Drawer,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo.png";
import { useScrollTrigger } from "@mui/material";
import { colors } from "../consts/Colors";

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      backgroundColor: trigger ? colors.darkNavy : "transparent",
      transition: "background-color 0.3s ease-in-out",
    },
  });
}

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(0, 0, 0, 0)", // fully transparent
    },
  },
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif",
    button: {
      textTransform: "none", // Prevents uppercase transform for all buttons
    },
  },
});

const Header = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setMobileMenuOpen(false); // Close the mobile menu upon navigation
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <ElevationScroll {...props}>
        <AppBar position="sticky">
          <Toolbar>
            {isMobile ? (
              <>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleMobileMenu}
                >
                  <MenuIcon 
                    color="white"
                  />
                </IconButton>
                <Drawer
                  anchor="left"
                  open={mobileMenuOpen}
                  onClose={toggleMobileMenu}
                >
                  <List
                  
                  >
                    {[
                      "Home",
                      "Results",
                      "Usability",
                      "User Manual",
                      "Contact Us",
                      "Try Now",
                    ].map((text) => (
                      <ListItem
                        button
                        key={text}
                        onClick={() =>
                          "Home" === text
                            ? handleNavigate(`/`)
                            : handleNavigate(
                                `/${text.toLowerCase().replace(/\s/g, "")}`
                              )
                        }
                      >
                        <ListItemText primary={text} />
                      </ListItem>
                    ))}
                  </List>
                </Drawer>
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <img
                  src={logo}
                  alt="Breast Guard Logo"
                  style={{ height: "3.125rem" }}
                  onClick={() => handleNavigate("/")}
                />
                <Box>
                  <Button
                    color="inherit"
                    onClick={() => handleNavigate("/")}
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Home
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleNavigate("/results")}
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Results
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleNavigate("/usability")}
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Usability
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleNavigate("/manual")}
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    User Manual
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleNavigate("/contactus")}
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Contact Us
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: colors.teal,
                      "&:hover": {
                        backgroundColor: colors.skyBlue,
                      },
                      borderRadius: "1.25rem", // 20px to rem
                      color: "white",
                      padding: "0.375rem 0.9375rem", // 6px 15px to rem
                      textTransform: "none",
                      boxShadow: "none", // Custom shadow effect removed for consistency
                      fontWeight: "bold",
                    }}
                    onClick={() => handleNavigate("/trynow")}
                  >
                    Try Now
                  </Button>
                </Box>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </ThemeProvider>
  );
};

export default Header;
