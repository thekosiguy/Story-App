export async function speechToText(file) {
    try {
      const formData = new FormData();
      formData.append('model', 'whisper-1');
      formData.append('file', file);
      formData.append('response_format', 'text');

      const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
          headers: { Authorization: 'Bearer ' + process.env['REACT_APP_OPENAI_API_KEY']},
          method: 'POST',
          body: formData,
      });

      const text = await res.text();
      alert("Transcription: " + text);
    } catch (error) {
      alert("Error: " + error.message);
    }
}