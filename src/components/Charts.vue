<template>
  <div class="container fluid">
    <div class="title-first">Charts</div>
  
    <div class="container fluid">

      <div class="filter-header fluid">

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
      <chart chart v-bind:options="chartOptions"
             v-bind:chartData="storeChartData"
             :height="400"></chart>
    </div>

    <pre class="container well rounded source-code">
      {{ storeChartData }}
    </pre>
  
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { mapGetters, mapActions } from 'vuex'

import Chart from './Chart'
import Card from './Card'

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
}

const formattedDataset = (name, rawData) => {
  if (rawData.length > 0) {
    return {
      datasets: [
        {
          label: name,
          backgroundColor: '#8add8b',
          data: rawData.map(p => (
            {
              x: p.timestamp,
              y: p.weight
            }
          ))
        }
      ]
    }
  }
  return []
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
    this.$store.dispatch('loadDataBetweenPoints')
  },
  data () {
    return {
      chartOptions
    }
  },
  computed: {
    storeChartData () {
      return formattedDataset('Full data', this.$store.state.data)
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
