import { defineStore } from "pinia";
import weatherApi from "@/api";

export const useWeather = defineStore("weather", {
  state: () => ({
    city: [],
    favoriteCities: [],
    weathers: [],
    weathersForFavoriteCity:[]
  }),
  actions: {
    addUserWeater() {
      weatherApi.getUserInfo().then((result) => {
        if (this.city.some((city) => city == [result.city])) {
          return
        } else {
          this.city = [result.city];
                this.addWeatherByCity(result.city)
                this.getWeatherForFiveDays(result.city)
        }
      });
    },
    addWeatherByCity(city) {
      weatherApi.getWeatherByCity(city).then((result) => {
        this.weathers.push(result)
      });
    },
    addNewCity(city) {
      if (this.city.some((value) => value == city)) {
        return console.log("YOu already has this city")
      } else {
        this.city.push(city)
      console.log('all sities from store', this.city)
      this.addWeatherByCity(city)
      this.getWeatherForFiveDays(city)
      }
      
    },
    getWeatherForFiveDays(city) {
      weatherApi.getWeatherForFiveDays(city).then((result) => {
      });
    },
    addFavoriteCity(city, onlyAdd) {
      const index = this.favoriteCities.indexOf(city);
      if (index > -1) {
        if (onlyAdd) {
          return;
        }
        if (!confirm('are you sure?')) {
          return
        }
        this.favoriteCities.splice(index, 1);
        this.weathersForFavoriteCity.splice(index, 1);

      } else {

        if (this.favoriteCities.length >= 5) {
          alert("First delete one city");
          return;
        }
        this.favoriteCities.push(city);
        weatherApi.getWeatherByCity(city).then((result) => {
          this.weathersForFavoriteCity.push(result)
        });
      }
      console.log('this.favoriteCities store', this.favoriteCities)
    }
  }
});
