import { useEffect, useState } from "react";
import { DateTime as luxon } from "luxon";

function DateTime() {
  const [dateTimeToday, setDateTimeToday] = useState(
    "اليوم 00 الشهر 0000 | 00:00 ص"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTimeToday(
        luxon
          .now()
          .setLocale("ar-ly")
          .toLocaleString(luxon.DATETIME_MED_WITH_WEEKDAY)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <p>{dateTimeToday}</p>;
}
export default DateTime;
