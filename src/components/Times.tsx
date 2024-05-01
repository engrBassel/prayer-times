import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { TimesType, TimeNameType } from "../App";

function Times({
  times,
  timesNames,
}: {
  times: TimesType;
  timesNames: TimeNameType[];
}) {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 1, sm: 5 }}
      justifyContent={"center"}
    >
      {timesNames.map((time, indx) => (
        <Grid key={time.name}>
          <Card>
            <CardMedia
              sx={{ height: 150, width: 200 }}
              image={`/src/assets/images/${timesNames[indx].name}.jpg`}
              title={`${timesNames[indx].name} Prayer`}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign="center"
              >
                صلاة {time.arName}
              </Typography>
              <Typography variant="h5" component="div" textAlign="center">
                {times[timesNames[indx].name as keyof TimesType]}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Times;
