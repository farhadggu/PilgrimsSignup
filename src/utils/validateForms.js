export const validateInput = ({ name, value }) => {
  let hasError = false,
    error = "",
    nameError = "";
  switch (name) {
    case "name":
      if (value.trim() === "") {
        hasError = true;
        error = "نام خود را وارد کنید";
        nameError = "name";
      } else if (!/^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s]+$/.test(value)) {
        hasError = true;
        error = "فقط از حروف فارسی استفاده کنید";
        nameError = "name";
      } else {
        hasError = false;
        error = "";
        nameError = "";
      }
      break;

    case "lastname":
      if (value.trim() === "") {
        hasError = true;
        error = "نام خانوادگی خود را وارد کنید";
        nameError = "lastname";
      } else if (!/^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s]+$/.test(value)) {
        hasError = true;
        error = "فقط از حروف فارسی استفاده کنید";
        nameError = "lastname";
      } else {
        hasError = false;
        error = "";
        nameError = "";
      }
      break;

    case "passengers_count":
      if (value.trim() === "") {
        hasError = true;
        error = "تعداد نفرات همراه را وارد کنید";
        nameError = "passengers_count";
      }
      break;

    case "phone":
      if (value.trim() === "") {
        hasError = true;
        error = "شماره تلفن وارد کنید";
        nameError = "phone";
      } else if (!/^(\+98|0098|98|0)?9\d{9}$/.test(value)) {
        hasError = true;
        error = "فرمت شماره تلفن وارد شده نا معتبر می باشد";
        nameError = "phone";
      } else {
        hasError = false;
        error = "";
        nameError = "";
      }
      break;

    case "passengers_detail":
      if (value.trim() === "") {
        hasError = true;
        error = "نسبت نفرات همراه خود را وارد کنید";
        nameError = "passengers_detail";
      } else {
        hasError = false;
        error = "";
        nameError = ""
      }
      break;

    case "ability_to_pay":
      if (value.trim() === "") {
        hasError = true;
        error = "مبلغ قابل پرداخت را وارد کنید";
        nameError = "ability_to_pay"
      } else {
        hasError = false;
        error = "";
        nameError = ""
      }
      break;

    case "travel_preparation_time":
      if (value.trim() === "") {
        hasError = true;
        error = "زمان مناسب خود را وارد کنید:";
        nameError = "travel_preparation_time"
      } else {
        hasError = false;
        error = "";
        nameError = ""
      }
      break;

    default:
      break;
  }
  return { hasError, error, nameError };
};
