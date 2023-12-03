import axios from "axios";
import { useEffect, useState } from "react";
import "./Forms.css";
import FormsMe from "./FormsMe";
import FormsOther from "./FormsOther";
import { baseUrl } from "../../utils/services";

export default function Forms({
  toggle,
  data,
  handleChange,
  error,
  setData,
  token,
  setActive,
  loading,
  setLoading,
  setActiveStep,
  allProvinceCityData,
  setAllProvinceCityData,
  active,
  relation,
  setRelation,
  province,
  allCity,
  searchCity,
}) {
  // const handleChangeCity = (e) => {
  //   setData({ ...data, [e.target.name]: e.target.value });
  // }

  if (toggle === "forMe") {
    return (
      <FormsMe
        error={error}
        data={data}
        handleChange={handleChange}
        setData={setData}
        searchCity={searchCity}
        province={province}
        allCity={allCity}
        token={token}
        setActive={setActive}
        setLoading={setLoading}
        loading={loading}
        setActiveStep={setActiveStep}
      />
    );
  } else if (toggle === "forOthers") {
    return (
      <FormsOther
        error={error}
        data={data}
        handleChange={handleChange}
        setData={setData}
        searchCity={searchCity}
        province={province}
        allCity={allCity}
        token={token}
        setActive={setActive}
        setLoading={setLoading}
        loading={loading}
        setActiveStep={setActiveStep}
        relation={relation}
        setRelation={setRelation}
      />
    );
  }
}
