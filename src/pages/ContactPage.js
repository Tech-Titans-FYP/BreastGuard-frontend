import React from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Container,
} from "@mui/material";
import contactIllustration from "../assets/logo2.png";
import styled from "styled-components";
import backgroundImage from "../assets/background-watermark.png";

const ContactForm = () => {
  return (
    <StyledContainer>
    <Box sx={{ flexGrow: 1, p: 5 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 4,
              color: "#0C6872",
            }}
          >
            Contact with us
          </Typography>

          <Box sx={{ maxWidth: "50rem", margin: "0 auto" }}>
            <form noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField label="Name" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Email" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Comments"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox name="agree" color="primary" />}
                    label="By Submitting you are agreed to the Terms & Conditions, and Privacy Policy"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: "#00A79D",
                      color: "#ffffff",
                      fontWeight: "bold",
                      borderRadius: "2rem",
                      "&:hover": {
                        backgroundColor: "#00A79D",
                        color: "#ffffff",
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={contactIllustration}
            alt="Contact Illustration"
            sx={{
              width: "50%",
              height: "auto",
              display: "block",
              margin: "auto",
            }}
          />
        </Grid>
      </Grid>
    </Box>
    </StyledContainer>
  );
};

export default ContactForm;

const StyledContainer = styled(Container)`
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${backgroundImage}), url(${backgroundImage});
    background-repeat: no-repeat no-repeat;
    background-position: left bottom, right top; // positions for each watermark
    background-size: 5%, 5%; // sizes for each watermark (adjust as needed)
    pointer-events: none;
    z-index: -1;
  }
`;
