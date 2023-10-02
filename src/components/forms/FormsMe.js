import {
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
import { Box } from "@mui/system";
import "./Forms.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function FormsMe({
  data,
  error,
  handleChange,
  setData,
  searchCity,
  province,
  allCity,
  token,
  setActive,
  setLoading,
  loading,
  setActiveStep,
}) {
  console.log(data);

  const submitHandler = (e) => {
    e.preventDefault();
    setActiveStep((prev) => prev + 1);
    setActive((prev) => prev + 1);
  };

  console.log(data)

  return (
    <>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        className="forms-page"
        mb={1}
      >
        <Typography component="h1">اطلاعات شرکت کننده:</Typography>
        <Grid
          container
          rowGap={5}
          columnGap={1}
          padding="0 10px 30px 30px"
          component="form"
          onSubmit={submitHandler}
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
              helperText={`${error.nameError === "name" && error.hasError ? error.error : ""
                }`}
              sx={{
                width: "100%", "& .MuiInputBase-input": {
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
              helperText={`${error.nameError === "lastname" && error.hasError
                ? error.error
                : ""
                }`}
              sx={{
                width: "100%", "& .MuiInputBase-input": {
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

          <Grid item md={3.9} sm={12} xs={12}>
            <TextField
              required
              disabled
              label="تلفن همراه"
              placeholder="تلفن همراه"
              type="number"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              className="input-phone"
              helperText={`${error.nameError === "other_phone" && error.hasError
                ? error.error
                : ""
                }`}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item md={3.9} sm={12} xs={12}>
            <TextField
              required
              label="کد ملی"
              placeholder="کد ملی"
              type="number"
              name="national_code"
              value={data.national_code}
              onChange={handleChange}
              className="input-phone"
              helperText={`${error.nameError === "other_phone" && error.hasError
                ? error.error
                : ""
                }`}
              sx={{
                width: "100%", "& .MuiInputBase-input": {
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

          <Grid item md={8} sm={0} xs={0}>

          </Grid>

          <Grid item md={3.9} sm={6} xs={12}>
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
                control={<Radio sx={{
                  '&.Mui-checked': {
                    color: "#b83290",
                  },
                }} />}
                label="مرد"
              />
              <FormControlLabel
                name="gender"
                onClick={(e) => setData({ ...data, [e.target.name]: "زن" })}
                value="زن"
                control={<Radio sx={{
                  '&.Mui-checked': {
                    color: "#b83290",
                  },
                }} />}
                label="زن"
              />
            </RadioGroup>
          </Grid>

          <Grid item md={3.9} sm={6} xs={12}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              پاسپورت
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="passport"
              value={data.passport}
            >
              <FormControlLabel
                name="passport"
                onClick={(e) => setData({ ...data, [e.target.name]: 1 })}
                value={1}
                control={<Radio sx={{
                  '&.Mui-checked': {
                    color: "#b83290",
                  },
                }} />}
                label="دارم"
              />
              <FormControlLabel
                name="passport"
                onClick={(e) => setData({ ...data, [e.target.name]: 0 })}
                value={0}
                control={<Radio sx={{
                  '&.Mui-checked': {
                    color: "#b83290",
                  },
                }} />}
                label="ندارم"
              />
            </RadioGroup>
          </Grid>

          <Grid item md={3.9} sm={6} xs={12}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              آیا در 5 سال اخیر به زیارت کربلا رفتید؟
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="pilgrims"
              value={data.pilgrims}
            >
              <FormControlLabel
                name="pilgrims"
                onClick={(e) => setData({ ...data, [e.target.name]: 1 })}
                value={1}
                control={<Radio sx={{
                  '&.Mui-checked': {
                    color: "#b83290",
                  },
                }} />}
                label="بله"
              />
              <FormControlLabel
                name="pilgrims"
                onClick={(e) => setData({ ...data, [e.target.name]: 0 })}
                value={0}
                control={<Radio sx={{
                  '&.Mui-checked': {
                    color: "#b83290",
                  },
                }} />}
                label="خیر"
              />
            </RadioGroup>
          </Grid>

          <Grid item md={3.9} sm={6} xs={12}>
            <FormControl sx={{
              width: "100%", "& .MuiInputBase-input": {
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
            }}>
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

          <Grid item md={3.9} sm={6} xs={12} sx={{
            width: "100%", "& .MuiInputBase-input": {
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
          }}>
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

          <Grid item md={3.9} sm={12} xs={12} sx={{
            width: "100%", "& .MuiInputBase-input": {
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
          }}>
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
            {/* {data.origin_location.includes("بین مسیر") && (
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
            )} */}

            <FormControl sx={{
              width: "100%", "& .MuiInputBase-input": {
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
            }}>
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
              </Select>
            </FormControl>
          </Grid>

          {/* <Grid
            item
            md={12}
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
                      [e.target.name]: 1,
                    })
                  }
                  value={1}
                  control={<Radio />}
                  label="دارم"
                />
                <FormControlLabel
                  name="preparation_for_travel"
                  onClick={(e) =>
                    setData({
                      ...data,
                      [e.target.name]: 0,
                      travel_preparation_time: "",
                    })
                  }
                  value={0}
                  control={<Radio />}
                  label="ندارم"
                />
              </RadioGroup>
            </Box>
            {data.preparation_for_travel === false && (
              <>
                <Typography
                  sx={{
                    color: "red",
                    fontSize: "14px",
                    marginBottom: "-20px",
                    marginTop: "-30px",
                  }}
                >
                  این موضوع ممکن است شما را در اولویت پایین تری برای سفر قرار
                  دهد.
                </Typography>
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
              </>
            )}
          </Grid> */}

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
              !data.passport?.length === 0 ||
              !data.province_id ||
              !data.city_id ||
              data.pilgrims === ""

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
    </>
  );
}
