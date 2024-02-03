import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import "./ChechInformation.css";
import close from "../images/close.png";
import pdf from "../images/pdf.png";

export default function File({
  data,
  handleChange,
  setActive,
  setActiveStep,
  token,
  setData,
  images,
  setImages,
}) {
  const inputRef = useRef();

  const fileToDataUri = (image) => {
    return new Promise((res) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        res({
          image: reader.result,
          base64: reader.result.split(",")[1],
        });
      });
      reader.readAsDataURL(image);
    });
  };

  const uploadImage = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImagesPromises = [];
      for (let i = 0; i < e.target.files.length; i++) {
        newImagesPromises.push(fileToDataUri(e.target.files[i]));
      }
      const newImages = await Promise.all(newImagesPromises);
      setImages([...images, ...newImages]);
    }
    e.target.value = "";
  };

  const removeImage = (id) => {
    setImages(images.filter((item, index) => index !== id));
  };

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
    <Box
      mt={2}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="20px"
    >
      <Typography variant="p" style={{ textAlign: "justify", width: "100%" }}>
        این مرحله و بارگذاری معرفی نامه اجباری نیست ولی وجود آن فرد متقاضی را در
        اولویت بالاتری قرار خواهد گرفت.
      </Typography>
      <Typography sx={{ textAlign: "justify" }}>
        در صورتی که گواهی معرفی نامه یا هر مدرک دیگری دارید در قالب فایل عکس یا
        PDF بارگذاری کنید.
      </Typography>
      <Box display="flex" gap="10px">
        <Button
          sx={{color: "#054A27 !important", backgroundColor: "#fff !important"}}
          onClick={() => inputRef.current.click()}
        >
          بارگذاری مدارک
        </Button>
        <Button
          sx={{color: "#054A27 !important", backgroundColor: "#fff !important"}}
          onClick={downloadHandler}
        >
          نمونه معرفی نامه
        </Button>
      </Box>
      <input
        hidden
        ref={inputRef}
        type="file"
        multiple
        accept="application/pdf, image/png, image/jpeg"
        onChange={uploadImage}
      />
      <Box
        display="flex"
        alignItems="center"
        gap="15px"
        justifyContent="flex-start"
        width="100%"
        p="0 20px"
        mb={4}
        flexWrap="wrap"
      >
        {images.length > 0
          ? images.map((imageObj, i) => {
              if (imageObj.image.includes("application")) {
                return (
                  <Box
                    key={i}
                    boxShadow="10px 10px 100px rgba(0, 0, 0, .4)"
                    borderRadius="10px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    position="relative"
                    padding="15px"
                  >
                    <img
                      style={{ width: "40px", height: "40px" }}
                      src={pdf}
                      alt=""
                    />
                    <Box display="flex" flexDirection="column">
                      <img
                        src={close}
                        onClick={() => removeImage(i)}
                        style={{
                          cursor: "pointer",
                          width: "20px",
                          height: "20px",
                          position: "absolute",
                          top: "0",
                          right: "0",
                        }}
                        alt="delete"
                      />
                    </Box>
                  </Box>
                );
              } else {
                return (
                  <Box
                    key={i}
                    boxShadow="10px 10px 100px rgba(0, 0, 0, .4)"
                    borderRadius="10px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    position="relative"
                    padding="15px"
                  >
                    <img
                      style={{ width: "40px", height: "40px" }}
                      src={imageObj.image}
                      alt=""
                    />
                    <Box display="flex" flexDirection="column">
                      <img
                        src={close}
                        onClick={() => removeImage(i)}
                        style={{
                          cursor: "pointer",
                          width: "20px",
                          height: "20px",
                          position: "absolute",
                          top: "0",
                          right: "0",
                        }}
                        alt="delete"
                      />
                    </Box>
                  </Box>
                );
              }
            })
          : null}
      </Box>

      <Box display="flex" gap={2}>
        <Button
          onClick={() => {
            setActive((prev) => prev + 1);
            setActiveStep((prev) => prev + 1);
          }}
        >
          تایید
        </Button>

        <Button
          onClick={() => {
            setActive((prev) => prev - 1);
          }}
        >
          بازگشت
        </Button>
      </Box>
    </Box>
  );
}
