import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { City } from "../App";

function Info({ city }: { city: City }) {
  return (
    <Grid
      container
      gap={3}
      columns={{ xs: 1, sm: 2 }}
      justifyContent={{ xs: "center", sm: "space-between" }}
      alignItems="center"
      textAlign="center"
    >
      <Stack spacing={2}>
        <p>أبريل 29 2024 | 02:50</p>
        <h2>{city.arName}</h2>
      </Stack>
      <Stack spacing={2}>
        <p>متبقي حتى صلاة العصر</p>
        <h2>01:30:55</h2>
      </Stack>
    </Grid>
  );
}
export default Info;
