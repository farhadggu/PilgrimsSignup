import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../utils/services";
import "./RegisterPhone.css";

export default function RegisterPhone({
  data,
  handleChange,
  loading,
  setLoading,
  setActive,
  error,
  setPasswordStep
}) {
  const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
  const handlePhoneRegister = async (e) => {
    e.preventDefault();
    // setActive((prev) => prev + 1)
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BASEURL}/api/v1/login`,
        { phone: p2e(data.phone) },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        setLoading(false);
        // toast.success(resp.data.message);
        setActive((prev) => prev + 1);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.data.message.includes("password")) {
          setPasswordStep("password")
          setActive((prev) => prev + 2)
        } else if (error.response.data.message.includes("Repeated")) {
          toast.error("کد اعتبار سنجی قبلا برای شما ارسال شده دقایقی دیگر تست کنید");
          setActive((prev) => prev + 1)
        } else {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <Box
      className="phone-card"
      component="form"
      onSubmit={(e) => handlePhoneRegister(e)}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography m={4} fontSize={26} fontWeight="600">
          ثبت نام
        </Typography>
        <Typography mb={4} fontSize={20}>
          شماره تلفن خود را وارد کنید
        </Typography>
      </Box>
      <TextField
        required
        label="شماره تماس"
        placeholder="شماره تماس"
        type="tel"
        name="phone"
        value={data.phone}
        onChange={handleChange}
        className="input-phone"
        helperText={`${error.hasError ? error.error : ""}`}
        sx={{
          width: "100%", "& .MuiInputBase-input": {
            color: "#000",
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused": {
              color: "#054A27",
            },
          },
          "& .MuiOutlinedInput-root": {
            fieldset: {
            },
            "&:hover fieldset": {
              borderColor: "#054A27",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#054A27",
            },
          },
        }}
      />
      <Box m={2} width="100%" display="flex" justifyContent="space-evenly">
        <Button
          type="submit"
          disabled={error.hasError || !data.phone || loading}
        >
          {loading ? "صبر کنید..." : 'تایید'}
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
