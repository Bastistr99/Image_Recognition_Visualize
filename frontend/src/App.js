import { useState } from "react";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import Header from "./components/Header";
import { Button, Container, Paper, Typography } from "@mui/material";
import MainFeaturedPost from "./components/MainFeaturePost";
import { Grid } from "@mui/material";
import Section from "./components/Section";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import CircularProgress from "@mui/material/CircularProgress";
import image from "./model-2911330_640.jpg"; //Mensch
import dogimage from "./dog-gfd563f370_1280.jpg";
import dog2 from "./pet-3389729_640.jpg";
import cat from "./cat-6463284_640.jpg";
import Footer from "./components/Footer";

function App() {
  const [bilder, setBilder] = useState({});
  // const [ergebnis, setErgebnis] = useState("Zu 95% ein..");
  const [catdog, setCatDog] = useState(dogimage);
  const [hacken, setHacken] = useState(false);
  const [buttontext, setButtonText] = useState("Upload!");
  const [spinner, setSpinner] = useState(true);
  const [inputImage, setInputImage] = useState(image);

  
  const selectBild = async (bild) => {
    let res = await bild.target.files[0];
    setBilder(res);
    setHacken(true);
  };

  const getPredictionPercentage = (prediction) => {
    if (parseFloat(prediction) < 0.5) {
      setCatDog(cat);
    } else {
      setCatDog(dog2);
    }
  };

  const uploadBild = () => {
    setHacken(false);
    setSpinner(false);
    setButtonText("Try Again!");
    let imageuri = URL.createObjectURL(bilder);
    setInputImage(imageuri);
    //Upload Image
    const formData = new FormData();
    formData.append("bild", bilder);
    axios.post("http://193.164.133.60/upload", formData).then((res) => {
      console.log(res.data.prediction);
      getPredictionPercentage(res.data.prediction);
      setSpinner(true);
    });
  };

  const sections = [
    { title: "Ergebnisse", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"},
    { title: "Try it", url: "#tryit" },
    { title: "About!", url: "#about" },
  ];

  const post = {
    description: "Do you have more simularities with cats or dogs?",
    image:
      "https://cdn.pixabay.com/photo/2017/08/07/18/57/dog-2606759_960_720.jpg",
    imageText: "Slider",
    title: "Cat or Dog?",
  };

  const featuredPosts = [
    {
      image: inputImage,
      imageLabel: "Image Text",
    },
    {
      image: catdog,
      imageLabel: "Image Text",
    },
  ];

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Cat or Dog?" sections={sections} key={sections.index} />

        <MainFeaturedPost post={post} />
        <div id="tryit">
          <Paper sx={{ mt: "5vh", mb: "5vh" }} elevation={5}>
            {spinner ? (
              <Grid container spacing={4}>
                {featuredPosts.map((posts) => (
                  <Section post={posts} key={posts.title} />
                ))}
              </Grid>
            ) : (
              <Grid
                container
                spacing={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: "15vh",
                  mb: "20vh",
                }}
              >
                <CircularProgress />
              </Grid>
            )}

            <Grid item={12} mb={"5vh"}>
              <input
                type="file"
                onChange={selectBild}
                accept="image/*"
                id="inputfile"
              />
              <label for="inputfile">
                <AddToPhotosIcon /> &nbsp; Choose a Photo! &nbsp;
                {hacken ? <CheckIcon /> : ""}
              </label>
            </Grid>
            <Grid item={12} sx={{ pb: "3vh", pt: "3vh" }}>
              <Button
                className="uploadbutton"
                onClick={uploadBild}
                variant="contained"
                sx={{
                  display: "flex",
                  position: "relative",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderRadius: "30px",
                  color: "#3b4d61",
                  backgroundColor: "#ef9d10",
                }}
              >
                <Typography variant="h6" margin="auto">
                  {buttontext}
                </Typography>
              </Button>
            </Grid>
          </Paper>
        </div>
        <div id="about">
          <Paper sx={{ mt: "3vh", mb:"3vh" }} elevation={0}>
            <Typography variant="h2" sx={{display: "flex", alignContent: "center", justifyContent: "center"}}>Danke fürs Testen!</Typography>
          </Paper>
        </div>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default App;
