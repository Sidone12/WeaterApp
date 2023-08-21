<template>
<div class="forecast_container">
    <h3 class="subheader">Forecast for 5 days</h3>
    <div class="forecast_wrapper" v-for="weather in weekWeather" :key="weather.index">
        <div>
            <span class="date"><b><i>{{ dateBuilder(weather.dt)}}</i></b></span>
        </div>
        <div>
            <div class="temperature_wrapper">
                <div class="temperature">
                    <img :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" alt />
                    <span class="min_max_temperature">{{ weather.main.temp_max }}/{{ weather.main.temp_min }}°C.</span>
                </div>
                <span class="description"><i>{{ weather.weather[0].description }}</i></span>
            </div>
        </div>
    </div>
</div>
</template>


<script setup>
/* Props */
const props = defineProps({
  weekWeather: {
            type: Array,
        },
})

/* Date builder */
const dateBuilder = (value)=> {
            let d = new Date(value * 1000);
            let options = {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
            };
            return ` ${d.toLocaleString("en-US", options)}`;
        }
</script>


<style scoped>
.forecast_container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 20px;
    min-width: 300px;
    padding-right: auto;
    text-align: start;
}

.subheader {
    margin-bottom: 20px;
    padding-bottom: 10px;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}

.forecast_wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.temperature_wrapper {
    display: flex;
    min-width: 210px;
    align-items: center;
    justify-content: space-between;
    text-align: right;
}

.temperature {
    display: flex;
    align-items: center;
}

.date {
    font-size: 14px;
}

.min_max_temperature,
.description {
    font-size: 12px;
}

.forecast_wrapper span {
    padding-right: 5px;
    flex-grow: 1;
}

.forecast_wrapper img {
    width: 30px;
}

@media screen and (max-width: 800px),
screen and (max-width: 800px) and (min-width: 1px) {
    .forecast_wrapper {
        justify-content: flex-start;
    }
}

@media screen and (max-width: 430px),
screen and (max-width: 430px) and (min-width: 1px) {
    .forecast_wrapper {
        display: block;
        padding: 10px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    }
    .temperature_wrapper {
        display: block;
        text-align: left;
    }
}
</style>