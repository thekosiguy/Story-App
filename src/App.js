import './App.css';
import {useState} from 'react';
import {generateStory} from './api/generateStory';

function App() {
  let [input, setInput] = useState('');

  const handleSubmit = () => {
    setInput(input = document.getElementById("inputField").value);

    if (input !== '') {
      generateStory(input).then(response => document.getElementById("story").innerHTML = response[0] +
      "<br><br>" + "<img src='" + response[1] + "' alt='story image'/>");

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
      .then((json) => {console.log("url: " + json.video_url); document.getElementById("videoDiv").innerHTML = "<p>Generate vid about " + input + " below!</p>" +
      "<a href=" + json.video_url + " target='_blank' rel='noopener noreferrer'><p id='video'>Click Here</p></a>"});
  } else {
      alert("Please enter a topic");
  }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Short Story App :)</h1>
        <input id="inputField" type="text" placeholder="Enter a topic" /*onChange={handleInputChange}*//>
        <button id="submitButton" type="submit" onClick={handleSubmit}>submit</button>
        <div className="storyDiv">
          <p id="story"></p>
          <br/>
          <div id="videoDiv"></div>
        </div>
      </header>
    </div>
  );
}

export default App;