import './App.css';
import {useState, useEffect} from 'react';
import {generateStory} from './api/generateStory';

function App() {
  const [input, setInput] = useState('');
  const [video_url, setVideoUrl] = useState('');

  useEffect(() => {fetch("https://video-ai.invideo.io/api/copilot/request/chatgpt-new-from-brief", {
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
  .then((json) => setVideoUrl(json.video_url), console.log("v: " + video_url))
  }, [input]);

  /*const handleInputChange = (event) => {
    setInput(event.target.value); 
  }*/

  const handleSubmit = (event) => {
    event.preventDefault();
    setInput(document.getElementById("inputField").value);
    generateStory(input).then(response => document.getElementById("story").innerHTML = response[0] +
    "<br><br>" + "<img src='" + response[1] + "' alt='story image'/>");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Short Story App.</h1>
        <input id="inputField" type="text" value={input} placeholder="Enter a topic"/>
        <button id="submitButton" type="submit" onClick={handleSubmit}>submit</button>
        <div className="storyDiv">
          <p id="story"></p>
          <br/>
          <p>Generated vid about {input} below!</p>
          <a href={video_url}><p id="video">Click Here</p></a>
        </div>
      </header>
    </div>
  );
}

export default App;