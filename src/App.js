import './App.css';
import {useState} from 'react';
import {generateStory} from './api/generateStory';

function App() {
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value); 
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    generateStory(input).then(response => document.getElementById("story").innerHTML = response);

  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Short Story App.</h1>
        <input id="inputField" type="text" value={input} placeholder="Enter a topic" onChange={handleInputChange}/>
        <button id="submitButton" type="submit" onClick={handleSubmit}>submit</button>
        <br/>
        <div className="storyDiv">
          <p id="story"></p>
        </div>
      </header>
    </div>
  );
}

export default App;