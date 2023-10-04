import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import karbala from "../images/karbala.jpg";
import styles from "./LotterySignupPage.module.css";
import axios from "axios";

export default function LotterySignupPage({ token }) {
  const [signups, setSignups] = useState([]);
  const [allSignups, setAllSignups] = useState([]);

  const getUsersSignups = async () => {
    await axios({
      url: `${process.env.REACT_APP_BASEURL}/api/v1/lottery-players`,
      method: "get",
      data: null,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => {
        setSignups(resp.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUsersSignups();
  }, []);

  const getAllUsersSignups = async () => {
    await axios({
      url: `${process.env.REACT_APP_BASEURL}/api/v1/lottery-players-all`,
      method: "get",
      data: null,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => {
        setAllSignups(resp.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUsersSignups();
    getAllUsersSignups()
  }, []);

  return (
    <Container maxWidth="lg" className="home-box">
      <img src={karbala} alt="karbala" />
      <Box className="welcome-box" style={{ width: "calc(100% - 100px)" }}>
        <Box className="welcome-page">
          <Box md={12} className={styles.lotteryBox}>
            <Typography
              sx={{ fontWeight: "700", margin: "10px 0 30px" }}
              fontSize={20}
            >
              لیست شرکت کننده هایی که پاسخ صحیح داده اند ({signups.length})
            </Typography>
            <table className={styles.tableSignup}>
              <tr>
                <th>ردیف</th>
                <th>شناسه</th>
                <th>نام و نام خانوادگی</th>
                <th>تعداد ثبت نامی</th>
                <th>شماره تماس</th>
              </tr>
              {signups.map((item, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{item.lottery_number}</td>
                  <td>
                    {item.name} {item.lastname}
                  </td>
                  <td>
                    {item.register_count}
                  </td>
                  <td>
                    {item.phone.substring(8) +
                      "***" +
                      item.phone.substring(0, 4)}
                  </td>
                </tr>
              ))}
            </table>
          </Box>

          <Box md={12} className={styles.lotteryBox}>
            <Typography
              sx={{ fontWeight: "700", margin: "10px 0 30px" }}
              fontSize={20}
            >
              لیست تمامی شرکت کننده ها
            </Typography>
            <table className={styles.tableSignup}>
              <tr>
                <th>ردیف</th>
                <th>نام و نام خانوادگی</th>
                <th>تعداد ثبت نامی</th>
                <th>شماره تماس</th>
              </tr>
              {allSignups.map((item, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>
                    {item.name} {item.lastname}
                  </td>
                  <td>
                    {item.register_count}
                  </td>
                  <td>
                    {item.phone.substring(8) +
                      "***" +
                      item.phone.substring(0, 4)}
                  </td>
                </tr>
              ))}
            </table>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
