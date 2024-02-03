import { Box } from "@mui/system";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { toast } from "react-toastify";
import pdf from "../images/pdf.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AcceptRulesData({
  data,
  toggle,
  setActive,
  allProvinceCityData,
  setActiveStep,
  images,
  setData,
  token,
  updateOrInsert,
  setUpdateOrInsert,
  idUpdate,
  question,
  answer,
  setDisableAnswer,
  setLoading,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  let base64Images = [];

  useEffect(() => {
    allProvinceCityData.filter((items) => {
      if (items.id === data.province_id) {
        setProvince(items.province_name_fa);
        items.cities.map((item) => {
          if (item.id === data.city_id) {
            setCity(item.name_fa);
          }
        });
      }
    });
  }, [data.city_id, data.province_id, allProvinceCityData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (toggle == "forOthers") {
      setData({ ...data, other: true });
    }

    await images.map(async (item) => {
      return await axios
        .post(
          `${process.env.REACT_APP_BASEURL}/api/v1/upload`,
          { file: item.base64 },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((resp) => {
          // base64Images.push(resp.data.data.file_path);
          data.files_url.push(resp.data.data.file_path);
          console.log(base64Images);
          console.log(data.files_url);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    });
    setTimeout(() => {
      updateOrInsert
        ? axios
          .post(
            `${process.env.REACT_APP_BASEURL}/api/v1/question-answer`,
            {
              question_id: question.id,
              answer: question.final_answer === answer ? 1 : 0,
              user_answer: answer === "answer_1" ? 1 : answer === "answer_2" ? 2 : answer === "answer_3" ? 3 : answer === "answer_4" ? 4 : ""
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then(async (resp) => {
            setDisableAnswer(true);
            await axios
              .put(
                `${process.env.REACT_APP_BASEURL}/api/v1/toor/${idUpdate}`,
                data,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                }
              )
              .then(async (resp) => {
                toast.success(resp.data.message);
                setLoading(false);
                setIsLoading(false);
                setActive((prev) => prev + 1);
                setActiveStep((prev) => prev + 1);
              })
              .catch((error) => {
                setLoading(false);
                setIsLoading(false);
                console.log(error);
                toast.error(error.response.data.message);
              });
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
            setIsLoading(false);
          })
        : axios
          .post(
            `${process.env.REACT_APP_BASEURL}/api/v1/question-answer`,
            {
              question_id: question.id,
              answer: question.final_answer === answer ? 1 : 0,
              user_answer: answer === "answer_1" ? 1 : answer === "answer_2" ? 2 : answer === "answer_3" ? 3 : answer === "answer_4" ? 4 : ""
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then(async (resp) => {
            setDisableAnswer(true);
            await axios
              .post(`${process.env.REACT_APP_BASEURL}/api/v1/toor`, data, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              })
              .then(async (resp) => {
                toast.success(resp.data.message);
                setActive((prev) => prev + 1);
                setActiveStep((prev) => prev + 1);
                setLoading(false);
                setIsLoading(false);
              })
              .catch((error) => {
                setLoading(false);
                setIsLoading(false);
                console.log(error);
                toast.error(error.response.data.message);
              });
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
          });
    }, 1000);
  };

  return (
    <>
      <Box p={3}>
        <Typography fontSize={18} fontWeight="600" mb={2}>
          تایید اطلاعات وارد شده به معنای پذیرش قوانین و مقررات گروه زیارتی آمنین است.
        </Typography>

        <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <li>
            <Typography textAlign="justify">
              در صورتی که باتوجه به تحقیقات به عمل آمده محرز شود هرکدام از شرکت
              کنندگان با اطلاعات غلط و غیر واقعی ثبت نام نموده اند از روند
              قرعه‌کشی حذف خواهند شد و اگر از برندگان قرعه کشی باشند جایگزین
              آنها در هفته ی بعد قرعه کشی خواهد شد .
            </Typography>
          </li>

          <li>
            <Typography sx={{ textAlign: "justify !important" }}>
              حرکت کاروان ها از مبدا تهران و کرج خواهد بود و زائر باید برای
              عزیمت به عتبات و عالیات در یکی از این دو مبدا حاضر شود .
            </Typography>
          </li>

          <li>
            <Typography textAlign="justify">
              لطفا در صورتی که گذر نامه (پاسپورت) ندارید و یا از اعتبار گذر نامه
              ی شما کمتر از شش ماه مانده است از ثبت نام خودداری فرمایید . (مسافر
              برای عبور از مرز باید گذر نامه ای با اعتبار بیش از شش ماه داشته
              باشد. )
            </Typography>
          </li>
        </ul>

        <Button
          sx={{ margin: "0 auto", width: "100%", mt: "20px" }}
          onClick={() => setOpenInfo(true)}
        >
          مشاهده و تایید اطلاعات وارد شده
        </Button>
      </Box>
      <Dialog
        open={openInfo}
        onClose={() => setOpenInfo(false)}
        TransitionComponent={Transition}
        keepMounted
      >
        {toggle === "forOthers" && (
          <>
            <DialogTitle
              sx={{
                borderBottom: "1px solid #ccc",
                color: "#054A27",
                fontSize: "18px",
              }}
            >
              {"مشاهده اطلاعات معرفی کننده"}
            </DialogTitle>
            <DialogContent sx={{ marginTop: "20px", height: "550px" }}>
              <Grid container rowGap={4}>
                <Grid
                  md={6}
                  sm={12}
                  xs={12}
                  item
                  display="flex"
                  alignItems="center"
                  gap="10px"
                >
                  <Typography fontWeight="700"> نام و نام خانوادگی:</Typography>
                  <Typography>
                    {data.other_name} {data.other_lastname}
                  </Typography>
                </Grid>

                <Grid
                  md={6}
                  sm={12}
                  xs={12}
                  item
                  display="flex"
                  alignItems="center"
                  gap="10px"
                >
                  <Typography fontWeight="700"> شماره تماس:</Typography>
                  <Typography>{data.other_phone}</Typography>
                </Grid>

                <Grid
                  md={6}
                  sm={12}
                  xs={12}
                  item
                  display="flex"
                  alignItems="center"
                  gap="10px"
                >
                  <Typography fontWeight="700"> شهر :</Typography>
                  <Typography>{data.other_city}</Typography>
                </Grid>

                <Grid
                  md={6}
                  sm={12}
                  xs={12}
                  item
                  display="flex"
                  alignItems="center"
                  gap="10px"
                >
                  <Typography fontWeight="700"> موقعیت اجتماعی :</Typography>
                  <Typography>{data.other_socialـposition}</Typography>
                </Grid>

                <Grid
                  md={6}
                  sm={12}
                  item
                  display="flex"
                  alignItems="center"
                  gap="10px"
                >
                  <Typography fontWeight="700"> نسبت:</Typography>
                  <Typography>{data.other_relationship}</Typography>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
        <DialogTitle
          sx={{
            borderTop: "1px solid #ccc",
            borderBottom: "1px solid #ccc",
            color: "#054A27",
            fontSize: "18px",
          }}
        >
          {"مشاهده اطلاعات مسافر"}
        </DialogTitle>
        <DialogContent sx={{ marginTop: "20px" }}>
          <Grid container rowGap={4}>
            <Grid
              md={6}
              sm={6}
              xs={12}
              item
              display="flex"
              alignItems="center"
              gap="10px"
            >
              <Typography fontWeight="700">نام و نام خانوادگی:</Typography>
              <Typography>
                {data.name} {data.lastname}
              </Typography>
            </Grid>

            <Grid
              md={6}
              sm={6}
              xs={12}
              item
              display="flex"
              alignItems="center"
              gap="10px"
            >
              <Typography fontWeight="700">جنسیت:</Typography>
              <Typography>{data.gender}</Typography>
            </Grid>

            <Grid
              md={6}
              sm={6}
              xs={12}
              item
              display="flex"
              alignItems="center"
              gap="10px"
            >
              <Typography fontWeight="700">تلفن همراه:</Typography>
              <Typography>{data.phone}</Typography>
            </Grid>

            {data.passengers_count != 0 && (
              <Grid
                md={6}
                sm={6}
                xs={12}
                item
                display="flex"
                alignItems="center"
                gap="10px"
              >
                {/* <Typography fontWeight="700">نسبت نفرات همراه:</Typography> */}
                <Typography>{data.passengers_relationship}</Typography>
              </Grid>
            )}

            <Grid
              md={6}
              sm={12}
              xs={12}
              item
              display="flex"
              alignItems="center"
              gap="10px"
            >
              <Typography fontWeight="700">پاسپورت:</Typography>
              <Typography>{data.passport ? "دارم" : "ندارم"}</Typography>
            </Grid>

            <Grid
              md={12}
              sm={12}
              xs={12}
              item
              display="flex"
              alignItems="center"
              gap="10px"
            >
              <Typography fontWeight="700">وضعیت شما:</Typography>
              <Typography>
                {data.pilgrims
                  ? "در 5 سال اخیر به زیارت کربلا رفتم ."
                  : "در 5 سال اخیر به زیارت کربلا نرفتم ."}
              </Typography>
            </Grid>

            <Grid
              md={4}
              sm={6}
              xs={12}
              item
              display="flex"
              alignItems="center"
              gap="10px"
            >
              <Typography fontWeight="700">استان:</Typography>
              <Typography>{province}</Typography>
            </Grid>

            <Grid
              md={4}
              sm={6}
              xs={12}
              item
              display="flex"
              alignItems="center"
              gap="10px"
            >
              <Typography fontWeight="700">شهر:</Typography>
              <Typography>{city}</Typography>
            </Grid>

            <Grid
              md={4}
              sm={6}
              xs={12}
              item
              display="flex"
              alignItems="center"
              gap="10px"
            >
              <Typography fontWeight="700">روستا:</Typography>
              <Typography>{data.village}</Typography>
            </Grid>

            <Grid
              md={12}
              sm={12}
              xs={12}
              item
              display="flex"
              alignItems="center"
              gap="10px"
            >
              <Typography fontWeight="700">مبدا انتخاب شده:</Typography>
              <Typography>{data.origin_location}</Typography>
            </Grid>

            {/* <Grid
              md={6}
              sm={6}
              xs={12}
              item
              display="flex"
              flexWrap="wrap"
              alignItems="center"
              gap="10px"
            >
              <Typography fontWeight="700"> در هر زمان آمادگی سفر:</Typography>
              <Typography component={"span"}>
                {data.preparation_for_travel ? "دارم" : "ندارم"}
              </Typography>
              {!data.preparation_for_travel && (
                <Typography
                  sx={{ display: "flex", gap: "8px" }}
                  fontWeight="700"
                  component={"span"}
                >
                  زمان مناسب شما:{" "}
                  <Typography component={"span"}>
                    {data.travel_preparation_time}
                  </Typography>
                </Typography>
              )}
            </Grid> */}

            <Grid
              md={12}
              sm={12}
              item
              display="flex"
              alignItems="center"
              gap="10px"
            >
              <Typography component={"span"} fontWeight="700">
                توضیحات:
              </Typography>
              {data.description ? (
                <Typography component={"span"}>{data.description}</Typography>
              ) : (
                <Typography component={"span"}>بدون توضیحات</Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-around",
            borderTop: "1px solid #ccc",
          }}
        >
          {isLoading ? (
            <LoadingButton
              loading
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
            >
              صبور باشید...
            </LoadingButton>
          ) : (
            <Button
              onClick={(e) => {
                handleSubmit(e);
              }}
              sx={{ color: "#054A27" }}
            >
              تایید نهایی
            </Button>
          )}

          <Button
            onClick={() => {
              setOpenInfo(false);
              setActive((prev) => prev - 2);
              setActiveStep((prev) => prev - 1);
              setData({ ...data, other: false });
            }}
            sx={{ color: "#054A27" }}
          >
            ویرایش اطلاعات
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
