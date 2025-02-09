import React, { useState } from 'react'
import axios from 'axios';

function App() {

  const [ogURL,setOgURL] = useState('');
  const [shortURL,setShortURL] = useState('');

  const handleShrink = () => {
    if(!ogURL) {
      alert("PLEASE ENTER THE URL FIRST");
      return;
    }
    axios.post('http://localhost:8080/api/short',{ogURL})
    .then((res)=>{
      setShortURL(res.data.url.shortURL);
      console.log("api response",res);
    })
    .catch((error)=>console.log(error));
  };

  return (
    <>
    <div class='main'>
      <h1 class='heading'>URL SHORTNER</h1>
      <input placeholder='ENTER THE LINK HERE'
      value={ogURL}
      onChange={(e)=>{setOgURL(e.target.value)}}
      type="text" id="texty"/>
      <button type='button' id="submit" onClick={handleShrink}>
        SHORTEN
      </button>
      {
        shortURL &&
        (

          <a href={`http://localhost:8080/${shortURL}`} target="_blank">
            <h1 class='shorty'>
            http://localhost:8080/{shortURL}
            </h1>
          </a>
          
        )
      }
    </div>
    </>
    
  )
}

export default App;
