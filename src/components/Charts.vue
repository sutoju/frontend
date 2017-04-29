<template>
  <div class="container fluid">
    <div class="title-first">Charts</div>
  
    <div class="container fluid">

      <div class="filter-header">
        <span class="container-title">Time</span>

        <div>
          <div class="input-inline">
            <span class="input-label">start</span>
            <datepicker v-on:selected="setStartTime" :value="startTime"></datepicker>
          </div>
    
          <div class="input-inline">
            <span class="input-label">end</span>
            <datepicker v-on:selected="setEndTime" :value="endTime"></datepicker>
          </div>
        </div>

      </div>

    </div>
  
    <div class="container rounded well box">
      <chart v-bind:options="chartOptions"
             v-bind:chartData="chartData"
             :height="400"></chart>
    </div>

    start: {{ startTime }}
    end: {{ endTime }}

    <pre>
      {{ storeChartData }}
    </pre>
  
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { mapGetters, mapActions } from 'vuex'

import Chart from './Chart'
import Card from './Card'

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
  responsive: true,
  maintainAspectRatio: false
}

export default {
  name: 'charts',
  components: {
    Chart,
    Card,
    Datepicker
  },
  mounted () {
    console.log('mounted')
  },
  data () {
    return {
      chartData,
      chartOptions
    }
  },
  computed: {
    storeChartData () {
      return this.$store.state.data
    },
    ...mapGetters(['startTime', 'endTime'])
  },
  methods: {
    ...mapActions(['setStartTime', 'setEndTime'])
  }
}
</script>

<style lang="scss">
@import '../main.scss';

.filters {}
</style>
