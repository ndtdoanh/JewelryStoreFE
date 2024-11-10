import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const convertDateStringToDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    date.setUTCHours(date.getUTCHours() + 7); // Điều chỉnh múi giờ +7
    return date.toISOString();
}

export const convertTimeStampToDateString = (timestamp) => {
  // Create a dayjs object from the timestamp and convert it to the Vietnam time zone
  const date = dayjs(timestamp).tz("Asia/Ho_Chi_Minh");

  // Format the date to "DD-MM-YYYY"
  const dateString = date.format("DD-MM-YYYY");

  return dateString;
};

export const getDateNow = () => {
  const currentDate = new Date();
  const vietnamTime = new Date(
    currentDate.getTime() + 7 * 60 * 60 * 1000
  ).toISOString();
  return vietnamTime;
};

export const generateBarcode = (type) => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return type.typeName.toUpperCase() + randomNum ;
};
export const convertDateToDateString = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
