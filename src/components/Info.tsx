import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import DateTime from "./DateTime";
import { TimeNameType } from "../App";

function Info({
  cityArName,
  nextPrayer,
  timeToNextPrayer,
}: {
  cityArName: string;
  nextPrayer: TimeNameType;
  timeToNextPrayer: {
    hours: number;
    minutes: number;
    seconds: number;
  };
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
        <p>متبقي حتى صلاة {nextPrayer.arName}</p>
        <h2>
          {`
            ${
              timeToNextPrayer.seconds >= 10
                ? timeToNextPrayer.seconds
                : `0${timeToNextPrayer.seconds}`
            } : 
            ${
              timeToNextPrayer.minutes >= 10
                ? timeToNextPrayer.minutes
                : `0${timeToNextPrayer.minutes}`
            } : 
            ${
              timeToNextPrayer.hours >= 10
                ? timeToNextPrayer.hours
                : `0${timeToNextPrayer.hours}`
            }
            `}
        </h2>
      </Stack>
    </Grid>
  );
}
export default Info;
