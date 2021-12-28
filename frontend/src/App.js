import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { questionmarkimage } from './questionmarkimage';
import CheckIcon from '@mui/icons-material/Check';

import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { CircularProgress } from "@mui/material"


function App() {

  const [bilder, setBilder] = useState({})
  const [ergebnis, setErgebnis] = useState("")
  const [filename, setFilename] = useState("")
  const [resbild, setResbild] = useState(questionmarkimage)
  const [height, setHeight] = useState(200)
  const [width, setWidth] = useState(200)
  const [loading, setLoading] = useState(true)
  const [hacken, setHacken] = useState(false)
  const [buttontext, setButtonText] = useState("Upload!")
  const [buttonstyle, setButtonstyle] = useState({
    height: "80px",
    width: "200px",
    margin: "auto",
    top: "40%",
    bottom: "0",
    left: "0",
    right: "0",
    borderRadius: "30px",
    backgroundColor: "#ef9d10",
    color: "#3b4d61"
  })
  const [labelstyle, setLabelstyle] = useState({})

  const [ergebnisstyle, setErgebnisstyle] = useState({
    display: "none"
  })
  

  const selectBild = async (bild) => {
    let res = await bild.target.files[0]
    setBilder(res)
    setFilename(res.name)
    setHacken(true)
  }
  const get_image = () => {
    axios.get("http://127.0.0.1:5000/getimage/" + filename).then(res => {
      setResbild(res.data)
    })
  }
  const getDigitCount = (number) => {
    return Math.max(Math.floor(Math.log10(Math.abs(number))), 0) + 1;
  }

  const uploadBild = () => {
    setLoading(false)
    setHacken(false)
    // Change Position from the Upload Button from center to down right
    setButtonstyle({
      height: "60px",
      width: "200px",
      margin: "auto",
      bottom: "0",
      left: "0",
      right: "0",
      borderRadius: "30px",
      backgroundColor: "#ef9d10",
      color: "#3b4d61",
      top: "80%"
    })
    setButtonText("Try Again!")
    setLabelstyle({
    top: "60%"
  })
    //Upload Image 
    const formData = new FormData();
    formData.append('bild', bilder);
    axios.post("http://127.0.0.1:5000/upload",formData).then(res => {
      get_image()
      setErgebnisstyle({display: "block"})
        if (parseFloat(res.data.prediction) < 0.5){
          setErgebnis("Du bist ein Hund!")
        } else {
          setErgebnis("Du bist eine Katze!")
        }
      setLoading(true)
      let picwidth = parseInt(res.data.width)
      let picheight = parseInt(res.data.height)
     
      //Für Fotos im Querformat
      if(picheight < picwidth){
        let count = getDigitCount(picwidth)
        if(picwidth < 1000){
          setHeight(picheight)
          setWidth(picwidth)
        } else {
        if (picwidth <= 2000){
          count = 2
        }
        setHeight((picheight/count))
        setWidth((picwidth/count))
        }
      } else {
      let count = getDigitCount(picheight)
      //Für Fotos im Hochformat
      if(picheight < 1000){
        setHeight(picheight)
        setWidth(picwidth)
      } else {
      if (picheight <= 2000){
        count = 2
      } 
      setHeight((picheight/count))
      setWidth((picwidth/count))
      }
    }
    })
  }   
  
  return (
    <div className="App">
      <input type="file" onChange={selectBild} accept="image/*" id="inputfile" />
    
      <label for="inputfile" style={labelstyle}>
        <AddToPhotosIcon/> &nbsp; 
        Choose a Photo! &nbsp;
        {hacken ? (<CheckIcon />) : ("")}
      </label>
      <button id="uploadbutton" onClick={uploadBild} style={buttonstyle}>{buttontext}</button>
      <img src={`data:image/jpeg;base64,${resbild}`} width={width} height={height} alt="questionmark"/>
      <div className='ergebnis' style={ergebnisstyle}>{loading ? (ergebnis) : (<CircularProgress />)}</div>
    </div>
  );
}

export default App;