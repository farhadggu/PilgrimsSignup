import { useEffect, useState } from "react";
import RegisterCode from "../components/RegisterCode";
import RegisterPhone from "../components/RegisterPhone";
import TourSelect from "../components/TourSelect";
import Welcome from "../components/Welcome";
import { validateInput } from "../utils/validateForms";
import karbala from "../images/karbala.jpg";
import "./HomePage.css";
import { Container } from "@mui/material";
import SignUpSuccess from "../components/SignUpSuccess";
import StepperForm from "../components/StepperForm";
import Forms from "../components/forms/Forms";
import File from "../components/File";
import AcceptRulesData from "../components/AcceptRulesData";
import { Box } from "@mui/system";
import Description from "../components/Description";
import Questions from "../components/Questions";
import axios from "axios";
import SocialPlatforms from "../components/SocialPlatforms";
import RegisterPassword from "../components/RegisterPassword";

export default function HomePage() {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [token, setToken] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [toggle, setToggle] = useState("");
  const [allProvinceCityData, setAllProvinceCityData] = useState();
  const [images, setImages] = useState([]);
  const [relation, setRelation] = useState("");
  const [province, setProvince] = useState();
  const [allCity, setAllCity] = useState();
  const [updateOrInsert, setUpdateOrInsert] = useState(false);
  const [idUpdate, setIdUpdate] = useState("");
  const [lotteryDay, setLotteryDay] = useState(false);
  const [canSignUp, setCanSignUp] = useState(true);
  const [loadingLottery, setLoadingLottery] = useState(false);
  const [passwordStep, setPasswordStep] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const [social, setSocial] = useState(false);
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [disableAnswer, setDisableAnswer] = useState(false);

  const [data, setData] = useState({
    phone: "",
    name: "",
    birthday: "",
    lastname: "",
    gender: "",
    national_code: "",
    passengers_count: 0,
    passengers_relationship: "",
    pilgrims: "",
    passport: "",
    province_id: "",
    city_id: "",
    village: "",
    preparation_for_travel: null,
    travel_preparation_time: "",
    description: "",
    other: false,
    other_name: "",
    other_lastname: "",
    other_phone: "",
    other_socialـposition: "",
    other_city: "",
    other_relationship: "",
    files_url: [],
    origin_location: "",
    tor_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(validateInput({ name, value }));
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_BASEURL}/api/v1/province`,
      method: "get",
      data: null,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => {
        setAllProvinceCityData(resp.data.data);
        setProvince(
          resp.data.data.map((item) => {
            return { id: item.id, province: item.province_name_fa };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const searchCity = () => {
    return allProvinceCityData
      ?.filter((item) => item.id === data.province_id)
      .map((item) => setAllCity(item.cities));
  };

  useEffect(() => {
    searchCity();
    if (active === 5) {
      searchCity();
    }
  }, [data.province_id, active]);

  console.log(active);
  console.log(social);

  const componentLists = [
    <Welcome setActive={setActive} />,
    <RegisterPhone
      setActive={setActive}
      handleChange={handleChange}
      data={data}
      loading={loading}
      setLoading={setLoading}
      error={error}
      setPasswordStep={setPasswordStep}
    />,
    <RegisterCode
      setActive={setActive}
      handleChange={handleChange}
      data={data}
      setData={setData}
      loading={loading}
      setLoading={setLoading}
      error={error}
      setToken={setToken}
      setActiveStep={setActiveStep}
      setUpdateOrInsert={setUpdateOrInsert}
      setIdUpdate={setIdUpdate}
      setCanSignUp={setCanSignUp}
      setPasswordStep={setPasswordStep}
      setSocial={setSocial}
    />,
    (passwordStep || passwordStep === "passowrd" || passwordStep === "pass") && (
      <RegisterPassword
        active={active}
        setActive={setActive}
        error={error}
        loading={loading}
        token={token}
        passwordStep={passwordStep}
        setPasswordStep={setPasswordStep}
        phone={data.phone}
        setToken={setToken}
        setData={setData}
        setIdUpdate={setIdUpdate}
        setUpdateOrInsert={setUpdateOrInsert}
        setForgotPass={setForgotPass}
        forgotPass={forgotPass}
        setSocial={setSocial}
        setActiveStep={setActiveStep}
        setLoading={setLoading}
        social={social}
        setCanSignUp={setCanSignUp}
        canSignUp={canSignUp}
      />
    ),

    <SocialPlatforms
      setActive={setActive}
      handleChange={handleChange}
      data={data}
      setData={setData}
      loading={loading}
      social={social}
      token={token}
    />,
    <Questions
      canSignUp={canSignUp}
      setActive={setActive}
      token={token}
      setActiveStep={setActiveStep}
      setQuestion={setQuestion}
      question={question}
      setAnswer={setAnswer}
      answer={answer}
      disableAnswer={disableAnswer}
      setDisableAnswer={setDisableAnswer}
    />,

    <TourSelect
      setActive={setActive}
      handleChange={handleChange}
      data={data}
      setData={setData}
      error={error}
      token={token}
      setLoading={setLoading}
      loading={loading}
      toggle={toggle}
      setToggle={setToggle}
      setActiveStep={setActiveStep}
    />,
    <Forms
      active={active}
      setActive={setActive}
      data={data}
      setData={setData}
      error={error}
      token={token}
      handleChange={handleChange}
      setLoading={setLoading}
      loading={loading}
      toggle={toggle}
      setActiveStep={setActiveStep}
      allProvinceCityData={allProvinceCityData}
      setAllProvinceCityData={setAllProvinceCityData}
      relation={relation}
      setRelation={setRelation}
      province={province}
      allCity={allCity}
      searchCity={searchCity}
    />,
    <Description
      data={data}
      toggle={toggle}
      handleChange={handleChange}
      setActive={setActive}
      setActiveStep={setActiveStep}
      allProvinceCityData={allProvinceCityData}
      token={token}
      setData={setData}
      images={images}
      setImages={setImages}
    />,
    // <File
    //   data={data}
    //   toggle={toggle}
    //   handleChange={handleChange}
    //   setActive={setActive}
    //   setActiveStep={setActiveStep}
    //   allProvinceCityData={allProvinceCityData}
    //   token={token}
    //   setData={setData}
    //   images={images}
    //   setImages={setImages}
    // />,
    <AcceptRulesData
      data={data}
      toggle={toggle}
      setActive={setActive}
      setActiveStep={setActiveStep}
      allProvinceCityData={allProvinceCityData}
      images={images}
      setImages={setImages}
      setData={setData}
      token={token}
      updateOrInsert={updateOrInsert}
      setUpdateOrInsert={setUpdateOrInsert}
      idUpdate={idUpdate}
      question={question}
      answer={answer}
      setDisableAnswer={setDisableAnswer}
      setLoading={setLoading}
    />,
    <SignUpSuccess setActive={setActive} token={token} />,
  ];

  const getLottryDate = async () => {
    setLoadingLottery(true);
    await axios({
      url: `${process.env.REACT_APP_BASEURL}/api/v1/lottery-day`,
      method: "get",
      data: null,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => {
        if (parseInt(resp.data.data.day.slice(-2), 10) === new Date().getDate()) {
          setLotteryDay(true);
        } else {
          setLotteryDay(false);
        }
        setLoadingLottery(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getLottryDate();
  }, []);

  return (
    <Container maxWidth="lg" className="home-box">
      <img src={karbala} alt="karbala" />
      <Box className="welcome-box" style={{ width: "calc(100% - 100px)" }}>
        {lotteryDay ? (
          <div className="welcome-page">
            <h4 style={{ textAlign: "center" }}>
              در حال حاضر امکان ثبت نام وجود ندارد لطفا در روز ها آتی مراجعه نمایید .
            </h4>
          </div>
        ) : loadingLottery ? (
          <Box className="welcome-page">
            <div className="content" style={{ width: "100%" }}></div>
          </Box>
        ) : (
          <>
            <Box className="welcome-page-stepper">
              {active > 0 && <StepperForm activeStep={activeStep} toggle={toggle} />}
            </Box>
            <Box className="welcome-page">{componentLists[active]}</Box>
          </>
        )}
      </Box>
    </Container>
  );
}
