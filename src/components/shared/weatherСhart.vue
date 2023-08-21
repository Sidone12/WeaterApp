<template>
  <div class="chart_container">
    <div class="chart_wrapper">
      <canvas :id="'chart-'+ city">{{ props.city }}</canvas>
    </div>
  </div>
</template>

<script setup>
import {onMounted} from 'vue'
/* Props */
const props = defineProps({
  city: {
      type: String,
    },
    weatherData: {
      type: Array,
    },
})

/* onMounted */
onMounted(()=>{
    const labels = [];
    const temperatures = [];

    props.weatherData.forEach((element) => {
      let time = new Date(element.dt * 1000);
      temperatures.push(element.main.temp);
      labels.push(time.toLocaleTimeString());
    });

    const ctx = document.getElementById(`chart-` + props.city);

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Day temperature",
            data: temperatures,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: { 
                        callback: function (value) { 
                            return `${value} °C`
                        } 
                    } 
          },
        },
      },
    });
  })
</script>

<style scoped>
.chart_container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  width: 100%;
}
.chart_wrapper {
  display: flex;
  width: 350px;
}
@media screen and (max-width: 800px), screen and (max-width: 800px) and (min-width: 1px) {
  .chart_wrapper{
    width: 300px;
  }
  .chart_container{
    border-top: 1px solid rgba(0, 0, 0, 0.25);;
  }
}
@media screen and (max-width: 500px), screen and (max-width: 500px) and (min-width: 1px) {
  .chart_wrapper{
    width: 300px;
  }
  .chart_container{
    border-top: 1px solid rgba(0, 0, 0, 0.25);;
  }
}
@media screen and (max-width: 400px), screen and (max-width: 400px) and (min-width: 1px) {
  .chart_wrapper{
    width: 250px;
  }
  .chart_container{
    border-top: 1px solid rgba(0, 0, 0, 0.25);;
  }
}
</style>