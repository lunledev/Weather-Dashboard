import fs from 'node:fs/promises';
import {v4 as uuidv4} from 'uuid';


// TODO: Define a City class with name and id properties
class City {

  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {

    return await fs.readFile('db/searchHistory.json', 'utf8');
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) { 

    return await fs.writeFile('db/searchHistory.json',JSON.stringify(cities));
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() { 
    return await this.read().then((cities) =>{
      let arrofcityobj: City[];
      try {
        arrofcityobj = [].concat(JSON.parse(cities));
      }
      catch (err) {

        arrofcityobj = [];
      }

      return arrofcityobj;
    }
  
  );
  
}
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) { 

    if(!city){
       throw new Error('city cannot be blank');

    }
    const citywithID: City = {
      name: city, 
      id: uuidv4()
    
    };
    return await  this.getCities().then((cities) => {
      if(cities.find((idRef) => idRef.name === city)) {
        return cities;
      }  

      //create a new array that includes both cities and citywithID.
      return [...cities, citywithID];



    }).then ((citiesUpdate) => this.write(citiesUpdate))
    .then(() => citywithID);

  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    return this.getCities().then((city) => city.filter((cities) => cities.id === id))
    .then((selectedcity) => this.write(selectedcity));
  

  }
}

export default new HistoryService();
