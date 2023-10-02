import { Button, FormLabel, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function Description({
  data,
  handleChange,
  setActive,
  setActiveStep,
  token,
  setData,
  images,
  setImages,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%"
      }}
    >
      <Grid item md={12} sm={12} xs={12} p="0 10px" sx={{width: "100%"}}>
        <FormLabel id="demo-row-radio-buttons-group-label">
          <Typography sx={{ textAlign: "justify !important", mb: 3 }}>
            نظرات ، انتقادات ، پیشنهادات شما را با روی باز پذیرا هستیم . 
          </Typography>
        </FormLabel>
        <TextField
          multiline
          rows={12}
          type="number"
          name="description"
          value={data.description}
          onChange={handleChange}
          className="input-phone"
          sx={{
            width: "95%", textAlign: "right !important", "& .MuiInputBase-input": {
              color: "#000",
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused": {
                color: "#b83290",
              },
            },
            "& .MuiOutlinedInput-root": {
              fieldset: {
              },
              "&:hover fieldset": {
                borderColor: "#b83290",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#b83290",
              },
            },
          }}
        />
      </Grid>

      <Box display="flex" gap={10} mt={2}>
        <Button
          onClick={() => {
            setActive((prev) => prev + 1);
          }}
        >
          تایید
        </Button>

        <Button
          onClick={() => {
            setActive((prev) => prev - 1);
          }}
        >
          بازگشت
        </Button>
      </Box>
    </Box>
  );
}
