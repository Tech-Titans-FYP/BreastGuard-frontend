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

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#eeeee4", // This color will be used as the background color of the AppBar
    },
  },
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif",
    button: {
      textTransform: "none", // Prevents uppercase transform for all buttons
    },
  },
});

const Header = () => {
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
      <AppBar position="sticky" color="primary">
        <Toolbar>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleMobileMenu}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={mobileMenuOpen}
                onClose={toggleMobileMenu}
              >
                <List>
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
                <Button color="inherit" onClick={() => handleNavigate("/")}>
                  Home
                </Button>
                <Button
                  color="inherit"
                  onClick={() => handleNavigate("/results")}
                >
                  Results
                </Button>
                <Button
                  color="inherit"
                  onClick={() => handleNavigate("/usability")}
                >
                  Usability
                </Button>
                <Button
                  color="inherit"
                  onClick={() => handleNavigate("/manual")}
                >
                  User Manual
                </Button>
                <Button
                  color="inherit"
                  onClick={() => handleNavigate("/contactus")}
                >
                  Contact Us
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#00A79D",
                    "&:hover": {
                      backgroundColor: "darken(#00A79D, 0.2)",
                    },
                    borderRadius: "1.25rem", // 20px to rem
                    color: "white",
                    padding: "0.375rem 0.9375rem", // 6px 15px to rem
                    textTransform: "none",
                    boxShadow: "none", // Custom shadow effect removed for consistency
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
    </ThemeProvider>
  );
};

export default Header;
