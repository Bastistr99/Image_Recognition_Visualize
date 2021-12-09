import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [bilder, setBilder] = useState({})

  const selectBild = (bild) => {
    console.log(bild.target.files[0]);
    setBilder(bild.target.files[0]) 
  }

  const uploadBild = () => {
    const formData = new FormData();
    
    formData.append('bild', bilder);

    axios.post("http://127.0.0.1:5000/upload",formData).then(res => {
      console.log(res)
    })
  }

  return (
    <div className="App">
      <input type="file" onChange={selectBild}/>
      <button onClick={uploadBild}>Upload</button>
    </div>
  );
}

export default App;