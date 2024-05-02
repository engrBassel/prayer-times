// imports start
import { useState, useEffect } from "react";
import axios from "axios";
import { DateTime as luxon } from "luxon";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Info from "./components/Info";
import Times from "./components/Times";
import CitySelect from "./components/CitySelect";
import "./App.css";
// imports end

// Types start
export type CityType = {
  name: string;
  arName: string;
};
export type TimesType = {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};
export type TimeNameType = {
  name: string;
  arName: string;
};
// Types end

// Consts start
const timesNames = [
  {
    name: "Fajr",
    arName: "الفجر",
  },
  {
    name: "Dhuhr",
    arName: "الظهر",
  },
  {
    name: "Asr",
    arName: "العصر",
  },
  {
    name: "Maghrib",
    arName: "المغرب",
  },
  {
    name: "Isha",
    arName: "العشاء",
  },
];
// Consts end

function App() {
  // States start
  const [city, setCity] = useState({
    name: "Cairo",
    arName: "القاهرة",
  });
  const [times, setTimes] = useState({
    Fajr: "00:00",
    Dhuhr: "00:00",
    Asr: "00:00",
    Maghrib: "00:00",
    Isha: "00:00",
  });
  const [nextPrayerIndx, setNextPrayerIndx] = useState(0);
  const [timeToNextPrayer, setTimeToNextPrayer] = useState("00 : 00 : 00");
  // States end

  // get times start
  useEffect(() => {
    async function getTimes() {
      try {
        const {
          data: {
            data: {
              timings: { Fajr, Dhuhr, Asr, Maghrib, Isha },
            },
          },
        } = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity?country=EG&city=${city.name}`
        );
        setTimes({ Fajr, Dhuhr, Asr, Maghrib, Isha });
      } catch (error) {
        console.error(error);
      }
    }
    getTimes();
  }, [city]);
  // get times end

  // calculate the next prayer and remaining time to it start
  useEffect(() => {
    let prayerIndx = 0;
    const interval = setInterval(() => {
      const timeNowAsLuxon = luxon.now();

      // calculate the next prayer index start
      for (let i = 0; i < timesNames.length; i++) {
        if (
          timesNames[i + 1] &&
          timeNowAsLuxon >
            luxon.fromFormat(
              times[timesNames[i].name as keyof TimesType],
              "hh:mm"
            ) &&
          timeNowAsLuxon <
            luxon.fromFormat(
              times[timesNames[i + 1].name as keyof TimesType],
              "hh:mm"
            )
        ) {
          prayerIndx = i + 1;
          setNextPrayerIndx(prayerIndx);
          break;
        }
        prayerIndx = 0;
        setNextPrayerIndx(prayerIndx);
      }
      // calculate the next prayer index end

      // calculate the remaining time to the next prayer start
      // create luxon object of the next prayer time
      const timeOfNextPrayerAsLuxon = luxon.fromFormat(
        times[timesNames[prayerIndx].name as keyof TimesType],
        "hh:mm"
      );

      // check if the next prayer is Fajr or not
      if (prayerIndx == 0) {
        const timeToMidnight = luxon
          .fromFormat("23:59:59", "hh:mm:ss")
          .diffNow();
        const timeFromMidnight = timeOfNextPrayerAsLuxon.diff(
          luxon.fromFormat("00:00:00", "hh:mm:ss")
        );
        setTimeToNextPrayer(
          timeToMidnight.plus(timeFromMidnight).toFormat("ss : mm : hh")
        );
      } else {
        setTimeToNextPrayer(
          timeOfNextPrayerAsLuxon.diffNow().toFormat("ss : mm : hh")
        );
      }
      // calculate the remaining time to the next prayer end
    }, 1000);

    return () => clearInterval(interval);
  }, [times]);
  // calculate the next prayer and remaining time to it end

  // handle city change start
  function handleCityChange(city: CityType) {
    setCity(city);
  }
  // handle city change end

  return (
    <Container className="container">
      <Stack spacing={3}>
        <h1 className="main-heading">مواقيت الصلاة حسب &nbsp; aladhan.com</h1>
        <Divider variant="middle">
          <Chip label="المعلومات" size="small" />
        </Divider>
        <Info
          cityArName={city.arName}
          nextPrayerArName={timesNames[nextPrayerIndx].arName}
          timeToNextPrayer={timeToNextPrayer}
        />
        <Divider variant="middle">
          <Chip label="المواقيت" size="small" />
        </Divider>
        <CitySelect city={city} handleCityChange={handleCityChange} />
        <Times times={times} timesNames={timesNames} />
      </Stack>
    </Container>
  );
}

export default App;
