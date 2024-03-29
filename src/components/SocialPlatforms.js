import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./SocialPlatforms.module.css";
import axios from "axios";

export default function SocialPlatforms({
  setActive,
  handleChange,
  data,
  setData,
  loading,
  social,
  token,
}) {
  const [personName, setPersonName] = useState([]);
  const [singleSocial, setSingleSocial] = useState([]);
  const [socialLists, setSocialLists] = useState({
    // name: {
    //   "روبیکا": "rubika",
    //   "بله": "bale",
    //   "ایتا": "eitaa",
    //   "سروش": "sorosh",
    //   "آی گپ": "igap",
    //   "اینستاگرام": "instagram",
    //   "تلگرام": "telegram",
    //   "واتساپ": "whatsapp",
    // },

    socials: [
      {
        title: "روبیکا",
        status: false,
      },
      {
        title: "بله",
        status: false,
      },
      {
        title: "ایتا",
        status: false,
      },
      {
        title: "سروش",
        status: false,
      },
      {
        title: "اینستاگرام",
        status: false,
      },
      {
        title: "تلگرام",
        status: false,
      },
      {
        title: "واتساپ",
        status: false,
      },
      {
        title: "آی گپ",
        status: false,
      },
    ],
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = [
    { name: "ایتا", img: "social/eitaa.png", value: "eitaa" },
    { name: "بله", img: "social/bale.png", value: "bale" },
    { name: "روبیکا", img: "social/rubika.png", value: "rubika" },
    { name: "سروش", img: "social/sorush.jpg", value: "sorosh" },
    { name: "آی گپ", img: "social/Igap.png", value: "igap" },
    { name: "اینستاگرام", img: "social/insta.png", value: "instagram" },
    { name: "تلگرام", img: "social/telegram.jpg", value: "telegram" },
    { name: "واتساپ", img: "social/whatsapp.jpg", value: "whatsapp" },
  ];

  console.log(personName);
  console.log(singleSocial);
  console.log(socialLists);
  console.log("social aaaa");

  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    const persianNames = value.map((selectedValue) => {
      const matchingEntry = names.find(
        (entry) => entry.value === selectedValue
      );
      return matchingEntry ? matchingEntry.name : selectedValue;
    });

    setPersonName(
      typeof persianNames === "string" ? persianNames.split(",") : persianNames
    );

    const updatedData = socialLists
    console.log(updatedData)
    value.forEach((item) => {
      updatedData.socials.map((el, index) => {

        if (el.title === item) {
          updatedData.socials[index].status = true;
        }
      });
    });

    setSocialLists(updatedData);
  };

  const handleSubmitSocial = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BASEURL}/api/v1/user-socials`,
        {
          ...socialLists,
          find_from: singleSocial,
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
        setActive((prev) => prev + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.socialPage}>
      <div className={styles.headerSocialPage}>
        <h3>شبکه های اجتماعی</h3>
      </div>
      <div className={styles.platformFields}>
        <div>
          <p>در کدام شبکه های اجتماعی حضور دارید؟</p>
          <FormControl
            fullWidth
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
          >
            <InputLabel id="demo-multiple-checkbox-label">
              شبکه های اجتماعی
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={personName}
              onChange={handleChangeSelect}
              input={<OutlinedInput label="شبکه های اجتماعی" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name.value} value={name.name}>
                  <Checkbox checked={personName.indexOf(name.name) > -1} />
                  <ListItemText primary={name.name} />
                  <img style={{ width: "30px" }} src={name.img} alt="images" />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div>
          <p>از کدام شبکه اجتماعی با ما آشنا شدید؟</p>
          <FormControl
            fullWidth
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
          >
            <InputLabel id="demo-simple-select-label">شبکه اجتماعی</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={singleSocial}
              label="شبکه اجتماعی"
              onChange={(e) => setSingleSocial(e.target.value)}
            >
              {names.map((item) => (
                <MenuItem
                  value={item.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {item.name}{" "}
                  <img
                    style={{
                      width: "30px",
                      height: "30px",
                      display: "flex !important",
                    }}
                    src={item.img}
                    alt="images"
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <Button
          onClick={() => handleSubmitSocial()}
          className={styles.submitButton}
          sx={{
            padding: "10px 30px",
            margin: "20px auto",
          }}
          disabled={singleSocial.length === 0 && personName.length === 0}
        >
          ادامه
        </Button>
      </div>
    </div>
  );
}
