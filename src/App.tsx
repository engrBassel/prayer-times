import { useState, useEffect } from "react";
import axios from "axios";
import { DateTime as luxon } from "luxon";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Info from "./components/Info";
import Times from "./components/Times";
import CitySelect from "./components/CitySelect";
import "./App.css";

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
  const [timeToNextPrayer, setTimeToNextPrayer] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
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
    const interval = setInterval(() => {
      const timeNow = luxon.now();
      let prayerIndx = 0;

      // calculate the next prayer index start
      for (let i = 0; i < timesNames.length; i++) {
        if (
          timesNames[i + 1] &&
          timeNow >
            luxon.fromFormat(
              times[timesNames[i].name as keyof TimesType],
              "hh:mm"
            ) &&
          timeNow <
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
      const timeToNextPrayerLuxon = luxon.fromFormat(
        times[timesNames[prayerIndx].name as keyof TimesType],
        "hh:mm"
      );
      let hours: number, minutes: number, seconds: number;
      if (prayerIndx == 0) {
        const timeToMidnight = luxon
          .fromFormat("23:59:59", "hh:mm:ss")
          .diffNow();
        const timeFromMidnight = timeToNextPrayerLuxon.diff(
          luxon.fromFormat("00:00:00", "hh:mm:ss")
        );
        const {
          hours: h,
          minutes: m,
          seconds: s,
        } = timeToMidnight.plus(timeFromMidnight).shiftToAll();
        [hours, minutes, seconds] = [h, m, s];
      } else {
        const {
          hours: h,
          minutes: m,
          seconds: s,
        } = timeToNextPrayerLuxon.diffNow().shiftToAll();
        [hours, minutes, seconds] = [h, m, s];
      }
      setTimeToNextPrayer({
        hours,
        minutes,
        seconds,
      });
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
      <Stack spacing={5}>
        <Info
          cityArName={city.arName}
          nextPrayer={timesNames[nextPrayerIndx]}
          timeToNextPrayer={timeToNextPrayer}
        />
        <Times times={times} timesNames={timesNames} />
        <CitySelect city={city} handleCityChange={handleCityChange} />
      </Stack>
    </Container>
  );
}

export default App;
