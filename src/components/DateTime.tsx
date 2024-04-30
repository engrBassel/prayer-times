import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ar-ma";

dayjs.locale("ar-ma");

function DateTime() {
  const [dateTimeToday, setDateTimeToday] = useState("التاريخ و الوقت");

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTimeToday(dayjs().format("dddd DD MMMM YYYY | hh:mm a"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <p>{dateTimeToday}</p>;
}
export default DateTime;
