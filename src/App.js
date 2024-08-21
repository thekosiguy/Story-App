import './App.css';
import {useState, useEffect} from 'react';
import {generateStory, generateJoke, generateProductPitch} from './api/generate';
/*import AndrewF from './assets/ENG_US_M_AndrewF.mp3';
import { audioToText } from './api/audioToText';*/

function App() {
  let [input, setInput] = useState('');
  let [product, setProduct] = useState('');
  /*const url = "https://api.edenai.run/v2/workflow/0bb29b04-188e-4e1c-964f-f1164d4f7a2a/execution/";

  const payload = {
      "providers": [
        "google"
      ],
      "language": "en-US",
      files : {
        "file_url": './assets/ENG_US_M_AndrewF.mp3'
      }
  }*/

  /* Function to convert file to Blob
  async function fileToBlob(filePath) {
    const response = await fetch(filePath);
    const blob = await response.blob();
    return blob;
  }

  function getBase64(url, file) {
    var reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function () {
      audioToText(url, reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }*/
 
  useEffect(() => {
    document.title = "Short Story App";
  });

  const handleSubmit = () => {
    //fileToBlob('./assets/ENG_US_M_AndrewF.mp3').then(blob => getBase64(url, new File([blob], "file"))/*audioToText(url, getBase64(blob))*/);
    setInput(input = document.getElementById("inputField").value);

    if (input !== '') {
      generateStory(input).then(response => document.getElementById("story").innerHTML = response[0] +
      "<br><br>" + "<img src='" + response[1] + "' alt=" + input + "/>");

      fetch("https://video-ai.invideo.io/api/copilot/request/chatgpt-new-from-brief", {
        method: "POST",
        body: JSON.stringify({
          "brief": "generate a video about " + input,
          "settings": "",
          "title": input,
          "description": "video about " + input,
          "platforms": [
          "youtube", "facebook", "imgur", "instagram", "linkedin", "pinterest", "snapchat", "tiktok", "twitter", "vimeo", "whatsapp"
          ],
          "audiences": [
          "adults", "teenagers", "seniors"
          ],
          "length_in_minutes": 1
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then((response) => response.json())
      .then((json) => document.getElementById("videoDiv").innerHTML = "<p>Generate vid about " + input + " below!</p>" +
      "(An account is required, free to create!) <a href=" + json.video_url + " target='_blank' rel='noopener noreferrer'><p id='video'>Click Here</p></a>");
  } else {
      alert("Please enter a topic");
  }
  };

  const handleJokeRoulette = () => {
    generateJoke().then(response => window.confirm(response));
  }

  const handleProductPitch = (product) => {
    setProduct(product = document.getElementById("productField").value);
    generateProductPitch(product).then(response => alert(response));
  }

  return (
    <div className="App">
      <header className="App-header">
        <title>Short Story App</title>

        <h1>Short Story App :)</h1>
        <input id="inputField" type="text" placeholder="Enter a topic" /*onChange={handleInputChange}*//>
        <button id="submitButton" type="submit" onClick={handleSubmit}>submit</button>
        <div className="storyDiv">
          <p id="story"></p>
          <br/>
          <div id="videoDiv"></div>
        </div>
        <div className='extraStuff'>
          <h3>Extra Stuff!</h3>
          <div className="jokeRoulette">
            <button id="jokeButton" onClick={handleJokeRoulette}>joke roulette!</button>
          </div>
          <div className='productPitch'>
            <input id="productField" type="text" placeholder="Enter a product"/>
            <br/>
            <button id="pitchButton" onClick={handleProductPitch}>Get pitch!</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;