import fajrImage from "../assets/images/Fajr.jpg";
import dhuhrImage from "../assets/images/Dhuhr.jpg";
import asrImage from "../assets/images/Asr.jpg";
import maghribImage from "../assets/images/Maghrib.jpg";
import ishaImage from "../assets/images/Isha.jpg";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { TimesType, TimeNameType } from "../App";

const imagesArr = [fajrImage, dhuhrImage, asrImage, maghribImage, ishaImage];

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
              image={imagesArr[indx]}
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
