export const audioToText = async (url, file) => {
    try {
      // Create a FormData object and append the Blob and other parameters
      const formData = new FormData();
      console.log(file)
      formData.append('file', file); // Name the file appropriately
      formData.append('providers', "google"); // Example provider
      formData.append('language', "en-US");   // Specify language code if necessary

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODQ1NmM1OGMtZmYyZC00MzUwLWE4ODctNzIzYjVmYmQ5ZGJiIiwidHlwZSI6ImFwaV90b2tlbiJ9.gre9WIv0P_YyBw9CRX34ocQjw1KixUDun45mxB0rFN0",
          "Host": "api.edenai.run",
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Connection": "keep-alive",
          "Content-Length": "263755"
        },
        body: JSON.stringify(formData)
        });

      const result = await response.json()
      return result
  } catch (error) {
    alert("An error occured. " + error.message)
  }
}