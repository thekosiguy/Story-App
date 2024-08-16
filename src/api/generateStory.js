/**
 * Create a controller with the following specifications:

1. import the Configuration class and the OpenAIApi class from the openai npm module
2. create a new configuration object that includes the api key and uses the Configuration class from the openai module
3. create a new instance of the OpenAIApi class and pass in the configuration object
4. create an async function called generateStory that accepts a request and response object as parameters
5. use try to make a request to the OpenAI completion api and return the response
6. use catch to catch any errors and return the error include a message to the user
7. export the generateStory function as a module
*/ 
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env['REACT_APP_OPENAI_API_KEY'],
  dangerouslyAllowBrowser: true
});

export async function generateStory(input, req, res) {
        try {
            const completion = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [{role: "system", content: "You are feeling sexy and crazy charming."},
                        {role: "user", content: `Produce a 1 sentence short story strictly about ${input}`}],
                max_tokens: 150,
                temperature: 0.9,
                n: 1
            });

            const res = await openai.images.generate({
                model: "dall-e-2",
                prompt: String(input),
                n: 1,
                size: "512x512",
                style: "natural",
                quality: "hd"
              });

              const image_url = res.data[0].url;

        const response = completion.choices[0].message.content;
        return [response, image_url];
    } catch (error) {
        alert(error)

        if (error.response.status === 500) {
            return res.status(500).json({ error: 'Failed to generate story' });
        }
        else if (error.response.status === 401) {
            return res.status(401).json({ error: 'Invalid API key.' });
        }
    }
}