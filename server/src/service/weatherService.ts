import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
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

   const locationdata = query;

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
   return locationdata;


    


  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {


    //const lat = locationData.longitude;
    // const lon = locationData.latitude;

    // locationData.longitude = lat;
    //locationData.latitude = lon;
    //try {
      //if (locationData.latitude !== undefined && locationData.longitude !== undefined) {

        const { latitude, longitude} = locationData;

        return  { latitude, longitude };

     // }
    //}
    //catch (err) {
      //console.log(err);
      
    //}
    //return locationData;
    

  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {

    const limit = 30000;
    const geocodeQuery = fetch(`${this.baseURL}/geo/1.0/direct?q=${this.getWeatherForCity(this.cityName)}&limit=${limit}&appid=${this.apiKey}`);
    return '' + this.fetchLocationData(geocodeQuery.toString());




  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {

    const coor = this.destructureLocationData(coordinates);
     
   

    return `https://api.openweathermap.org/data/2.5/forecast?lat=${coor.latitude}&lon=${coor.longitude}&appid=${this.apiKey}`;
  }

  // TODO: Create fetchAndDestructureLocationData method
 private async fetchAndDestructureLocationData() {

   this.buildGeocodeQuery();

 }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {

    return this.buildWeatherQuery(coordinates);

  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    
    response.status = response.status || 200; 

  // TODO: Complete buildForecastArray method
   private buildForecastArray(currentWeather: Weather, weatherData: any[]) {

    const { latitude,} = currentWeather;  
   }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {

    try {

      const weather = await fetch(`${this.baseURL}/data/2.5/forecast?q=${city}&appid=${this.apiKey}`);
      weather.json();

      return await this.buildForecastArray(weather, weather.data);


    }
    catch (err) {
      console.log(err);
      return err;
    }

  }
}

export default new WeatherService();
