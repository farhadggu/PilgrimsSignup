import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import success from "../images/checked.png";
import styles from "./SignUpSuccess.module.css"
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignUpSuccess({token}) {
  const [email, setEmail] = useState("")

  const handleEmail = async () => {
    await axios.post(`${process.env.REACT_APP_BASEURL}/api/v1/update-profile`, {
      email: email,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    }).then((resp) => {
      console.log(resp)
      toast.success("ایمیل شما ثبت شد.")
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <Box padding="20px">
      <img
        style={{
          height: "100px",
          width: "100px",
          margin: "20px auto",
          display: "block",
        }}
        src={success}
        alt="success"
      />
      <Typography variant="h5" fontWeight="600" textAlign="center">
        ثبت نام شما با موفقیت انجام شد
      </Typography>
      <div className={styles.socialLists}>
        <Typography>برای آگاهی از اخبار قرعه کشی صفحات ما را در شبکه های اجتماعی دنبال کنید.</Typography>
        <div className={styles.socialIcons}>
          <a href="https://ble.ir/Nahalgasht">
            <img style={{ width: "40px", height: "40px" }} src="karbala-gift/social/bale.png" alt="icons" />
          </a>
          <a href="https://eitaa.com/nahalgasht">
            <img style={{ width: "40px", height: "40px" }} src="karbala-gift/social/eitaa.png" alt="icons" />
          </a>
          <a href="https://www.instagram.com/nahalgasht.ziarati/">
            <img style={{ width: "40px", height: "40px" }} src="karbala-gift/social/insta.png" alt="icons" />
          </a>
          <a href="https://telegram.me/s/nahalgasht?before=9424">
            <img style={{ width: "40px", height: "40px" }} src="karbala-gift/social/telegram.jpg" alt="icons" />
          </a>
        </div>
      </div>
      <div className={styles.emailBox}>
        <p>همین طور اگر مایل هستید لیست شرکت کنندگان قرعه کشی برای شما ارسال شود ایمیل خود را وارد کنید</p>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            width: "100%",
            marginTop: "20px",
            "& .MuiInputBase-input": {
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
          }} fullWidth type="email" id="standard-basic" label="ایمیل شما" variant="standard" />
        <button onClick={handleEmail} className={styles.submitButton}>
          ثبت ایمیل
        </button>
      </div>
      {/* <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={5}
        mt={3}
        className={styles.signupSuccessBtn}
      >
        <Typography
          component="a"
          href="https://nahalgasht.com/tours/iraq/karbala/air/"
          sx={{
            background: "#b83290",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            textDecoration: "none"
          }}
        >
          مشاهده تور های کربلا
        </Typography>
        <Typography
          component="a"
          href="https://nahalgasht.com/"
          sx={{
            background: "#b83290",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            textDecoration: "none"
          }}
        >
          صفحه اصلی سایت
        </Typography>
      </Box> */}
    </Box>
  );
}
