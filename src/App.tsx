import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./App.css";

const url = "https://api.aladhan.com/v1/timingsByCity?country=EG&city=Cairo";

function App() {
  return (
    <>
      <Container className="container">
        <Stack spacing={5}>
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
              <h2>مكة المكرمة</h2>
            </Stack>
            <Stack spacing={2}>
              <p>متبقي حتى صلاة العصر</p>
              <h2>01:30:55</h2>
            </Stack>
          </Grid>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 5 }}>
            {Array.from(Array(5)).map((_, index) => (
              <Grid key={index}>
                <Card>
                  <CardMedia
                    sx={{ height: 150, width: 150 }}
                    image="/src/assets/images/fajr.jpg"
                    title="Fajr Prayer"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      textAlign="center"
                    >
                      صلاة الفجر
                    </Typography>
                    <Typography variant="h5" component="div" textAlign="center">
                      04:38
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </>
  );
}

export default App;
