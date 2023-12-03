import { ArrowBackOutlined } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import "./Welcome.css";

export default function Welcome({ setActive }) {
  const downloadHandler = () => {
    fetch("SamplePDF.pdf").then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "SamplePDF.pdf";
        alink.click();
      });
    });
  };

  return (
    <>
      <Box md={12} className="intro-welcome">
        <Typography
          sx={{ fontSize: "32px", fontWeight: "700", margin: "10px 0 20px" }}
          fontSize={28}
        >
           ثبت ‌نام در قرعه کشی کربلا
        </Typography>
        <ul>
          <li>
            <Typography
              component="p"
              sx={{
                fontSize: "16px",
                lineHeight: "2",
                textAlign: "justify",
                marginBottom: "30px",
              }}
            >
              اگر به هر دلیلی تا به حال به زیارت حرم ائمه اطهار نرفته اید و یا
              مشتاق زیارت دوباره ی بارگاه مطهر این عزیزان هستید میتوانید در این
              طرح ثبت نام کنید.
            </Typography>
          </li>
          <li>
            <Typography
              sx={{
                fontSize: "16px",
                lineHeight: "2",
                textAlign: "justify",
                marginBottom: "30px",
                fontWeight: "bold",
              }}
            >
              توجه داشته باشید برای کسانی که تا به حال ( و یا در 5
              سال اخیر ) توفیق زیارت ائمه هدی را نداشته اند ظرفیت قرعه کشی جداگانه ای وجود دارد .
            </Typography>
          </li>
          <li>
            <Typography
              sx={{
                fontSize: "16px",
                lineHeight: "2",
                textAlign: "justify",
                marginBottom: "30px",
              }}
            >
              خداوند منان را شاکریم که ما را وسیله‌ای ساخت تا امید کسانی که
              امیدوار به زیارت حرم اهل بیت بوده اند را زنده نگه داریم.
            </Typography>
          </li>
        </ul>
      </Box>
      <Button
        onClick={() => setActive((prev) => prev + 1)}
        endIcon={<ArrowBackOutlined />}
      >
        ثبت نام
      </Button>
    </>
  );
}
