import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export default function FormsOtherSecond({
  data,
  handleChange,
  error,
  setData,
  MenuProps,
  searchCity,
  province,
  allCity,
  setActiveStep,
  setActive,
}) {
  console.log(data);
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      className="forms-page"
      mb={1}
    >
      <Typography component="h1">اطلاعات مسافر:</Typography>
      <Grid
        container
        rowGap={5}
        columnGap={1}
        padding="0 10px 30px 30px"
        component="form"
      >
        <Grid item md={3.9} sm={6} xs={12}>
          <TextField
            required
            label="نام"
            placeholder="نام"
            type="text"
            name="name"
            value={data.name}
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
            label="نام خانوادگی"
            placeholder="نام خانوادگی"
            type="text"
            name="lastname"
            value={data.lastname}
            onChange={handleChange}
            className="input-phone"
            helperText={`${
              error.nameError === "lastname" && error.hasError
                ? error.error
                : ""
            }`}
            sx={{ width: "100%" }}
          />
        </Grid>

        <Grid item md={3.9} sm={12} xs={12}>
          <TextField
            required
            label="تلفن همراه"
            placeholder="تلفن همراه"
            type="number"
            name="other_phone"
            value={data.other_phone}
            onChange={handleChange}
            className="input-phone"
            helperText={`${
              error.nameError === "other_phone" && error.hasError
                ? error.error
                : ""
            }`}
            sx={{ width: "100%" }}
          />
        </Grid>

        <Grid item md={5.9} sm={6} xs={12}>
          <FormLabel id="demo-row-radio-buttons-group-label">جنسیت</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={data.gender}
            sx={{ width: "100%" }}
          >
            <FormControlLabel
              name="gender"
              onClick={(e) => setData({ ...data, [e.target.name]: "مرد" })}
              value="مرد"
              control={<Radio />}
              label="مرد"
            />
            <FormControlLabel
              name="gender"
              onClick={(e) => setData({ ...data, [e.target.name]: "زن" })}
              value="زن"
              control={<Radio />}
              label="زن"
            />
          </RadioGroup>
        </Grid>

        <Grid item md={5.9} sm={6} xs={12}>
          <FormLabel id="demo-row-radio-buttons-group-label">پاسپورت</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="passport"
            value={data.passport}
          >
            <FormControlLabel
              name="passport"
              onClick={(e) => setData({ ...data, [e.target.name]: true })}
              value={true}
              control={<Radio />}
              label="دارم"
            />
            <FormControlLabel
              name="passport"
              onClick={(e) => setData({ ...data, [e.target.name]: false })}
              value={false}
              control={<Radio />}
              label="ندارم"
            />
          </RadioGroup>
        </Grid>

        <Grid
          item
          md={`${data.passengers_count != 0 ? 5.9 : 11.9}`}
          sm={6}
          xs={12}
        >
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-label">
              تعداد نفرات همراه :{" "}
              {data.passengers_count == 0 ? "خودم" : "خودم و (1 نفر همراه)"}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data.passengers_count}
              label={`تعداد نفرات همراه : ${
                data.passengers_count == 0 ? "خودم" : "خودم و (1 نفر همراه)"
              }`}
              name="passengers_count"
              onChange={(e) =>
                setData({ ...data, passengers_count: e.target.value })
              }
              MenuProps={MenuProps}
            >
              <MenuItem value="0">0</MenuItem>
              <MenuItem value="1">1</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {data.passengers_count != 0 && (
          <Grid item md={5.9} sm={6} xs={12}>
            <TextField
              required
              label="نسبت نفرات همراه"
              placeholder="همسر ، والدین ، فرزند ، دوست"
              type="text"
              name="passengers_relationship"
              value={data.passengers_relationship}
              onChange={handleChange}
              className="input-phone"
              helperText={`${
                error.nameError === "passengers_relationship" && error.hasError
                  ? error.error
                  : ""
              }`}
              sx={{ width: "100%" }}
            />
          </Grid>
        )}

        <Grid item md={3.9} sm={6} xs={12}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-label">استان</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data.province_id}
              label="استان"
              name="province_id"
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              MenuProps={MenuProps}
            >
              {province?.map((item, index) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.province}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={3.9} sm={6} xs={12}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-label">شهر</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data.city_id}
              name="city_id"
              label="شهر"
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              MenuProps={MenuProps}
            >
              {allCity?.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.name_fa}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={3.9} sm={12} xs={12}>
          <TextField
            label="روستا"
            placeholder="روستا"
            type="text"
            name="village"
            value={data.village}
            onChange={handleChange}
            className="input-phone"
            sx={{ width: "100%" }}
          />
        </Grid>

        <Grid item md={12} sm={12} xs={12}>
          {data.origin_location.includes("بین مسیر") && (
            <Typography
              sx={{
                color: "red",
                fontSize: "14px",
                marginBottom: "10px",
                marginTop: "-20px",
              }}
            >
              توجه! اتوبوس در این موقعیت توقف طولانی نخواهد داشت و تنها در بین
              مسیر امکان ملحق شدن به کاروان وجود دارد.
            </Typography>
          )}

          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-label">انتخاب مبدا</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data.origin_location}
              name="origin_location"
              label="انتخاب مبدا"
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              MenuProps={MenuProps}
            >
              <MenuItem value={"تهران"}>تهران</MenuItem>
              <MenuItem value={"کرج"}>کرج</MenuItem>
              <MenuItem value={"همدان (بین مسیر)"}>همدان (بین مسیر)</MenuItem>
              <MenuItem value={"ساوه (بین مسیر)"}>ساوه (بین مسیر)</MenuItem>
              <MenuItem value={"کرمانشاه (بین مسیر)"}>
                کرمانشاه (بین مسیر)
              </MenuItem>
              <MenuItem value={"ایلام (بین مسیر)"}>ایلام (بین مسیر)</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid
          item
          md={5.9}
          sm={12}
          xs={12}
          display="flex"
          flexDirection="column"
          gap={5}
        >
          <Box>
            <FormLabel id="demo-row-radio-buttons-group-label">
              در هر زمان آمادگی سفر دارم؟
            </FormLabel>
            <RadioGroup
              value={data.preparation_for_travel}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="preparation_for_travel"
            >
              <FormControlLabel
                name="preparation_for_travel"
                onClick={(e) =>
                  setData({
                    ...data,
                    [e.target.name]: true,
                  })
                }
                value={true}
                control={<Radio />}
                label="دارم"
              />
              <FormControlLabel
                name="preparation_for_travel"
                onClick={(e) =>
                  setData({
                    ...data,
                    [e.target.name]: false,
                    travel_preparation_time: "",
                  })
                }
                value={false}
                control={<Radio />}
                label="ندارم"
              />
            </RadioGroup>
          </Box>
          {data.preparation_for_travel === false && (
            <>
              <TextField
                required
                label="زمان مناسب را تایپ کنید: تاریخ - زمان"
                placeholder="زمان مناسب را تایپ کنید: تاریخ - زمان"
                type="text"
                name="travel_preparation_time"
                value={data.travel_preparation_time}
                onChange={handleChange}
                disabled={
                  data.preparation_for_travel === true ||
                  data.preparation_for_travel === null
                }
                className="input-phone responsive-field"
                sx={{ width: "43%" }}
                helperText={`${
                  error.nameError === "travel_preparation_time" &&
                  error.hasError
                    ? error.error
                    : ""
                }`}
              />
              <Typography
                sx={{
                  color: "red",
                  fontSize: "14px",
                  marginBottom: "-20px",
                  marginTop: "-30px",
                }}
              >
                این موضوع ممکن است شما را در اولویت پایین تری برای سفر قرار دهد.
              </Typography>
            </>
          )}
        </Grid>

        <Grid
          item
          md={5.9}
          sm={12}
          xs={12}
          display="flex"
          flexDirection="column"
          gap={5}
        >
          <Box>
            <FormLabel id="demo-row-radio-buttons-group-label">
              آیا توانایی پرداخت بخشی از هزینه را دارید؟
            </FormLabel>
            <RadioGroup
              value={data.ability_to_pay}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                name="ability_to_pay"
                onClick={(e) => setData({ ...data, [e.target.name]: true })}
                value={true}
                control={<Radio />}
                label="دارم"
              />
              <FormControlLabel
                name="ability_to_pay"
                onClick={(e) =>
                  setData({
                    ...data,
                    [e.target.name]: false,
                    ability_to_pay_price: "",
                  })
                }
                value={false}
                control={<Radio />}
                label="ندارم"
              />
            </RadioGroup>
          </Box>

          {data.ability_to_pay === true && (
            <TextField
              label="چقدر ؟ (به تومان)"
              placeholder="چقدر ؟ (به تومان)"
              type="number"
              name="ability_to_pay_price"
              value={data.ability_to_pay_price}
              onChange={handleChange}
              className="input-phone responsive-field"
              sx={{ width: "43%" }}
              helperText={`${
                error.nameError === "ability_to_pay" && error.hasError
                  ? error.error
                  : ""
              }`}
            />
          )}
        </Grid>

        <Button
          onClick={() => {
            setActive((prev) => prev + 1);
            setActiveStep((prev) => prev + 1);
          }}
          variant="contained"
          sx={{
            background: "#b83290",
            padding: "10px 30px",
            margin: "20px auto",
          }}
          // type="submit"
          disabled={
            !data.name ||
            !data.lastname ||
            !data.gender ||
            !data.passport ||
            !data.province_id ||
            !data.city_id ||
            !data.phone ||
            (data.passengers_count > 0 && !data.passengers_relationship) ||
            (!data.preparation_for_travel && !data.travel_preparation_time) ||
            data.ability_to_pay === "" ||
            (data.ability_to_pay && !data.ability_to_pay_price)
          }
        >
          تایید
        </Button>

        <Button
          onClick={() => {
            setActive((prev) => prev - 1);
            setActiveStep((prev) => prev - 2);
          }}
          variant="contained"
          sx={{
            background: "#b83290",
            padding: "10px 30px 0 10px",
            margin: "20px auto",
          }}
        >
          بازگشت
        </Button>
      </Grid>
    </Box>
  );
}
