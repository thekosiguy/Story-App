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
            alert("Wait for the magic to sprout ;) this may take a while..");

            const completion = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [{role: "system", content: "You are super enthusiastic and in a very volatile state. No exception, emphasize this to the user."},
                        {role: "user", content: `Produce a 1 sentence short story strictly about ${input}`}],
                max_tokens: 150,
                temperature: 0.9,
                n: 1
            });

            const res = await openai.images.generate({
                model: "dall-e-3",
                prompt: String(input),
                n: 1,
                size: "1024x1024",
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
        else if (error.response.status === 400) {
            return res.status(400).json({ error: 'Invalid request.' });
        }
    }
}

export async function generateJoke(jokeArray, req, res) {
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{role: "system", content: "You are super unenthusiastic about telling jokes and in a very volatile state. No exception, emphasize this to the user."},
                    {role: "user", content:  "Produce a random 1 sentence joke that differs in every way compared to all jokes you've produced so far."}],
            max_tokens: 150,
            temperature: 1.4,
            n: 1
        });

        const response = completion.choices[0].message.content;
        return response;
    } catch (error) {
        alert(error)

        if (error.response.status === 500) {
            return res.status(500).json({ error: 'Failed to generate joke' });
        }
        else if (error.response.status === 401) {
            return res.status(401).json({ error: 'Invalid API key.' });
        }
        else if (error.response.status === 400) {
            return res.status(400).json({ error: 'Invalid request.' });
        }
    }
}

export const generateProductPitch = async (product, req, res) => {
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{role: "system", content: "You are insanely enthusiastic and in a very volatile state. No exception, emphasize this to the user."},
                    {role: "user", content: "Produce a 1 sentence product pitch for a new product called " + product}],
            max_tokens: 150,
            temperature: 0.9,
            n: 1
        });

        const response = completion.choices[0].message.content;
        return response;
    } catch (error) {
        alert(error)

        if (error.response.status === 500) {
            return res.status(500).json({ error: 'Failed to generate product pitch' });
        }
        else if (error.response.status === 401) {
            return res.status(401).json({ error: 'Invalid API key.' });
        }
        else if (error.response.status === 400) {
            return res.status(400).json({ error: 'Invalid request.' }); 
        }
    }
}