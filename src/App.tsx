import { useState } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Info from "./components/Info";
import Times from "./components/Times";
import CitySelect from "./components/CitySelect";
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

  function handleCityChange(city: City) {
    setCity(city);
  }

  return (
    <Container className="container">
      <Stack spacing={5}>
        <Info cityArName={city.arName} />
        <Times city={city} />
        <CitySelect city={city} handleCityChange={handleCityChange} />
      </Stack>
    </Container>
  );
}

export default App;
