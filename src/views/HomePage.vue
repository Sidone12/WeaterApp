<template>
    <div class="wrapper">
        <nav>
            <actionButton @click="router.push('/')" text="HOME" />
            <actionButton @click="router.push('/favoritepage')" text="FAVORITE" />
        </nav>
        <AutoCompleateInput @cityValue="onInputSelectCity"/>
        <cityWeather v-for="weather in weathers" :weather="weather" />
    </div>
</template>

<script setup>
/* Imports */
import AutoCompleateInput from '@/components/Shared/autoCompleateInput.vue';
import actionButton from '@/components/shared/actionButton.vue';
import { onMounted, computed } from 'vue'
import { useRouter } from "vue-router";
import { useWeather } from '@/store/weather';
import cityWeather from '@/components/weatherContainer/cityWeather.vue'
/* Router */
const router = useRouter();
/* Store */
const weatherStore = useWeather()

const onInputSelectCity = (city) => {
    weatherStore.addNewCity(city)
}

onMounted(weatherStore.addUserWeater)

// console.log("store for home", weatherStore.weathers)
const weathers = computed(() => {
    // console.log('weatherStore.weathers', weatherStore.weathers)
    return weatherStore.weathers
});






// /* Router */
// const router = useRouter();
// /* Store */
// const cityWeatherStore = useCityWeatherStore()
// /* Add our location city to store */
// onMounted(() => {
//     weatherApi.getUserInfo().then(async(result) => {
//        await cityWeatherStore.addCityToCities(result)
//        await cityWeatherStore.addWeatherByCity(result.city)
//        await weatherApi.getWeatherByCity(result.city).then((result) => {
//             // console.log('city',city)
//             console.log('result',result)
//             weather.value = result;
//             console.log('home weather', weather.value)
//         })
//     })
// })

</script>

<style scoped>
.wrapper {
    max-width: 800px;
    margin: 135px auto;
    background: #fff;
    border-radius: 7px;
    padding: 20px;
}

.search_box {
    width: 100%;
    margin-bottom: 30px;
    display: flex;
}

.search_box .search_bar {
    display: block;
    width: 100%;
    width: 100%;
    margin: 0 40px;
    padding: 15px;
    color: #313131;
    font-size: 20px;
    border-radius: 5px;
    border: none;
    outline: none;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.5);
    transition: 0.4s;
}

.active {
    background-color: rgb(169 169 169 / 50%) !important;
}

.search_box .search_bar:hover {
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
}

.slide-enter-active,
.slide-leave-active {
    transition: opacity 1s, transform 0.7s;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(-30%);
}

@media screen and (max-width: 800px),
screen and (max-width: 800px) and (min-width: 1px) {
    .wrapper {
        max-width: 800px;
        margin: 10px auto;
        background: #fff;
        border-radius: 7px;
        padding: 20px;
    }
}
</style>
