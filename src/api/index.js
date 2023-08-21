const url_base = 'https://api.openweathermap.org/data/2.5/';
const api_key = "8975af225d84606c6281c8b45039499c";

function getRequestUrl(method, query) {
    return `${url_base}${method}?q=${query}&units=metric&APPID=${api_key}`
}

export default {
    getWeatherByCity: function (city) {
        return fetch(getRequestUrl("weather", city))
            .then(res => {
                return res.json();
            })
    },
    getWeatherForFiveDays: function (city) {
        return fetch(getRequestUrl("forecast", city))
            .then(res => {
                return res.json();
            })
    },
    findCity: function (city) {
        return fetch(getRequestUrl("find", city))
            .then(res => {
                return res.json();
            })
    },
    /* отримуємо місто з якого зайшли */
    getUserInfo: function() {
        return fetch('https://ipapi.co/json/')
            .then(res => {
                return res.json();
            })
    }
}