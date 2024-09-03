import './App.css';
import {useState, useEffect} from 'react';
import {generateStory, generateJoke, generateProductPitch} from './api/generate';
import { speechToText } from './api/speechToText';
import {fetchStories} from './api/fetch.js';

function App() {
  let [input, setInput] = useState('');
  let [product, setProduct] = useState('');
  const [file, setFile] = useState();
  
  useEffect(() => {
    document.title = "Short Story App";
  });

  const downloadStory = (story) => { 
    const blob = new Blob([story], { type: "text/plain" });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = document.getElementById("inputField").value + "!.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  const handleSubmit = () => {
    setInput(input = document.getElementById("inputField").value);

    if (input !== '') {
      let button = document.createElement('Button');
      fetchStories();
      generateStory(input).then(response => {document.getElementById("story").innerHTML = response[0] +
      "<br><br>" + "<img src='" + response[1] + "' alt=" + input + "/>"; button.appendChild(document.createTextNode("Download Story")); document.getElementById("downloadButton").appendChild(button); button.addEventListener('click', () => {downloadStory(response[0])})});

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
      .then((json) => document.getElementById("videoDiv").innerHTML = "<p>Generate video about " + input + " below!</p>" +
      "(An account is required, free to create!) <br/><button id='vidButton'><a href=" + json.video_url + " target='_blank' rel='noopener noreferrer' style='text-decoration:none; color: white;'>Generate</a></button>");
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

  function handleChange(event) {
    console.log("running..");
    setFile(event.target.files[0]);
    document.querySelector("label[for='audioFile']").textContent = event.target.files[0].name;
  }

  function speechToTextAPI() { 
    speechToText(file);
  }

  return (
    <div className="App">
      <header className="App-header">
        <title>Short Story App</title>
        <h1>Short Story App :)</h1>
        <input id="inputField" type="text" placeholder="Enter a topic"/>
        <button id="submitButton" type="submit" onClick={handleSubmit}>submit</button>
        <div className="storyDiv">
          <p id="story"></p>
          <p id="downloadButton"></p>
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
          <div className='audioToText'>
            <p id="transcriptionTitle">Transcription of an audio file!</p>
            <bt/>
            <input id="audioFile" type="file" accept="audio/*" style={{display:"none"}} onChange={handleChange}/>
            <label htmlFor="audioFile">Select audio file</label>
            <br/>
            <button type="submit" onClick={speechToTextAPI}>Upload</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;