import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Timer from "../utils/Timer";

export default function RegisterPassword({
  error,
  setActive,
  loading,
  setLoading,
  token,
  passwordStep,
  phone,
  setToken,
  setData,
  setIdUpdate,
  setUpdateOrInsert,
  setForgotPass,
  forgotPass,
  setSocial,
  setActiveStep,
  setPasswordStep,
  social,
  active,
  setCanSignUp,
  canSignUp,
}) {
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = React.useState(false);
  const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

  const handlePasswordRegister = async () => {
    setLoading(true);
    if (passwordStep === "password") {
      await axios
        .post(
          `${process.env.REACT_APP_BASEURL}/api/v1/login`,
          {
            phone: p2e(phone),
            password: p2e(password),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((resp) => {
          setToken(resp.data.data.token);
          if (resp.data.data.canRegister) {
            setCanSignUp(true);
          } else {
            setCanSignUp(false);
          }
          if (resp.data.data.tor) {
            if (resp.data.data.tor.phone) {
              setUpdateOrInsert(true);
              setIdUpdate(resp.data.data.tor.id);
              setSocial(resp.data.data.social);
              setData({
                phone: resp.data.data.tor?.phone,
                name: resp.data.data.tor?.name,
                lastname: resp.data.data.tor?.lastname,
                gender: resp.data.data.tor?.gender,
                national_code: resp.data.data.tor?.national_code,
                passport: resp.data.data.tor?.passport,
                province_id: resp.data.data.tor?.province_id,
                city_id: resp.data.data.tor?.city_id,
                village: resp.data.data.tor?.village,
                preparation_for_travel: resp.data.data.tor?.preparation_for_travel,
                travel_preparation_time: resp.data.data.tor?.travel_preparation_time,
                description: resp.data.data.tor?.description,
                files_url: resp.data.data.tor?.files_url,
                origin_location: resp.data.data.tor?.origin_location,
                pilgrims: resp.data.data.tor?.pilgrims,
              });
              console.log(resp.data.data.social);
              if (resp.data.data.social) {
                setActive((prev) => prev + 2);
              } else {
                setActive((prev) => prev + 1);
                console.log(active);
              }
              setLoading(false);
            }
          } else {
            setUpdateOrInsert(false);
            setSocial(resp.data.data.social);
            if (resp.data.data.social) {
              setActive((prev) => prev + 2);
            } else {
              setActive((prev) => prev + 1);
            }
            setActiveStep((prev) => prev + 1);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("رمز عبور نادرست می باشد");
          setLoading(false);
        });
    } else {
      await axios
        .post(
          `${process.env.REACT_APP_BASEURL}/api/v1/update-profile`,
          {
            password: p2e(password),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((resp) => {
          console.log(resp);
          if (canSignUp) {
            setCanSignUp(true);
          } else {
            setCanSignUp(false);
          }
          if (social) {
            setActive((prev) => prev + 2);
          } else {
            setActive((prev) => prev + 1);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleForgotPassword = async () => {
    setForgotPass(true);
    await axios
      .post(
        `${process.env.REACT_APP_BASEURL}/api/v1/forgot-password`,
        {
          phone: p2e(phone),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        toast.info("کد اعتبار سنجی برای شما ارسال شد");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleForgotOtpPassword = async () => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BASEURL}/api/v1/forgot-password`,
        {
          phone: p2e(phone),
          otp: p2e(otp),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        if (resp.data.data.tor) {
          if (resp.data.data.tor.phone) {
            setData({
              phone: resp.data.data.tor?.phone,
              name: resp.data.data.tor?.name,
              lastname: resp.data.data.tor?.lastname,
              gender: resp.data.data.tor?.gender,
              national_code: resp.data.data.tor?.national_code,
              passport: resp.data.data.tor?.passport,
              province_id: resp.data.data.tor?.province_id,
              city_id: resp.data.data.tor?.city_id,
              village: resp.data.data.tor?.village,
              preparation_for_travel: resp.data.data.tor?.preparation_for_travel,
              travel_preparation_time: resp.data.data.tor?.travel_preparation_time,
              description: resp.data.data.tor?.description,
              files_url: resp.data.data.tor?.files_url,
              origin_location: resp.data.data.tor?.origin_location,
              pilgrims: resp.data.data.tor?.pilgrims,
            });
          }
        }
        setPasswordStep("pass");
        setForgotPass(false);
        setSocial(resp.data.data.social);
        setToken(resp.data.data.token);
        setLoading(false);
        setCanSignUp(resp.data.data.canRegister);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("کد اعتبار سنجی نادرست میباشد");
      });
  };

  if (forgotPass) {
    return (
      <Box className="phone-card">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p="0 10px"
        >
          <Typography m={4} fontSize={26} fontWeight="600">
            کد اعتبار سنجی
          </Typography>
          <Typography mb={4} fontSize={20}>
            کد اعتبار سنجی را وارد کنید .
          </Typography>
        </Box>
        <TextField
          required
          label="کد اعتبار سنجی"
          placeholder="کد اعتبار سنجی"
          type="text"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="input-phone"
          helperText={`${error.hasError ? error.error : ""}`}
          sx={{
            width: "100%",
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
          inputProps={{
            inputMode: "numeric",
          }}
        />
        <Timer forget={phone} />
        <Box m={2} mt={0} width="100%" display="flex" justifyContent="space-around">
          <Button onClick={handleForgotOtpPassword} disabled={error.hasError || !otp || loading}>
            {loading ? "صبر کنید..." : "تایید"}
          </Button>
          <Button className="back-btn" onClick={() => setActive((prev) => prev - 1)}>
            بازگشت
          </Button>
        </Box>
      </Box>
    );
  } else if (!forgotPass) {
    return (
      <Box className="phone-card">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p="0 10px"
        >
          <Typography m={4} fontSize={26} fontWeight="600">
            رمز عبور
          </Typography>
          <Typography mb={4} fontSize={20}>
            {passwordStep === "password"
              ? "رمز عبور خود را وارد کنید."
              : "برای حساب کاربری خود رمز عبور جدید وارد کنید"}
          </Typography>
        </Box>
        <FormControl
          sx={{
            m: 1,
            width: "25ch",
            ".muirtl-1sdnp8e-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
              color: "#054A27",
            },
          }}
          variant="outlined"
        >
          <InputLabel
            sx={{
              "& label": {
                color: "#054A27 !important",
              },
            }}
            htmlFor="outlined-adornment-password"
          >
            رمز عبور
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              width: "100%",
              "& fieldset": {
                borderColor: "#054A27 !important",
              },

              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#054A27",
              },
              "&.outlinedInputClasses.focused": {
                borderColor: "#054A27",
              },
              "&:hover > .MuiOutlinedInput-notchedOutline": {
                borderColor: "#054A27",
              },
            }}
            helperText={`${error.hasError ? error.error : ""}`}
            className="input-phone"
            endAdornment={
              <InputAdornment position="end">
                <div
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(event) => event.preventDefault()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </div>
              </InputAdornment>
            }
            label="رمز عبور"
            inputProps={{
              inputMode: "numeric",
            }}
          />
        </FormControl>
        <p
          style={{
            marginTop: "20px",
            marginBottom: "-10px",
            color: "#999999",
            cursor: "pointer",
          }}
          onClick={() => handleForgotPassword()}
        >
          فراموشی رمز عبور؟
        </p>
        <Box m={2} width="100%" display="flex" justifyContent="space-around">
          <Button
            onClick={handlePasswordRegister}
            disabled={error.hasError || !password || loading}
          >
            {loading ? "صبر کنید..." : "تایید"}
          </Button>
          <Button className="back-btn" onClick={() => setActive((prev) => prev - 2)}>
            بازگشت
          </Button>
        </Box>
      </Box>
    );
  } else {
  }
}
