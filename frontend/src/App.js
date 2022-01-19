import "./App.css";
import { useState } from "react";
import axios from "axios";
import { cat, dog, menschbild, dog2 } from "./questionmarkimage";
import CheckIcon from "@mui/icons-material/Check";

import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";

function App() {
  const [bilder, setBilder] = useState({});
  const [ergebnis, setErgebnis] = useState("Zu 95% ein..");
  const [filename, setFilename] = useState("");
  const [mensch, setMenschBild] = useState(menschbild);
  const [catdog, setCatDog] = useState(dog);
  const [height, setHeight] = useState(300);
  const [width, setWidth] = useState(300);
  const [ergebnis_txt, setErgebnistxt] = useState("Hund!");
  const [hacken, setHacken] = useState(false);
  const [buttontext, setButtonText] = useState("Upload!");

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
  const selectBild = async (bild) => {
    let res = await bild.target.files[0];
    setBilder(res);
    setFilename(res.name);
    setHacken(true);
  };
  const get_image = () => {
    axios.get("http://basti.mkth.eu:5000/getimage/" + filename).then((res) => {
      setMenschBild(res.data);

    });
  };

  const getFirstDigit = (number) => {
    while ( number >= 10){
      number /= 10;
    }
    return Math.floor(number);
  };

  const getPictureFormat = (picwidth, picheight) => {
    console.log("Height: " + picheight)
    console.log("Width: " + picwidth)
    //Für Fotos im Querformat und Quadrat
    if (picwidth >= picheight) {
      let count = getFirstDigit(picwidth);
      console.log(count)
      if (picwidth < 500) {
        setWidth(picwidth);
        setHeight(picheight);
      } else {
        if (picwidth <= 2000) {
          count = 2;
          let new_width = picwidth / count;
          let new_heigth = picheight / count;
          setWidth(new_width);
          setHeight(new_heigth);
          getPictureFormat(new_width, new_heigth)
        } else {
          let new_width = picwidth / count;
          let new_heigth = picheight / count;
          setWidth(new_width);
          setHeight(new_heigth);
          getPictureFormat(new_width, new_heigth)
        }
      }
    }
    //Für Fotos im Hochformat
    else {
      let count = getFirstDigit(picheight);
      console.log(count)
      if (picheight < 500) {
        setWidth(picwidth);
        setHeight(picheight);
      } else {
        if (picheight <= 2000) {
          count = 2;
          let new_width = picwidth / count;
          let new_heigth = picheight / count;
          setWidth(new_width);
          setHeight(new_heigth);
          getPictureFormat(new_width, new_heigth)
        } else {
          let new_width = picwidth / count;
          let new_heigth = picheight / count;
          setWidth(new_width);
          setHeight(new_heigth);
          getPictureFormat(new_width, new_heigth)
        }
      }
    }
  };
  
  const getPredictionPercentage = (prediction) => {
    if (parseFloat(prediction) < 0.5) {
      setCatDog(dog2);
      setErgebnis("Zu " + (100 - parseFloat(prediction)) + "% ein..");
      setErgebnistxt("Hund!");
    } else {
      setCatDog(cat);
      setErgebnis("Zu " + parseFloat(prediction) * 100 + "% eine..");
      setErgebnistxt("Katze!");
    }
  };

  const uploadBild = () => {
    setHacken(false);
    setButtonText("Try Again!");
    //Upload Image
    const formData = new FormData();
    formData.append("bild", bilder);
    axios.post("http://basti.mkth.eu:5000/upload", formData).then((res) => {
     get_image();
      //Get Prediction and set Prediction and Pictures to the result
      getPredictionPercentage(res.data.prediction);
      console.log(res)

      //Format der Fotos bestimmen
      let picwidth = parseInt(res.data.width);
      let picheight = parseInt(res.data.height);
      getPictureFormat(picwidth, picheight);
    });
  };

  return (
    <div className="container">
      <div class="Heading">
        <h2>Do you have more simularities with cats or dogs?</h2>
      </div>
      <div class="Picture1">
        <div>
          <h2>{ergebnis}</h2>
          <img
            src={`data:image/jpeg;base64,${mensch}`}
            alt="mensch"
            width={width}
            height={height}
          />
        </div>
      </div>
      <div class="Picture2">
        <div>
          <h2>{ergebnis_txt}</h2>
          <img
            src={`data:image/jpeg;base64,${catdog}`}
            alt="questionmark"
            width={width}
            height={height}
          />
        </div>
      </div>
      <div class="Select-Image">
        <div>
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
        </div>
      </div>
      <div class="Upload-Image">
        <div>
          <button
            className="uploadbutton"
            onClick={uploadBild}
            style={buttonstyle}
          >
            <h1>{buttontext}</h1>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
