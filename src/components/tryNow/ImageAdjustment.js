import React from 'react';
import { Typography, Box, Slider, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { colors } from "../../consts/Colors";

const ImageAdjustment = ({ zoom, setZoom, rotation, setRotation, openDialog, setOpenDialog, handleConfirmAdjustments, uploadedImages }) => {
  // Handlers for zoom and rotation
  const handleZoomChange = (event, newZoom) => {
    setZoom(newZoom);
  };

  const handleRotationChange = (event, newRotation) => {
    setRotation(newRotation);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <Box sx={{ textAlign: "center", margin: 5 }}>
        <Typography id="zoom-slider" gutterBottom>
          Zoom
        </Typography>
        <Slider
          value={zoom}
          onChange={handleZoomChange}
          aria-labelledby="zoom-slider"
          valueLabelDisplay="auto"
          min={50}
          max={120}
          sx={{
            color: colors.skyBlue,
            maxWidth: "60%",
          }}
        />
        <Typography id="rotation-slider" gutterBottom>
          Rotate
        </Typography>
        <Slider
          value={rotation}
          onChange={handleRotationChange}
          aria-labelledby="rotation-slider"
          valueLabelDisplay="auto"
          min={0}
          max={360}
          sx={{
            color: colors.skyBlue,
            maxWidth: "60%",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          margin: "2rem",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.darkNavy,
            color: "white",
            padding: "1rem",
            borderRadius: "1.5rem",
            "&:hover": {
              backgroundColor: colors.skyBlue,
            },
          }}
          onClick={handleOpenDialog}
          disabled={uploadedImages.length === 0}
        >
          Apply Adjustments
        </Button>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Adjustments"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to apply the adjustments?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>No</Button>
          <Button onClick={handleConfirmAdjustments} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ImageAdjustment;