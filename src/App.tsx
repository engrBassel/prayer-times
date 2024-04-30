import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Info from "./components/Info";
import Times from "./components/Times";
import CitySelect from "./components/CitySelect";
import axios from "axios";
import "./App.css";

export type City = {
  name: string;
  arName: string;
};

function App() {
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

  function handleCityChange(city: City) {
    setCity(city);
  }

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

  return (
    <Container className="container">
      <Stack spacing={5}>
        <Info city={city} />
        <Times times={times} />
        <CitySelect city={city} handleCityChange={handleCityChange} />
      </Stack>
    </Container>
  );
}

export default App;
