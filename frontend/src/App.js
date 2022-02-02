import { useState } from "react";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import Header from "./components/Header";
import { Container, Typography } from "@mui/material";
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

function App() {
  const [bilder, setBilder] = useState({});
  // const [ergebnis, setErgebnis] = useState("Zu 95% ein..");
  const [catdog, setCatDog] = useState(dogimage);
  const [hacken, setHacken] = useState(false);
  const [buttontext, setButtonText] = useState("Upload!");
  const [spinner, setSpinner] = useState(true);
  const [inputImage, setInputImage] = useState(image);

  const buttonstyle = {
    position: "relative",
    display: "flex",
    height: "80px",
    width: "200px",
    margin: "auto",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    borderRadius: "30px",
    backgroundColor: "#ef9d10",
    border: "2px solid #3b4d61",
    color: "#3b4d61",
  };
  const selectBild = async(bild) => {
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
    axios.post("http://basti.mkth.eu:5000/upload", formData).then((res) => {
      console.log(res.data.prediction)
      getPredictionPercentage(res.data.prediction);
      setSpinner(true);
    });
  };

  const sections = [
    { title: "Hello!", url: "#" },
    { title: "Try it", url: "#" },
    { title: "About us!", url: "#" },
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
        <main>
          <MainFeaturedPost post={post} />
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
        </main>
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
        <Grid item={12}>
          <button
            className="uploadbutton"
            onClick={uploadBild}
            style={buttonstyle}
          >
            <Typography variant="h5" margin="auto">
              {buttontext}
            </Typography>
          </button>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
