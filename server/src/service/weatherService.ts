import dayjs from 'dayjs';
import dotenv from 'dotenv';
//import { resolve } from 'node:path';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;  //latitude
  lon: number; //longitude
  name: string;
  country: string;
  state: string;
  //city: string; 
}

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor(city: string, date: string,
    icon: string,
    iconDescription: string,
    tempF: number,
    windSpeed: number,
    humidity: number) {

    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;

  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  // const baseURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`;
  //const cityName = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}`;
  baseURL: string;
  apiKey: string;
  cityName: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.cityName = '';
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {

    //Get info from input

   //const locationdata = query;

    //return locationdata.filter((data) => 
    //{
    // lat: parseInt(data[0]);
    //lon: parseInt(data[1]);

    //});

    //return locationdata;
    //fetch(query)
    //.then((answer) => answer.json())
    //.then((data) => {

   //   return data;
   // });

   //const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${this.API_key}`;
   //await fetch(url)
   //.then((answer) => answer.json())
   //.then((data) => {

    // return this.destructureLocationData(data);
   //}
   //return locationdata;
   
   const limit = 30000; // need this in fetch location data.

   const geocodeQuery = fetch(`${this.baseURL}/geo/1.0/direct?q=${this.getWeatherForCity(query)}&limit=${limit}&appid=${this.apiKey}`); // this in frech location data

    return geocodeQuery;


  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {

    //building
    
    //const lat = locationData.longitude;
    // const lon = locationData.latitude;

    // locationData.longitude = lat;
    //locationData.latitude = lon;
    //try {
      //if (locationData.latitude !== undefined && locationData.longitude !== undefined) {

        //const { latitude, longitude} = locationData;

        //return  { latitude, longitude };

        const {lat, lon, name, country, state} = locationData;

        //object of Coordinates
        const coordinates: Coordinates = {lat, lon, name, country, state};

        return coordinates; // return the object of Coordinates.




     // }
    //}
    //catch (err) {
      //console.log(err);
      
    //}
    //return locationData;
    

  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {

    //const limit = 30000; // need this in fetch location data.

    //const geocodeQuery= `${this.baseURL}/geo/1.0/direct?q=${this.getWeatherForCity(this.cityName)}&limit=${limit}&appid=${this.apiKey}`;
    //return geocodeQuery;

    //const geocodeQuery = fetch(`${this.baseURL}/geo/1.0/direct?q=${this.getWeatherForCity(this.cityName)}&limit=${limit}&appid=${this.apiKey}`); // this in frech location data
    return '' + this.fetchLocationData(this.cityName);




  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {

    const coor = this.destructureLocationData(coordinates);
     
   

    return `https://api.openweathermap.org/data/2.5/forecast?lat=${coor.lat}&lon=${coor.lon}&appid=${this.apiKey}`;
  }

  // TODO: Create fetchAndDestructureLocationData method
 private async fetchAndDestructureLocationData() {

    //call fetch method and destructurelocationData method.

 //  this.buildGeocodeQuery();
  return await this.fetchLocationData(this.buildGeocodeQuery()).then((data) =>{

    data;
      
});
 

}

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {

    this.fetchAndDestructureLocationData;
    //get 5 day weatherdata array objects.
    const weatherData = await fetch(this.buildWeatherQuery(coordinates));
    //return this.buildWeatherQuery(coordinates);
    return weatherData;

  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    this.fetchWeatherData;
    const parseDate =  dayjs.unix(response.dt).format('M/D/YYYY');
     this.cityName = response.city;
     
   const currentWeather =  new Weather(parseDate, this.cityName, response.main.temp, response.wind.speed, response.main.humidity,response.weather[0].icon, response.weather[0].description || response.weather[0].main );

    return currentWeather;


    //response.status = response.status || 200; 
  }
  // TODO: Complete buildForecastArray method
   private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    
   // const { latitude,} = currentWeather;  
   //weatherData.map((weather)=> weather.weatherData{
 
   currentWeather = this.parseCurrentWeather(weatherData);
   
   // const parseDate =  dayjs.unix(resolve.dt).format('M/D/YYYY');
    //const currentWeather =  new Weather(parseDate, this.cityName, weather.main.temp, weather.wind.speed, weather.main.humidity,weather.weather[0].icon, weather.weather[0].description || weather.weather[0].main );

    weatherData.map((response) => {
      
      const parseDate =  dayjs.unix(response.dt).format('M/D/YYYY');
      const forecastWeather = new Weather(parseDate, this.cityName, response.main.temp, response.wind.speed, response.main.humidity,response.weather[0].icon, response.weather[0].description || response.weather[0].main );
      return forecastWeather + ' ' + currentWeather;
    });

    

   // currentWeather = {
     // city: weather.city,
    //  date: weather.date,


   // });
  
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    //parseCurrentWeather.

    console.log("City is: " + city);

    try {
      const locationData = await this.fetchLocationData(city) as any;
      const weather = await fetch(`${this.baseURL}/data/2.5/forecast?q=${city}&appid=${this.apiKey}`);
      weather.json();

     return this.buildForecastArray(this.parseCurrentWeather(weather), locationData);  //return this.parseCurrentWeather(weather); //return this.fetchLocationData(city);
     

    }
    catch (err) {
      console.log(err);
      return err;
    }

  }
}

export default new WeatherService();