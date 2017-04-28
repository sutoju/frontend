<template>
  <div>
    <div class="title-first">Charts</div>
    <chart v-bind:options="chartOptions" v-bind:chartData="chartData"></chart>
  </div>
</template>

<script>
import Chart from './Chart'

const chartData = {
  datasets: [
    {
      label: 'dataset 1',
      backgroundColor: '#79f8aa',
      data: [
        { x: 0, y: 10 },
        { x: 1, y: 12 },
        { x: 2, y: 10 },
        { x: 3, y: 13 },
        { x: 4, y: 12 },
        { x: 5, y: 9 }
      ]
    }
  ]
}

const chartOptions = {
  labels: ['label1', 'label2']
}

export default {
  name: 'charts',
  components: {
    Chart
  },
  data () {
    return {
      chartData,
      chartOptions
    }
  }
}
</script>

<style lang="scss">
@import '../main.scss';
</style>
