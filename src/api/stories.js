// Using Axios
import axios from 'axios';

export async function fetchStories(req, res) {
  try {
    const response = await axios.get("https://8jyx5c3anc.execute-api.eu-north-1.amazonaws.com/dev/stories");
    for (const element of response.data) {
      console.log(element.story);
    }
  } catch (error) {
    console.error('Error fetching stories:', error);
  }
};

export async function saveStory(story) {
  try {
    const response = await axios.post("https://8jyx5c3anc.execute-api.eu-north-1.amazonaws.com/dev/stories", {
      story: story
    });
    console.log(response);
  } catch (error) {
    console.error('Error saving story:', error);
  }
}