// const externalApiUrl = 'https://api.ims.gov.il/V1/Envista/stations';
// const apiToken = '6d2dd889-3fcf-4987-986f-e4679d4b2400';

// // Define an endpoint to proxy requests to the external API
// app.get('/api/envista/stations', async (req, res) => {
//   try {
//     const response = await axios.get(externalApiUrl, {
//       headers: {
//         'Authorization': `ApiToken ${apiToken}`
//       }
//     });
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching data from external API:', error);
//     res.status(500).json({ error: 'An error occurred while fetching data from the external API' });
//   }
// });

// app.get('/getWeather/:stationNum/:year/:month/:day', async (req, res) => {
//     try {
//         const { stationNum, year, month, day } = req.params;
//         const apiUrl = `https://api.ims.gov.il/v1/envista/stations/${stationNum}/data/daily/${year}/${month}/${day}`;
//         const response = await axios.get(apiUrl);
//         res.json(response.data);
//     } catch (error) {
//         console.error('Error fetching weather data:', error);
//         res.status(500).json({ error: 'Failed to fetch weather data' });
//     }
// });

// app.listen(port, () => {
//   console.log(`Backend server listening at http://localhost:${port}`);
// });


const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
const externalApiUrl = 'https://api.ims.gov.il/V1/Envista/stations';
const apiToken = '6d2dd889-3fcf-4987-986f-e4679d4b2400';
app.get('/api/envista/stations', async (req, res) => {
  try {
    const response = await axios.get(externalApiUrl, {
      headers: {
        'Authorization': `ApiToken ${apiToken}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from external API:', error);
    res.status(500).json({ error: 'An error occurred while fetching data from the external API' });
  }
});
// Define your API endpoints
app.get('/getWeather/:stationNum/:year/:month/:day', async (req, res) => {
    try {
        const { stationNum, year, month, day } = req.params;
        const apiUrl = `https://api.ims.gov.il/v1/envista/stations/${stationNum}/data/daily/${year}/${month}/${day}`;
        const response = await axios.get(apiUrl, {
            headers: {
              'Authorization': `ApiToken ${apiToken}`
            }
          });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

