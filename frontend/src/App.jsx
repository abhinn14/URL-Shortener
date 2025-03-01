import React, { useState } from 'react'
import axios from 'axios';
import validUrl from 'valid-url';

function App() {

  const [ogURL,setOgURL] = useState('');
  const [shortURL,setShortURL] = useState('');

  const handleShrink = () => {
    if(!ogURL) {
      alert("PLEASE ENTER THE URL FIRST");
      return;
    }
    if(validUrl.isUri(ogURL)){
    } else {
      alert("Enter valid URL");
      return;
    }
    if(ogURL.length<=40) {
      alert("URL is already short");
      return;
    }
    axios.post('https://shorty-2pi0.onrender.com/api/short',{ogURL})
    .then((res)=>{
      setShortURL(res.data);
    })
    .catch((error)=>console.log(error));
  };

  return (
    <>
    <div class='main'>
      <h1 class='heading'>URL SHORTENER</h1>
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
          <h1 class='shorty'>
            Shortened URL : <a href={`${shortURL.shorty}`} target="_blank">
            {shortURL.shorty}
          </a>
          </h1>
        )
      }
      {
        shortURL  &&
        <img src={shortURL.qr} alt="" />
      }
    </div>
    </>
    
  )
}

export default App;
