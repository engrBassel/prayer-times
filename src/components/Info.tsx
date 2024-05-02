import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import DateTime from "./DateTime";

function Info({
  cityArName,
  nextPrayerArName,
  timeToNextPrayer,
}: {
  cityArName: string;
  nextPrayerArName: string;
  timeToNextPrayer: string;
}) {
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
        <DateTime />
        <h2>{cityArName}</h2>
      </Stack>
      <Stack spacing={2}>
        <p>متبقي حتى صلاة {nextPrayerArName}</p>
        <h2>{timeToNextPrayer}</h2>
      </Stack>
    </Grid>
  );
}
export default Info;
