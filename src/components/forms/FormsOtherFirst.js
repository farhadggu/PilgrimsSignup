import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function FormsOtherFirst({
  data,
  handleChange,
  error,
  MenuProps,
  setData,
  setNext,
  setActiveStep,
  setActive,
  loading,
  relation,
  setRelation
}) {



  const relationChange = (e) => {
    setRelation(e.target.value);
    if (e.target.value !== "سایر") {
      setData({ ...data, [e.target.name]: e.target.value });
    } else {
      setData({ ...data, [e.target.name]: "" });
    }
  };
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      className="forms-page"
    >
      <Typography
        sx={{ textAlign: "center", color: "#943993", fontWeight: "bold", mb:5 }}
        fontSize={20}
      >
        اطلاعات شما به عنوان فرد<br/> معرفی کننده
      </Typography>
      <Grid
        container
        rowGap="30px"
        padding="0 10px 30px 30px"
        columnGap={1}
        component="form"
        className="forms-box"
      >
        <Grid item md={3.9} sm={6} xs={12}>
          <TextField
            required
            label="نام فرد معرفی کننده"
            placeholder="نام فرد معرفی کننده"
            type="text"
            name="other_name"
            value={data.other_name}
            onChange={handleChange}
            className="input-phone"
            helperText={`${
              error.nameError === "name" && error.hasError ? error.error : ""
            }`}
            sx={{ width: "100%" }}
          />
        </Grid>

        <Grid item md={3.9} sm={6} xs={12}>
          <TextField
            required
            label="نام خانوادگی فرد معرفی کننده"
            placeholder="نام خانوادگی فرد معرفی کننده"
            type="text"
            name="other_lastname"
            value={data.other_lastname}
            onChange={handleChange}
            className="input-phone"
            helperText={`${
              error.nameError === "name" && error.hasError ? error.error : ""
            }`}
            sx={{ width: "100%" }}
          />
        </Grid>

        <Grid item md={3.9} sm={6} xs={12}>
          <TextField
            required
            label="تلفن همراه"
            placeholder="تلفن همراه"
            type="number"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            className="input-phone"
            helperText={`${
              error.nameError === "name" && error.hasError ? error.error : ""
            }`}
            sx={{ width: "100%" }}
            disabled
          />
        </Grid>

        <Grid item md={3.9} sm={6} xs={12}>
          <TextField
            required
            label="شهر محل سکونت"
            placeholder="شهر محل سکونت"
            type="text"
            name="other_city"
            value={data.other_city}
            onChange={handleChange}
            className="input-phone"
            helperText={`${
              error.nameError === "name" && error.hasError ? error.error : ""
            }`}
            sx={{ width: "100%" }}
          />
        </Grid>

        <Grid item md={3.9} sm={6} xs={12}>
          <TextField
            required
            label="مسئولیت اجتماعی"
            placeholder=" مسئول خیریه ، شهروند عادی"
            type="text"
            name="other_socialـposition"
            value={data.other_socialـposition}
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
            className="input-phone"
            helperText={`${
              error.nameError === "name" && error.hasError ? error.error : ""
            }`}
            sx={{ width: "100%" }}
          />
        </Grid>

        <Grid item md={3.9} sm={6} xs={12}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-label">
              نسبت شما با معرفی شونده
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={relation}
              label="نسبت شما با معرفی شونده"
              name="other_relationship"
              onChange={relationChange}
              MenuProps={MenuProps}
            >
              <MenuItem value="همکار">همکار</MenuItem>
              <MenuItem value="همسایه">همسایه</MenuItem>
              <MenuItem value="هم محلی">هم محلی</MenuItem>
              <MenuItem value="خویشاوند">خویشاوند</MenuItem>
              <MenuItem value="سایر">سایر</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {relation == "سایر" && (
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              required
              label="نسبت خود را بنویسید"
              placeholder="نسبت خود را بنویسید"
              type="text"
              name="other_relationship"
              value={data.other_relationship}
              onChange={handleChange}
              className="input-phone"
              helperText={`${error.hasError ? error.error : ""}`}
              sx={{width: '100%'}}
            />
          </Grid>
        )}
        <Box display="flex" alignItems='center' gap={1}>
          <Button
            onClick={() => {
              setNext((prev) => prev + 1);
              setActiveStep((prev) => prev + 1);
            }}
            variant="contained"
            sx={{
              background: "#054A27",
              padding: "10px 30px",
              margin: "20px auto",
              width: "100%"
            }}
            type="submit"
            disabled={
              !data.other_name ||
              !data.phone ||
              !data.other_socialـposition ||
              !data.other_city ||
              !data.other_relationship
            }
          >
              مرحله بعد
          </Button>

          <Button
            onClick={() => {
              setActive((prev) => prev - 1);
              setActiveStep((prev) => prev - 1);
            }}
            variant="contained"
            sx={{
              background: "#054A27",
              padding: "10px 30px 0 10px",
              margin: "20px auto",
            }}
          >
            {loading ? "صبر کنید..." : "بازگشت"}
          </Button>
        </Box>
      </Grid>
    </Box>
  );
}
