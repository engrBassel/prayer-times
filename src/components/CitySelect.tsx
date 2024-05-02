import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { CityType } from "../App";

const availableCities = [
  {
    name: "Cairo",
    arName: "القاهرة",
  },
  {
    name: "Alexandria",
    arName: "الإسكندرية",
  },
  {
    name: "Tanta",
    arName: "طنطا",
  },
  {
    name: "Qotoor",
    arName: "قطور",
  },
];

function CitySelect({
  city,
  handleCityChange,
}: {
  city: CityType;
  handleCityChange: (city: CityType) => void;
}) {
  function handleChange(e: SelectChangeEvent) {
    const selectedCity = availableCities.find(
      (city) => city.name == e.target.value
    ) as CityType;
    handleCityChange(selectedCity);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <FormControl sx={{ minWidth: "200px" }}>
        <InputLabel id="demo-simple-select-helper-label">المدينة</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={city.name}
          label="المدينة"
          onChange={handleChange}
        >
          {availableCities.map((city) => (
            <MenuItem value={city.name} key={city.name}>
              {city.arName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default CitySelect;
