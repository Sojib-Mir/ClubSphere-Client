import axios from "axios";
export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_imgbb_key}`,
    formData
  );

  return data?.data?.display_url;
};

// save or update user in db
export const saveOrUpdateUser = async (userData) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/user`,
    userData
  );

  return data;
};

// BDT time formet
export const formatToBDT = (dateString, includeTime = true) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  };
  if (includeTime) {
    options.hour = "2-digit";
    options.minute = "2-digit";
  }
  const datePart = date.toLocaleDateString("en-GB", options);
  const timePart = includeTime
    ? date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Dhaka",
      })
    : "";
  return `${datePart.split(",")[0]} | ${timePart.replace(",", "")}`;
};

// Formet Date
export const formatDate = (isoString) => {
  const date = new Date(isoString);
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
  return {
    date: date.toLocaleDateString("en-US", dateOptions),
    time: date.toLocaleTimeString("en-US", timeOptions),
  };
};

export const dateBDFormet = (isoString) => {
  if (!isoString) {
    return "N/A";
  }
  const { date, time } = formatDate(isoString);
  return `${date} at ${time}`;
};

// Future Date
export const isFutureDate = (dateString) => {
  const eventDateTime = new Date(dateString);
  const currentDateTime = new Date();
  return eventDateTime.getTime() > currentDateTime.getTime();
};
