import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Forms from "./forms/Forms";
import React, { useState } from "react";
import "./TourSelect.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TourSelect({
  data,
  handleChange,
  error,
  setData,
  token,
  setActive,
  loading,
  setLoading,
  toggle,
  setToggle,
  setActiveStep,
}) {
  // const [tour, setTour] = useState("");
  const [openInfo, setOpenInfo] = useState(false);
  console.log("phone", data.phone);
  const handleChangeTour = (event) => {
    console.log(event.target.value);
    setData({ ...data, tor_name: event.target.value });
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" width="100%" padding="10px 10px">
      <Typography margin="30px 0" fontSize={20} fontWeight="bold" sx={{ color: "#000" }}>
        مقصد خود را انتخاب کنید
      </Typography>
      <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" width="100%">
        <FormControl
          sx={{
            width: "200px",
            "& .MuiInputBase-input": {
              color: "#000",
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused": {
                color: "#054A27",
              },
            },
            "& .MuiOutlinedInput-root": {
              fieldset: {},
              "&:hover fieldset": {
                borderColor: "#054A27",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#054A27",
              },
            },
          }}
        >
          <InputLabel id="demo-simple-select-label">انتخاب مقصد</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={data.tor_name}
            label="انتخاب مقصد"
            onChange={handleChangeTour}
          >
            <MenuItem value="کربلا">عتبات عالیات</MenuItem>
          </Select>
        </FormControl>

        {data.tor_name === "کربلا" && (
          <ul>
            <li>
              <Typography textAlign="justify" mt={4} fontSize={18}>
                زیارت آداب مشخصی دارد. پس <b>صداقت شما</b>، مبنای ما برای بررسی صحت اطلاعات وارد شده است.
              </Typography>
            </li>

            <li>
              <Typography textAlign="justify" mt={4} fontSize={18}>
                با توجه به اینکه کاروان کربلا در حال حاضر از مبدا تهران و کرج برگزار می شود توجه داشته باشید برای عزیمت به عتبات و عالیات
                باید امکان رفت و برگشت شخصی خود را به این شهرها باشید
              </Typography>
            </li>

            <li>
              <Typography textAlign="justify" mt={4} fontSize={18}>
                شما می توانید هر هفته در قرعه کشی کربلای گروه زیارتی آمنین شرکت کنید.
              </Typography>
            </li>

            <li>
              <Typography textAlign="justify" mt={4} fontSize={18}>
                تمام اطلاعات و سوالات مربوط به قرعه‌کشی و اعزام شرکت کنندگان عزیز در کانال رسمی گروه زیارتی آمنین در فضای مجازی بارگزاری شده است شما
                با سرچ هشتگ <span style={{ color: "#054a27" }}>#قرعه_کشی_کربلا</span> میتوانید اطلاعات کاملی در رابطه با این طرح به دست
                بیاورید .
              </Typography>
            </li>

            <li>
              <Typography textAlign="justify" mt={4} fontSize={18}>
                توجه داشته باشید مجری رسمی این طرح فقط شرکت گروه زیارتی آمنین ایرانیان است، پس مراقب سوء استفاده های ممکن در قرعه‌کشی ها و طرح هایی
                با این نام و مزمون باشید.
              </Typography>
            </li>
          </ul>
        )}

        {data.tor_name && (
          <Box
            margin="30px 0"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={5}
            // width="100%"
          >
            <button
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: "10px",
                width: "100%",
                cursor: "pointer",
              }}
              onClick={() => {
                setActive((prev) => prev + 1);
                setToggle("forMe");
                setActiveStep((prev) => prev + 1);
              }}
            >
              ادامه
            </button>
          </Box>
        )}
      </Box>

      <Dialog open={openInfo} onClose={() => setOpenInfo(false)} TransitionComponent={Transition} keepMounted>
        <DialogTitle
          sx={{
            borderBottom: "1px solid #ccc",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#af3490",
          }}
        >
          {"قوانین ثبت نام در طرح قافله"}
        </DialogTitle>
        <DialogContent sx={{ marginTop: "20px" }}>
          <ul style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <li>
              <Typography sx={{ textAlign: "justify !important" }}>ثبت نام در طرح قافله به معنی رزرو قطعی نیست.</Typography>
            </li>

            <li>
              <Typography sx={{ textAlign: "justify !important" }}>
                افراد بر اساس اولویت های اعلام شده از طرف کارگروه طرح قافله در صف سفر قرار خواهند گرفت. با احترام، کارگروه بررسی، در این
                زمینه بر اساس مقررات خود تحقیق و عمل خواهد کرد.
              </Typography>
            </li>

            <li>
              <Typography sx={{ textAlign: "justify !important" }}>
                حرکت کاروان ازمبدا تهران و کرج خواهد بود و فقط از شهرستان های ساوه ، همدان ، کرمانشاه و ایلام امکان <b>ملحق شدن</b> وجود
                دارد.
              </Typography>
            </li>

            <li>
              <Typography textAlign="justify">
                لطفا در صورتی که گذر نامه (پاسپورت) ندارید و یا از اعتبار گذر نامه ی شما کمتر از شش ماه مانده است از ثبت نام خودداری فرمایید
                . (مسافر برای عبور از مرز باید گذر نامه ای با اعتبار بیش از شش ماه داشته باشد. )
              </Typography>
            </li>

            <li>
              <Typography fontWeight="bold" sx={{ textAlign: "justify !important" }}>
                با توجه به اینکه امکانات این طرح برای استفاده افراد با توان کم مالی در نظر گرفته شده است خواهشمند است از ثبت نام بی هدف در
                این طرح خودداری کنید.
              </Typography>
            </li>
          </ul>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-around",
            borderTop: "1px solid #ccc",
          }}
        >
          <Button onClick={(e) => setOpenInfo(false)}>بستن</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
