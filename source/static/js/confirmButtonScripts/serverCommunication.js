function sendDataToServer(jsonData) {
  const serverEndpoint = 'your-server-endpoint';

  return fetch(serverEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
}

export { sendDataToServer };