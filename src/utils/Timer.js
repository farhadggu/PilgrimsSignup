import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Timer({ phone, forget }) {
  console.log(forget)
  const [remaining, setRemaining] = useState(180);

  const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))

  const handlePhoneRegister = async (e) => {
    e.preventDefault();
    toast.info("کد اعتبار سنجی ارسال شد.")
    if (forget) {
      // setActive((prev) => prev + 1)
      await axios
        .post(
          `${process.env.REACT_APP_BASEURL}/api/v1/forgot-password`,
          { phone: p2e(forget) },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((resp) => {
        })
        .catch((error) => {
        });
    } else {

      await axios
        .post(
          `${process.env.REACT_APP_BASEURL}/api/v1/login`,
          { phone: p2e(phone) },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((resp) => {
          // toast.success(resp.data.message);
        })
        .catch((error) => {
          // toast.error(error.response.data.message);
        });


    }
    setRemaining(180)
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setRemaining(prevRemaining => prevRemaining - 1);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [remaining]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  if (remaining >= 0) {
    return <p style={{ color: "#aaa", marginTop: "10px" }}>{formatTime(remaining)}</p>;
  } else {
    return <p style={{ color: "#aaa", marginTop: "10px", cursor: "pointer" }} onClick={handlePhoneRegister}>درخواست مجدد کد</p>
  }
}

export default Timer;
