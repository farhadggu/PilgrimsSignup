import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../utils/services";
import "./RegisterPhone.css";

export default function RegisterCode({
  data,
  handleChange,
  loading,
  setLoading,
  setActive,
  error,
  setToken,
  setActiveStep,
  setData,
  setUpdateOrInsert,
  setIdUpdate,
  setCanSignUp,
  setPasswordStep,
  setSocial
}) {
  const [code, setCode] = useState("");
  const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))

  const handleChangeCode = (e) => {
    setCode(e.target.value);
  };

  const handleCodeRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    // setActive((prev) => prev + 1);
    // setActiveStep((prev) => prev + 1)
    await axios
      .post(
        `${process.env.REACT_APP_BASEURL}/api/v1/login`,
        { phone: data.phone, otp: p2e(code) },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        if (!resp.data.data.password) {
          setPasswordStep(true)
        }
        if (resp.data.data.canRegister) {
          setCanSignUp(true)
        } else {
          setCanSignUp(false)
        }
        setLoading(false);
        // toast.success(resp.data.message);
        setToken(resp.data.data.token);
        setActive((prev) => prev + 1);
        setActiveStep((prev) => prev + 1);
        if (resp.data.data.tor.phone) {
          setUpdateOrInsert(true);
          setIdUpdate(resp.data.data.tor.id);
          setSocial(resp.data.data.social)
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
            travel_preparation_time:
              resp.data.data.tor?.travel_preparation_time,
            description: resp.data.data.tor?.description,
            files_url: resp.data.data.tor?.files_url,
            origin_location: resp.data.data.tor?.origin_location,
            pilgrims: resp.data.data.tor?.pilgrims
          });
        } else {
          setUpdateOrInsert(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => { }, []);

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
          کد ارسال شده را وارد کنید
        </Typography>
      </Box>
      <TextField
        required
        label="کد تایید"
        placeholder="کد تایید"
        type="text"
        name="code"
        value={code}
        onChange={handleChangeCode}
        className="input-phone"
        helperText={`${error.hasError ? error.error : ""}`}
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
      <Box m={2} width="100%" display="flex" justifyContent="space-around">
        <Button
          onClick={handleCodeRegister}
          disabled={error.hasError || !code || loading}
        >
          {loading ? "صبر کنید..." : "تایید"}
        </Button>
        <Button
          className="back-btn"
          onClick={() => setActive((prev) => prev - 1)}
        >
          بازگشت
        </Button>
      </Box>
    </Box>
  );
}
