import React from "react";
import { Typography, Grid, TextField, Button, Box } from "@mui/material";
import contactIllustration from "../../assets/logo2.png";
import { colors } from "../../consts/Colors";
import emailjs from "emailjs-com";

const ContactUs = () => {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_3cv06rd",
        "template_j4o7u2q",
        e.target,
        "llSj2sF3CULLBCb3T"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Message sent successfully!");
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send the message, please try again.");
        }
      );
  };

  return (
    <Box sx={{ flexGrow: 1, p: 5 }}>
      <form noValidate autoComplete="off" onSubmit={sendEmail}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                mb: 4,
                color: colors.darkNavy,
              }}
            >
              Contact with us
            </Typography>

            <Box sx={{ maxWidth: "50rem", margin: "0 auto" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="from_name" // Match the name attribute to your EmailJS template variables
                    label="Name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="reply_to" // Match the name attribute to your EmailJS template variables
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="message" // Match the name attribute to your EmailJS template variables
                    label="Comments"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit" // Make sure to have type="submit" for the button to submit the form
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: colors.darkNavy,
                      color: "#ffffff",
                      fontWeight: "bold",
                      borderRadius: "2rem",
                      "&:hover": {
                        backgroundColor: colors.skyBlue,
                        color: "#ffffff",
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
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
      </form>
    </Box>
  );
};

export default ContactUs;
