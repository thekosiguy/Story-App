// Using Axios
import axios from 'axios';

export async function fetchStories(req, res) {
  try {
    const response = await axios.get(`arn:aws:execute-api:eu-north-1:831926608841:8jyx5c3anc/*/GET/stories`);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching stories:', error);
  }
};