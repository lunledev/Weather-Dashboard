import { Router } from 'express';
const router = Router();

 import HistoryService from '../../service/historyService.js';
 import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  // TODO: GET weather data from city name
   console.log(req.body);

  const {cityName} = req.body;  

  // TODO: save city to search history
  console.log("city name: " + cityName);
  if(cityName) {
    await HistoryService.addCity(cityName);
    
   WeatherService.getWeatherForCity(cityName).then((data) =>
    {
      
      return res.json(data);


    });

    //console.log("citydata: " + citydata);

    
    //res.json(data + 'city added successfully');
    
  }
  else {
    res.status(400).send('error in adding city');
  }

});

// TODO: GET search history
router.get('/history', async (_req, res) => {
try{

  const savedcityname = await HistoryService.getCities();
  console.log("testA: "+ JSON.stringify(savedcityname));
  res.json(savedcityname);

  

 
  
}
catch(err) {
  console.log(err);
  res.status(500).json(err);

}
  

});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
try
{
  if(!req.params.id) {

    res.status(400).json(
      { message: 'city id is required'}
      
      );
      await HistoryService.removeCity(req.params.id);
      res.json({success:'city successfully removed from search history'});
  }

}
catch(err) {

  console.log(err); 
  res.status(500).json(err);


}


});

export default router;
