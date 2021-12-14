import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [bilder, setBilder] = useState({})
  const [ergebnis, setErgebnis] = useState("")
  const [filename, setFilename] = useState("")
  const [resbild, setResbild] = useState("")

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
  const uploadBild = () => {
    const formData = new FormData();
    
    formData.append('bild', bilder);
    axios.post("http://127.0.0.1:5000/upload",formData).then(res => {
      console.log(res)
      get_image()
      setErgebnis(res.data[0].message)
      
    })
  }   
  
  return (
    <div className="App">
      <input type="file" onChange={selectBild} accept="image/*" />
      <button onClick={uploadBild}>Upload</button>
      <h1>{ergebnis}</h1>
      <img src={`data:image/jpeg;base64,${resbild}`} />
    </div>
  );
}

export default App;