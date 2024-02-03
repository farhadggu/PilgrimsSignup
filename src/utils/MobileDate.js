import React, { useEffect, useRef, useState } from "react";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import "./MobileDate.css";
import moment from "moment-jalaali";

export default function MobileDate({
  p,
  open,
  setOpen,
  index,
  parentIndex,
  parentIndexChild,
  categoryName,
  groupIdIndex,
  handleChange,
  setData,
  setToggleLabel,
}) {

  const [selectedYear, setSelectedYear] = React.useState(null);
  const [selectedMonth, setSelectedMonth] = React.useState(null);
  const [selectedDay, setSelectedDay] = React.useState(null);
  const [fullDate, setFullDate] = useState("");
  const [engOrPerDate, setEngOrPerDate] = useState("per");

  const years = [...Array(1402 - 1278).keys()].map((i) => i + 1278);
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
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31,
  ]; // array of days

  const yearsEng = [...Array(2030 - 1900).keys()].map((i) => i + 1900);
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
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31,
  ]; // array of days
  const mainRef = useRef(null);
  // const main = document.getElementById("year-selector"),
  const sections = document.getElementsByClassName("year-section");
  const mainMonthRef = useRef(null);
  // const mainMonth = document.getElementById("month-selector"),
  const sectionsMonth = document.getElementsByClassName("month-section");
  const mainDayRef = useRef(null);
  // const mainDay = document.getElementById("day-selector"),
  const sectionsDay = document.getElementsByClassName("day-section");

  // Year Selector
  const yearItems =
    engOrPerDate == "eng"
      ? yearsEng.map((year, index) => (
          <li
            className="year-section year-text"
            key={year}
            style={{
              margin: yearsEng.length == index + 1 && "0 0 -21px",
            }}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </li>
        ))
      : engOrPerDate == "per"
      ? years.map((year, index) => (
          <li
            className="year-section"
            key={year}
            style={{
              height: "30px",
              scrollSnapAlign: "start",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              margin: years.length == index + 1 && "0 0 -21px",
            }}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </li>
        ))
      : "";

  // Month Selector
  const monthItems =
    engOrPerDate == "eng"
      ? monthsEng.map((month, index) => (
          <li
            className="month-section"
            key={month}
            style={{
              height: "30px",
              scrollSnapAlign: "start",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              margin: monthsEng.length == index + 1 && "0 0 -21px",
            }}
            onClick={() => setSelectedMonth(month)}
          >
            {month}
          </li>
        ))
      : engOrPerDate == "per"
      ? months.map((month, index) => (
          <li
            className="month-section"
            key={month}
            style={{
              height: "30px",
              scrollSnapAlign: "start",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              margin: months.length == index + 1 && "0 0 -21px",
            }}
            onClick={() => setSelectedMonth(month)}
          >
            {month}
          </li>
        ))
      : "";

  // Day Selector
  const dayItems =
    engOrPerDate == "eng"
      ? daysEng.map((day, index) => (
          <li
            className="day-section day-text"
            key={day}
            style={{
              margin: daysEng.length == index + 1 && "0 0 -21px",
            }}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </li>
        ))
      : engOrPerDate == "per"
      ? days.map((day, index) => (
          <li
            className="day-section"
            key={day}
            style={{
              height: "30px",
              scrollSnapAlign: "start",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              margin: days.length == index + 1 && "0 0 -21px",
            }}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </li>
        ))
      : "";

  const handleYear = ({ diffYear, year }) => {
    console.log(diffYear);
    if (diffYear) {
      console.log("year diff", diffYear);
      setTimeout(() => {
        mainRef.current.scrollTo(0, (Number(diffYear) + 4) * 30);
      }, 200);
    }
    console.log(mainRef.current);
    let pos = mainRef.current.scrollTop;
    for (let i = 0, l = sections.length; i < l; i++) {
      // Since our stap-align is centered, get the position of the middle of the viewport relative to the current section's top (if your snap items are not full-height, it might require using half the viewport's height instead)
      let relativePos = sections[i].offsetTop - pos + sections[i].offsetHeight / 2;
      // Check if the point we found falls within the section
      // console.log(relativePos, sections[i].offsetHeight);
      if (relativePos >= 0 && relativePos < sections[i].offsetHeight) {
        console.log(sections[i + 2]);

        sections[i].focus();
        setSelectedYear(sections[i + 2].textContent);
        break;
      }
    }
  };

  const handleMonth = ({ diffMonth }) => {
    if (diffMonth) {
      console.log("month diff", diffMonth);
      setTimeout(() => {
        mainMonthRef.current.scrollTo(0, (Number(diffMonth) + 3) * 30);
      }, 200);
    }
    let pos = mainMonthRef.current.scrollTop;
    for (let i = 0, l = sectionsMonth.length; i < l; i++) {
      // Since our stap-align is centered, get the position of the middle of the viewport relative to the current section's top (if your snap items are not full-height, it might require using half the viewport's height instead)
      let relativePos = sectionsMonth[i].offsetTop - pos + sectionsMonth[i].offsetHeight / 2;
      // Check if the point we found falls within the section
      if (relativePos >= 0 && relativePos < sectionsMonth[i].offsetHeight) {
        sectionsMonth[i].focus();
        console.log(monthsEng.includes(String(sectionsMonth[i + 2].textContent)));
        if (months.includes(String(sectionsMonth[i + 2].textContent))) {
          setSelectedMonth(
            months.findIndex((item) => item == sectionsMonth[i + 2].textContent) + 1
          );
        } else if (monthsEng.includes(String(sectionsMonth[i + 2].textContent))) {
          setSelectedMonth(
            monthsEng.findIndex((item) => item == sectionsMonth[i + 2].textContent) + 1
          );
        }
        break;
      }
    }
  };

  const handleDay = ({ diffDay }) => {
    if (diffDay) {
      console.log("day diff", diffDay);
      setTimeout(() => {
        mainDayRef.current.scrollTo(0, (Number(diffDay) + 3) * 30);
      }, 200);
    }
    let pos = mainDayRef.current.scrollTop;
    for (let i = 0, l = sectionsDay.length; i < l; i++) {
      // Since our stap-align is centered, get the position of the middle of the viewport relative to the current section's top (if your snap items are not full-height, it might require using half the viewport's height instead)
      let relativePos = sectionsDay[i].offsetTop - pos + sectionsDay[i].offsetHeight / 2;
      // Check if the point we found falls within the section
      if (relativePos >= 0 && relativePos < sectionsDay[i].offsetHeight) {
        sectionsDay[i].focus();
        setSelectedDay(sectionsDay[i + 2].textContent);
        break;
      }
    }
  };

  function convertPersianToEnglish(persianDate) {
    console.log(persianDate);
    return moment(persianDate, "jYYYY-jMM-jDD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
  }

  function convertEnglishToPersian(englishDate) {
    return moment(englishDate, "YYYY-MM-DD HH:mm:ss").format("jYYYY-jM-jD HH:mm:ss");
  }

  const handleScroll = ({ fullDate }) => {
    console.log(fullDate);

    console.log("vared shod", fullDate);
    const typeSplit = fullDate.split(" ")[0];
    const dateSplit = fullDate.split(" ")[1];
    const split = dateSplit.split("-");
    const year = split[0];
    const month = split[1];
    const day = split[2];
    console.log(typeSplit);
    console.log(dateSplit);
    console.log(year);
    console.log(month);
    console.log(day);
    if (typeSplit == "eng") {
      const diffYear = year - yearsEng[0];
      const diffMonth = month;
      const diffDay = day;
      handleYear({ diffYear: diffYear, year: year });
      handleMonth({ diffMonth: diffMonth });
      handleDay({ diffDay: diffDay });
    } else if (typeSplit == "per") {
      const diffYear = year - years[0];
      const diffMonth = month;
      const diffDay = day;
      handleYear({ diffYear: diffYear });
      handleMonth({ diffMonth: diffMonth });
      handleDay({ diffDay: diffDay });
    }
  };

  // useEffect(() => {
  //   if (p.value && open) {
  //     let typeDate = "";
  //     console.log(yearsEng.includes(p.value.split(" ")[0].split("-")[0]));
  //     console.log(p.value.split(" ")[0].split("-")[0]);
  //     if (years.includes(Number(p.value.split(" ")[0].split("-")[0]))) {
  //       typeDate = "per";
  //     } else if (yearsEng.includes(Number(p.value.split(" ")[0].split("-")[0]))) {
  //       typeDate = "eng";
  //     }

  //     let year = p.value.split(" ")[0].split("-")[0];
  //     let month = p.value.split(" ")[0].split("-")[1];
  //     let day = p.value.split(" ")[0].split("-")[2];
  //     if (typeDate == "eng") {
  //       console.log("vared shodam");
  //       setEngOrPerDate("eng");
  //       const diffYear = year - yearsEng[0];
  //       const diffMonth = month;
  //       const diffDay = day;
  //       handleYear({ diffYear: diffYear });
  //       handleMonth({ diffMonth: diffMonth });
  //       handleDay({ diffDay: diffDay });
  //     } else if (typeDate == "per") {
  //       setEngOrPerDate("per");
  //       const diffYear = year - years[0];
  //       const diffMonth = month;
  //       const diffDay = day;
  //       console.log(diffYear);
  //       console.log(diffMonth);
  //       console.log(diffDay);
  //       handleYear({ diffYear: diffYear });
  //       handleMonth({ diffMonth: diffMonth });
  //       handleDay({ diffDay: diffDay });
  //     }
  //   }
  // }, [open]);

  useEffect(() => {
    console.log(selectedYear);
    setFullDate(
      moment(
        `${Number(selectedYear)}/${Number(selectedMonth)}/${Number(selectedDay)}`,
        "YYYY/MM/DD"
      ).format("YYYY-MM-DD")
    );
  }, [selectedYear, selectedMonth, selectedDay]);

  return (
    <>
      {open && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            background: "#072927A1",
            width: "100%",
            height: "100%",
            zIndex: "50",
          }}
          onClick={() => {
            setOpen(false);
            setToggleLabel(false);
          }}
        ></div>
      )}
      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          background: "#fff",
          width: "100%",
          transform: open ? "translate3d(0,0,0)" : "translate3d(0,100%,0)",
          padding: "10px",
          transition: "all ease .3s",
          zIndex: "9999",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          <p style={{ color: "#000", fontSize: "20px", fontWeight: "bold" }}>انتخاب تاریخ</p>
        </div>

        <div
          style={{
            padding: "10px",
            display: "flex",
            justifyContent: { xs: "space-between", md: "center" },
            width: "100%",
            background: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Day Selector */}
          <div style={{ height: "150px" }}>
            <ul ref={mainDayRef} id="day-selector" className="listStyle" onScroll={handleDay}>
              <div className="border-top-active"></div>
              <div className="border-bottom-active"></div>
              <li
                className="day-section"
                style={{
                  height: "30px",
                  scrollSnapAlign: "start",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></li>
              <li
                className="day-section"
                style={{
                  height: "30px",
                  scrollSnapAlign: "start",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></li>
              {dayItems}
            </ul>
          </div>

          {/* Month Selector */}
          <div style={{ height: "150px" }}>
            <ul ref={mainMonthRef} id="month-selector" className="listStyle" onScroll={handleMonth}>
              <div className="border-top-active"></div>
              <div className="border-bottom-active"></div>
              <li
                className="month-section"
                style={{
                  height: "30px",
                  scrollSnapAlign: "start",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></li>
              <li
                className="month-section"
                style={{
                  height: "30px",
                  scrollSnapAlign: "start",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></li>
              {monthItems}
            </ul>
          </div>

          {/* Year Selector */}
          <div style={{ height: "150px" }}>
            <ul ref={mainRef} id="year-selector" className="listStyle" onScroll={handleYear}>
              <div className="border-top-active"></div>
              <div className="border-bottom-active"></div>
              <li
                className="year-section"
                style={{
                  height: "30px",
                  scrollSnapAlign: "start",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></li>
              <li
                className="year-section"
                style={{
                  height: "30px",
                  scrollSnapAlign: "start",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></li>
              {yearItems}
            </ul>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          <button
            style={{
              background: "#D9D9D9 !important",
              color: "#fff",
              border: "none !important",
              padding: "10px 20px",
              width: { xs: "100%", md: "200px" },
            }}
            onClick={() => setOpen(false)}
          >
            انصراف
          </button>
          <button
            style={{
              background: "#D9D9D9 !important",
              color: "#fff",
              border: "none !important",
              padding: "10px 20px",
              width: { xs: "100%", md: "200px" },
            }}
            onClick={() => {
              setData((prev) => ({ ...prev, birthday: fullDate }));
              setOpen(false);
            }}
          >
            تایید
          </button>
        </div>
      </div>
    </>
  );
}
