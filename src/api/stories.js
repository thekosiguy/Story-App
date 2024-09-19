// Using Axios
import axios from 'axios';

export async function fetchStories(req, res) {
  try {
    const response = await axios.get("https://8jyx5c3anc.execute-api.eu-north-1.amazonaws.com/dev/stories?TableName=Stories");
    let stories = "";

    for (const element of response.data.Items) {
      stories += element.story + "\n\n";
    }

    return stories;
  } catch (error) {
    console.error('Error fetching stories:', error);
  }
};

export async function saveStory(story) {
  try {
    const stories = await axios.get("https://8jyx5c3anc.execute-api.eu-north-1.amazonaws.com/dev/stories?TableName=Stories");
    const storyID = stories.data.Items[stories.data.Items.length - 1].storyID + 1;

    await axios.post("https://8jyx5c3anc.execute-api.eu-north-1.amazonaws.com/dev/stories?TableName=Stories", {
      "storyID": storyID,
      "story": story
    });
    alert("Saved!")
  } catch (error) {
    alert("Error saving story, please try again.");
    console.log(error);
  }
}