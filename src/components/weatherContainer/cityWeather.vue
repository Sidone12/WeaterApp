<template>
<!-- <div class="weather_container" v-if="typeof weather.name != 'undefined'"> -->
<div class="weather_container">
    <div class="current_forecast">
        <div class="weather_title_wrapper">
            <div>
                <h1>{{ props.weather.name }} {{ props.weather.sys.country }}</h1>
                <h3>
                    <i>{{ dateBuilder() }}</i>
                </h3>
                <div class="button_container">
                    <actionButton @click="toggleWeatherInfo" :text="weatherInfo ? 'Day':'Week'" />
                    <button
                    :class="isFavorite ? 'favotite': 'not_favorite'" 
                      @click="onToggleFavorite"
                      class="favorite_button"><i class="uil uil-star"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="weather_box">
            <div class="temp">
                <img :src="`http://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`" alt />
                <h1 class="current_degree">{{ Math.round(props.weather.main.temp) }}°c</h1>
            </div>
            <div class="weather_feels">
                <p>
                    Feels like {{ props.weather.main.feels_like }},{{ props.weather.weather[0].main }}, {{ props.weather.weather[0].description }}
                </p>
            </div>
            <div class="weather_option">
                <p>Visibility: {{ props.weather.visibility / 1000 }}m.</p>
                <p>Wind speed: {{ props.weather.wind.speed }} m/s</p>
                <p>Humidity: {{ props.weather.main.humidity }}%</p>
                <p v-if="props.weather.snow">snow: {{ props.weather.snow["1h"] }}mm</p>
            </div>
        </div>
    </div>

    <div v-if="!weatherInfo">
        <div v-if="isLoaded">
            <weatherСhart :city="props.weather.name" :weatherData="hourlyData" />
        </div>
        <div v-if="!isLoaded">loading...</div>
    </div>

    <fiveDayForecast v-if="weatherInfo" :weekWeather="weekData" />
</div>
</template>

<script setup>
/* Imports */
import actionButton from '@/components/shared/actionButton.vue';
import weatherСhart from '@/components/shared/weatherСhart.vue';
import fiveDayForecast from "@/components/shared/fiveDayForecast.vue";
import { ref, computed, onMounted } from 'vue'
import weatherApi from "@/api";
import { useWeather } from '@/store/weather';
import { defineProps } from 'vue'

/* Store */
const weatherStore = useWeather()
/* Props */
const props = defineProps({
    weather: {
        type: Object
    }
})


/* Variables */
let weatherInfo = ref(false)
let weather = ref({})
let weekData = ref([])
let hourlyData = ref([])
let isLoaded = ref(false)

let isFavorite = computed(() => {
  return weatherStore.favoriteCities.includes(props.weather.name)
  
})



const toggleWeatherInfo = () => {
  weatherInfo.value = !weatherInfo.value
}

const onToggleFavorite = () => {
  weatherStore.addFavoriteCity(props.weather.name)
  // console.log('props.weather.name', props.weather.name)
  
}


onMounted(async() => {
   await weatherApi.getWeatherForFiveDays(props.weather.name).then(async(result) => {
    await processData(result);
    // console.log('getWeatherForFiveDays info', result)
});
})

const processData = (allData) => {
    const weekValue = [];
    let savedDay = -1;
    let savedHours = -1;
    let daylyValue = [];

    allData.list.every((element) => {
        // додаємо в масив лише перших 5 елементів
        if (daylyValue.length < 5) {
            daylyValue.push(element);
        }
        const date = new Date(element.dt * 1000);
        const day = date.getDate();
        if (savedHours < 0) {
            savedHours = date.getHours();
        }
        if (savedDay !== day && savedHours == date.getHours()) {
            weekValue.push(element);
            savedDay = day;
        }
        if (weekValue.length > 4) {
            return false;
        }
        return true;
    });
    weekData = weekValue;
    hourlyData = daylyValue;
    isLoaded = true;
    weatherInfo.value = true
    // console.log('hourlyData', hourlyData)
    // console.log('this.weekData', weekData)
    // console.log('this.isLoaded', isLoaded)
}




// /* Store */
// const weatherStore = useWeather()

// onMounted(weatherStore.addUserWeater)

// // console.log("store for home", weatherStore.weathers)
// const weathers = computed(() => {
//     // console.log('weatherStore.weathers', weatherStore.weathers)
//     return weatherStore.weathers
// }); 

// const weekData =ref([])
// const hourlyData = ref([])
// const isLoaded =ref(false)
// const weatherInfo = ref(true)

// weatherApi.getWeatherForFiveDays(this.city).then((result) => {
//       this.processData(result);
//       console.log('getWeatherForFiveDays info',result)
//     });

// const processData=(allData)=> {
//       const weekValue = [];
//       let savedDay = -1;
//       let savedHours = -1;
//       let daylyValue = [];

//       allData.list.every((element) => {
//         // додаємо в масив лише перших 5 елементів
//         if (daylyValue.length < 5) {
//           daylyValue.push(element);
//         }
//         const date = new Date(element.dt * 1000);
//         const day = date.getDate();
//         if (savedHours < 0) {
//           savedHours = date.getHours();
//         }
//         if (savedDay !== day && savedHours == date.getHours()) {
//           weekValue.push(element);
//           savedDay = day;
//         }
//         if (weekValue.length > 4) {
//           return false;
//         }
//         return true;
//       });

//       weekData = weekValue;
//       hourlyData = daylyValue;
//       isLoaded = true;
//     }






// const hourlyData = computed(() => {
//     console.log('weatherStore.hourlyData', weatherStore.hourlyData)
//     return weatherStore.hourlyData
// }); 
// const isLoaded = computed(() => {
//     // console.log('weatherStore.weathers', weatherStore.weathers)
//     return weatherStore.isLoaded
// });
// const weekData = computed(() => {
//     console.log('weatherStore.weekData', weatherStore.weekData)
//     return weatherStore.weekData
// }); 

// const weatherInfo = ref(true)
// const toggleWeatherInfo = () => {
//     weatherInfo.value = !weatherInfo.value;
// }



/* Date builder for correct  date view in component */
const dateBuilder = () => {
    let d = new Date();
    let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return ` ${d.toLocaleString("en-US", options)}`;
}
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

.favotite {
    color: #1b00ff;
}

.not_favorite {
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

@media screen and (max-width: 800px),
screen and (max-width: 800px) and (min-width: 1px) {
    .weather_container {
        display: block;
    }
    .current_forecast {
        border: none;
        max-width: 100%;
        flex-direction: row;
        justify-content: space-evenly;
    }
    .weather_title_wrapper {
        width: max-content;
    }
    .weather_feels {
        border: none;
    }
    .weather_box {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1rem;
        margin-left: 20px;
    }
    .forecast_wrapper {
        justify-content: flex-start;
    }
}

@media screen and (max-width: 600px),
screen and (max-width: 600px) and (min-width: 1px) {
    .current_forecast {
        display: block;
    }
}

@media screen and (max-width: 500px),
screen and (max-width: 500px) and (min-width: 1px) {
    .weather_box {
        display: block;
    }
}
</style>
  