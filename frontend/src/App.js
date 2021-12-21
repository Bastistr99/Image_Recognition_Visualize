import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { questionmarkimage } from './questionmarkimage';
import { BottomNavigation } from '@mui/material';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';


function App() {

  const [bilder, setBilder] = useState({})
  const [ergebnis, setErgebnis] = useState("")
  const [filename, setFilename] = useState("")
  const [resbild, setResbild] = useState(questionmarkimage)
  const [height, setHeight] = useState(200)
  const [width, setWidth] = useState(200)

  const selectBild = async (bild) => {
    let res = await bild.target.files[0]
    setBilder(res)
    setFilename(res.name)
    
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
    const formData = new FormData();
    formData.append('bild', bilder);
    axios.post("http://127.0.0.1:5000/upload",formData).then(res => {
      get_image()
      setErgebnis(res.data.prediction)

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
      <label for="inputfile">
        <AddToPhotosIcon/> &nbsp; 
        Choose a Photo!
      </label>
      <button onClick={uploadBild}>Upload</button>
      <h1>{ergebnis}</h1>
      <img src={`data:image/jpeg;base64,${resbild}`} width={width} height={height} alt="questionmark"/>
      <BottomNavigation></BottomNavigation>
    </div>
  );
}

export default App;