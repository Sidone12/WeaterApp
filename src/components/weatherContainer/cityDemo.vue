<template>
    <div class="current_forecast" v-for="weather in weathers">
        <div class="weather_title_wrapper">
          <div>
            <h1>{{ weather.name }} {{ weather.sys.country }}</h1>
            <h3>
              <!-- <i>{{ dateBuilder() }}</i> -->
            </h3>
            <div class="button_container">
              <!-- <actionButton @click="toggleWeatherInfo" :text="weatherInfo ? 'Day':'Week'" /> -->
              <!-- <button :class="isFavorite ? 'favotite': 'not_favorite'" class="favorite_button" @click="onToggleFavorite">
                <i class="uil uil-star"></i>
              </button> -->
            </div>
          </div>
        </div>
        <div class="weather_box">
          <div class="temp">
            <img :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" alt />
            <h1 class="current_degree">{{ Math.round(weather.main.temp) }}°c</h1>
          </div>
          <div class="weather_feels">
            <p>
              Feels like {{ weather.main.feels_like }},{{ weather.weather[0].main }},
              {{ weather.weather[0].description }}
            </p>
          </div>
          <div class="weather_option">
            <p>Visibility: {{ weather.visibility / 1000 }}m.</p>
            <p>Wind speed: {{ weather.wind.speed }} m/s</p>
            <p>Humidity: {{ weather.main.humidity }}%</p>
            <!-- <p v-if="weather.snow">snow: {{ weather.snow["1h"] }}mm</p> -->
          </div>
        </div>
      </div>
</template>

<script setup>
/* Imports */
import { useWeather } from '@/store/weather';
import { computed } from 'vue'

/* Store */
const weatherStore = useWeather()

// console.log("store for home", weatherStore.weathers)

const weathers = computed(() => {
    // console.log('weatherStore.weathers', weatherStore.weathers)
    return weatherStore.weathers
});
</script>

<style scoped>
  .weather_container {
    display: flex;
    width: 100%;
    height: auto;
    border-radius: 5px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
    transition: 0.4s;
    margin: 20px 0;
  }
  
  .weather_container:hover {
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
  }
  .button_container {
    display: flex;
    align-items: flex-end;
    margin-top: 10px;
  }
  .favorite_button {
    font-size: 30px;
    border: none;
    background: none;
  }
  .favotite{
    color: #1b00ff;
  }
  .not_favorite{
    color: #8b8b8b;
  }
  
  .current_forecast {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    max-width: 300px;
    min-width: 300px;
    padding-right: auto;
    border-right: 1px solid rgba(0, 0, 0, 0.25);
  }
  
  h1 {
    font-size: 30px;
  }
  
  h3 {
    font-size: 14px;
  }
  
  .weather_title {
    display: flex;
    flex-direction: column;
  }
  .weather_title_wrapper {
    display: flex;
    width: 100%;
    justify-content: space-between;
    text-align: left;
    margin-bottom: 15px;
  }
  .day_week {
    padding: 5px 15px;
    width: 70px;
  }
  
  .degree {
    font-size: 50px;
  }
  
  .temp {
    display: flex;
    align-items: center;
  }
  .temp img {
    width: 60px;
  }
  .temp .current_degree {
    font-size: 45px;
  }
  .weather_feels {
    display: flex;
    text-align: left;
    font-size: 14px;
    line-height: 20px;
    font-weight: 700;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }
  
  .weather_option {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 10px;
    font-size: 14px;
  }
  
  .five_day_forecast {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    border-left: 1px solid rgba(0, 0, 0, 0.25);
  }
  
  .five_day_forecast h2 {
    margin-bottom: 10px;
  }
  
  .five_day_container {
    display: flex;
    margin-top: 5px;
  }
  
  .five_day_container p {
    padding-right: 5px;
    font-size: 14px;
  }
  @media screen and (max-width: 800px), screen and (max-width: 800px) and (min-width: 1px) {
    .weather_container{
      display: block;
    }
    .current_forecast{
      border: none;
      max-width: 100%;
      flex-direction: row;
      justify-content: space-evenly;
    }
    .weather_title_wrapper{
      width: max-content;
    }
    .weather_feels{
      border: none;
    }
    .weather_box{
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem; 
      margin-left: 20px;
    }
    .forecast_wrapper{
      justify-content: flex-start;
    }
  
  }
  @media screen and (max-width: 600px), screen and (max-width: 600px) and (min-width: 1px) {
    .current_forecast{
      display: block;
    }
  }
  @media screen and (max-width: 500px), screen and (max-width: 500px) and (min-width: 1px) {
    .weather_box{
      display: block;
    }
  }
  
</style>
  