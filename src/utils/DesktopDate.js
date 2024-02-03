import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import moment from "moment-jalaali";
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Slide,
  Typography,
  Select,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DesktopDate({ open, setOpen, setData, setToggleLabel }) {
  const theme = useTheme();
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("01");
  const [fullDate, setFullDate] = useState("");
  const [engOrPerDate, setEngOrPerDate] = useState("per");

  const years = [...Array(1402 - 1278).keys()].map((i) => i + 1278);
  const expireDate = [...Array(2040 - 2023).keys()].map((i) => i + 2023);

  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ]; // array of months
  const days = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
  ]; // array of days

  const yearsEng = [...Array(2030 - 1920).keys()].map((i) => i + 1920);

  const monthsEng = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]; // array of months
  const daysEng = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
  ]; // array of days

  const handleClose = () => {
    setOpen(false);
  };

  function convertPersianToEnglish(persianDate) {
    console.log(moment(persianDate, "jYYYY-jMM-jDD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"));
    return moment(persianDate, "jYYYY-jMM-jDD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
  }

  function convertEnglishToPersian(englishDate) {
    return moment(englishDate, "YYYY/MM/DD").format("jYYYY-jMM-jDD HH:mm:ss");
  }

  const handleChangeDate = ({ fullDate }) => {
    const typeSplit = fullDate.split(" ")[0];
    const dateSplit = fullDate.split(" ")[1];
    if (typeSplit == "eng") {
      let converted = convertPersianToEnglish(dateSplit);
      console.log(converted);
      const split = converted.split(" ")[0];
      const spliDate = split.split("-");
      const year = spliDate[0];
      const month = spliDate[1];
      const day = spliDate[2];
      setSelectedYear(year);
      setSelectedMonth(monthsEng[month - 1]);
      setSelectedDay(day);
    } else if (typeSplit == "per") {
      let converted = convertEnglishToPersian(dateSplit);
      console.log(converted);
      const split = converted.split(" ")[0];
      const spliDate = split.split("-");
      const year = spliDate[0];
      const month = spliDate[1];
      const day = spliDate[2];
      setSelectedYear(year);
      setSelectedMonth(months[month - 1]);
      setSelectedDay(day);
    }
  };

  // useEffect(() => {
  //   setFullDate(
  //     moment(
  //       `${Number(selectedYear)}/${Number(selectedMonth)}/${Number(selectedDay)}`,
  //       "YYYY/MM/DD"
  //     ).format("YYYY-MM-DD HH:mm:ss")
  //   );
  // }, [selectedYear, selectedMonth, selectedDay]);

  // useEffect(() => {
  //   if (open && p.value) {
  //     console.log(p.value);
  //     setSelectedDay(p.value.split(" ")[0].split("-")[2]);

  //     if (years.includes(Number(p.value.split(" ")[0].split("-")[0]))) {
  //       setEngOrPerDate("per");
  //       setSelectedMonth(months[Number(p.value.split(" ")[0].split("-")[1]) - 1]);
  //     } else if (yearsEng.includes(Number(p.value.split(" ")[0].split("-")[0]))) {
  //       setEngOrPerDate("eng");
  //       setSelectedMonth(monthsEng[Number(p.value.split(" ")[0].split("-")[1]) - 1]);
  //     }
  //     setSelectedYear(p.value.split(" ")[0].split("-")[0]);
  //   }
  //   if ((open && !p.value) || (open && p.value == "Invalid date")) {
  //     setSelectedDay(days[0]);
  //     if (engOrPerDate === "eng") {
  //       setSelectedMonth(monthsEng[0]);
  //     } else {
  //       setSelectedMonth(months[0]);
  //     }
  //   }
  // }, [open]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "500px", // Set your width here
          },
        },
      }}
    >
      <Box>
        <DialogContent>
          <Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent={{ xs: "space-between", md: "space-around" }}
              marginBottom="20px"
              marginTop="20px"
            >
              <Typography sx={{ color: "#000", fontSize: "20px", fontWeight: "bold" }}>
                تاریخ تولد
              </Typography>
            </Box>
            {engOrPerDate === "eng" ? (
              <Box display="flex" alignItems="center" gap="20px" mt={6}>
                <FormControl fullWidth className={`input-phone`} sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-label">روز</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="روز"
                    placeholder="روز"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                  >
                    {daysEng.map((item, i) => (
                      <MenuItem key={i} value={item} sx={{ fontFamily: "sans-serif !important" }}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth className={`input-phone`} sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-label">ماه</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="ماه"
                    placeholder="ماه"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    {monthsEng.map((item, i) => (
                      <MenuItem key={i} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth className={`input-phone`} sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-label">سال</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="سال"
                    placeholder="سال"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    {yearsEng.map((item, i) => (
                      <MenuItem key={i} value={item} sx={{ fontFamily: "sans-serif !important" }}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            ) : engOrPerDate === "per" ? (
              <Box display="flex" alignItems="center" gap="20px" mt={6}>
                <FormControl fullWidth className={`input-phone`} sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-label">روز</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="روز"
                    placeholder="روز"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                  >
                    {days.map((item, i) => (
                      <MenuItem key={i} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth className={`input-phone`} sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-label">ماه</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="ماه"
                    placeholder="ماه"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    {months.map((item, i) => (
                      <MenuItem key={i} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth className={`input-phone`} sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-label">سال</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="سال"
                    placeholder="سال"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    {years.map((item, i) => (
                      <MenuItem key={i} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            ) : (
              ""
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>لغو</Button>
          <Button
            type="submit"
            disabled={!selectedYear}
            onClick={() => {
              setData((prev) => ({
                ...prev,
                birthday: moment(
                  `${Number(selectedYear)}/${Number(
                    months.findIndex((item) => item === selectedMonth) + 1
                  )}/${Number(selectedDay)}`,
                  "jYYYY/jM/jD"
                ).format("jYYYY-jMM-jDD"),
              }));
              setOpen(false);
            }}
          >
            تایید
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
