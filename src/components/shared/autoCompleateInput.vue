<template>
<div class="search_box">
    <div class="search_wrapper">
        <input type="text" class="search_bar" placeholder="Search...." v-model="search" />
        <div class="loading">
            <span v-if="isLoading">Loading...</span>
        </div>
    </div>
    <div class="error_bar" v-if="error?.length > 0">
        <p>{{ error }}</p>
    </div>
    <div class="found_city_wraper" v-if="options?.length > 0">
        <button
          v-for="city in options"
          :key="city"
          @click="onSelectCity(city)"
          class="found_city">{{ city.name }} {{ city.sys.country }}</button>
    </div>
</div>
</template>
  
<script setup>
/* Imports */
import weatherApi from "../../api"
import { ref, watch } from "vue";

/* Constants */
const search = ref('');
const error = ref('')
const options = ref([])
const date = ref(null)
const isLoading = ref(false)

/* Emits */
const emit = defineEmits(['cityValue'])

const onSelectCity = (city) => {
    emit("cityValue", city.name);
    options.value = [];
    search.value = '';
}

/* Watchers*/
watch(search, (value) => {
    const currentDate = Date.now();
    date.value = currentDate;
    isLoading.value = true;
    setTimeout(function() {
        if (date.value != currentDate) {
            // знову натиснувся інпут
            return;
        }
        if (value.length < 4) {
            // ввели менше 4 символів
            error.value = "add more symbols";
            isLoading.value = false;
            return;
        }
        error.value = null;
        weatherApi
            .findCity(search.value)
            .then((result) => {
                if (result.count < 1) {
                    // отримали помилку що немає результатів
                    options.value = null;
                    error.value = "no such city";
                    return;
                }
                //   отримали результат
                options.value = result.list;
            })
            .catch((error) => {
                console.error(error);
                error.value = "Api error";
            })
            .finally(() => {
                isLoading.value = false;
            });
    }, 1000);
})
</script>
  
<style scoped>
.search_box {
    width: 100%;
    margin-bottom: 30px;
    position: relative;
    background: none;
    display: flex;
    flex-direction: column;
}

.search_wrapper {
    display: flex;
    width: 100%;
    background: none;
}

.search_box .search_bar {
    width: 100%;
    border-radius: 5px;
    padding: 15px;
}

.loading {
    position: absolute;
    top: 20px;
    right: 50px;
}

.found_city {
    width: 100%;
    padding: 15px;
    text-align: left;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255);
    border: none;
    transition: 0.4s;
    cursor: pointer;
}

.error_bar {
    padding: 15px;
    transition: 0.4s;
    position: absolute;
    width: 300px;
    top: 50px;
    left: 40px;
    background-color: rgba(255, 255, 255);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
}

.search_box .search_bar,
.found_city_wraper {
    margin: 0 40px;
    color: #313131;
    font-size: 20px;
    border: none;
    outline: none;
    background: none;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    transition: 0.4s;
}

.found_city_wraper {
    position: absolute;
    top: 50px;
    width: 300px;
}

.error_bar,
.found_city {
    border-radius: 0 0 5px 5px;
}

.search_box .search_bar:hover {
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
}

.error_bar:hover,
.found_city:hover {
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
}

@media screen and (max-width: 800px),
screen and (max-width: 800px) and (min-width: 1px) {
    .search_box .search_bar {
        margin: 0;
        border: 1px solid rgba(0, 0, 0, 0.25);
    }
    .error_bar,
    .found_city_wraper {
        left: 0;
        margin: 0;
    }
}
</style>