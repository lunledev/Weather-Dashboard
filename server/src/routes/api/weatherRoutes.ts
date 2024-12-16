import { Router } from 'express';
const router = Router();

 import HistoryService from '../../service/historyService.js';
 import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  // TODO: GET weather data from city name
  const {city_name} = req.body;  
  // TODO: save city to search history
  if(req.body) {
    await HistoryService.addCity(city_name);
    res.json('city added successfully');
  }
  else {
    res.send('error in adding city');
  }

  }
});

// TODO: GET search history
router.get('/history', async (req, res) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {});

export default router;
