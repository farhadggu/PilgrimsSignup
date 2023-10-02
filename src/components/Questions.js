import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import "./Questions.css";

export default function Questions({
  setActive,
  token,
  setActiveStep,
  canSignUp,
  setQuestion,
  question,
  setAnswer,
  answer,
  disableAnswer,
  setDisableAnswer
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  console.log("questions aaa");

  const getQuestion = async () => {
    setLoadingPage(true);
    await axios({
      url: `${process.env.REACT_APP_BASEURL}/api/v1/question`,
      method: "get",
      data: null,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        setQuestion(resp.data.data);
        setLoadingPage(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingPage(false);
      });
  };

  const handleAnswer = async () => {
    setDisableAnswer(true);
    // await axios
    //   .post(
    //     `${process.env.REACT_APP_BASEURL}/api/v1/question-answer`,
    //     {
    //       question_id: question.id,
    //       answer: question.final_answer === answer ? 1 : 0,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //       },
    //     }
    //   )
    //   .then((resp) => {
    //     setLoading(false);
    //     setDisableAnswer(true);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // setActive((prev) => prev + 1)
  };

  useEffect(() => {
    getQuestion();
  }, []);
  console.log(canSignUp);
  if (canSignUp) {
    return (
      <div className="questionsPage">
        <h3 className="questionsHeading">به سوال زیر پاسخ دهید</h3>
        <div className="questionsPageContainer">
          {loadingPage ? (
            <>
              <div className="content" style={{ width: "100%" }}></div>
            </>
          ) : (
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                {question.question}
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                row
                onChange={(e) => setAnswer(e.target.value)}
              >
                <FormControlLabel
                  value="answer_1"
                  control={<Radio />}
                  label={question.answer_1}
                  disabled={disableAnswer}
                />
                <FormControlLabel
                  value="answer_2"
                  control={<Radio />}
                  label={question.answer_2}
                  disabled={disableAnswer}
                />
                <FormControlLabel
                  value="answer_3"
                  control={<Radio />}
                  label={question.answer_3}
                  disabled={disableAnswer}
                />
                <FormControlLabel
                  value="answer_4"
                  control={<Radio />}
                  label={question.answer_4}
                  disabled={disableAnswer}
                />
              </RadioGroup>
            </FormControl>
          )}
        </div>
        <div className="questionsButton">
          <button
            style={{ cursor: "pointer", background: loading && "#b83290" }}
            onClick={() => handleAnswer()}
            disabled={answer.length === 0 || disableAnswer}
          >
            {loading ? (
              <img
                src="/loading.svg"
                style={{
                  width: "100%",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                alt="loading"
              />
            ) : (
              <p>ثبت پاسخ</p>
            )}
          </button>
          {disableAnswer && (
            <button
              style={{ cursor: "pointer" }}
              onClick={() => {
                setActive((prev) => prev + 1);
                setActiveStep((prev) => prev + 1);
              }}
            >
              ادامه
            </button>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="questionsPage">
        <p>
          شرکت کننده عزیز سلام شما با این شماره تلفن سوال این هفته قرعه‌کشی را
          به اشتباه پاسخ داده اید و تا هفته ی آینده شرایط شرکت در قرعه‌کشی را
          ندارید . امیدواریم شما برنده ی دور بعدی قرعه‌کشی کربلا باشید .
        </p>
      </div>
    );
  }
}
