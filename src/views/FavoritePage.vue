<template>
<div class="wrapper">
    <nav>
        <actionButton @click="router.push('/')" text="HOME" />
        <actionButton @click="router.push('/favoritepage')" text="FAVORITE" />
    </nav>
    <cityWeather v-for="weather in favoriteWeather" :weather="weather" />
</div>
</template>
    
<script setup>
/* Imports */
import actionButton from '@/components/shared/actionButton.vue';
import { useRouter } from "vue-router";
import cityWeather from '@/components/weatherContainer/cityWeather.vue'
import { computed } from 'vue'
/* Router */
const router = useRouter();
/*Store */
import { useWeather } from '@/store/weather';

const weatherStore = useWeather();


const favoriteWeather = computed(() => {
    return weatherStore.weathersForFavoriteCity
});

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
    