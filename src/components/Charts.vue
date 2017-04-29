<template>
  <div class="container fluid">
    <div class="title-first">Charts</div>

    <div class="container fluid">

      <div class="filter-header fluid">

        <div>
          <div class="input-inline">
            <span class="input-label">from</span>
            <datepicker v-on:selected="setStartTime" :value="startTime"></datepicker>
          </div>

          <div class="input-inline">
            <span class="input-label">to</span>
            <datepicker v-on:selected="setEndTime" :value="endTime"></datepicker>
          </div>
        </div>

      </div>

    </div>

    <div class="container rounded box">
      <div v-if="false" class="container-title">Waste difference history</div>
      <chart :options="chartOptions"
             :chartData="formattedDifferenceData"
             :height="400"></chart>
    </div>

    <div class="container rounded box">
      <div v-if="false" class="container-title">Waste amount history</div>
      <chart :options="chartOptions"
             :chartData="formattedWeightData"
             :height="400"></chart>
    </div>

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
  line: {
    capBezierPoints: false
  },
  scales: {
    xAxes: [{
      type: 'time',
      position: 'bottom',
      time: {
        displayFormats: {
          'millisecond': 'hh:mm:ss'
        }
      }
    }]
  }
}

const parseDifference = (values) => {
  let sum = 0
  if (values.datasets && values.datasets[0] && values.datasets[0].data) {
    values.datasets[0].data = values.datasets[0].data
    .filter(val => val.y > 0)
    .map(val => {
      sum += parseInt(val.y)
      val.y = sum
      return val
    })
    return values
  }
}

const formattedDataset = (name, key, rawData) => {
  if (rawData.length > 0) {
    return {
      datasets: [
        {
          label: name,
          borderColor: key === 'difference' ? '#50cb82' : '#cb5065',
          fill: false,
          lineTension: 0,
          pointRadius: 0,
          cubicInterpolationMode: 'monotone',
          data: rawData.map(p => (
            {
              x: p.timestamp,
              y: p[key]
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
    formattedWeightData () {
      return formattedDataset('Weight', 'weight', this.weightData)
    },
    formattedDifferenceData () {
      return parseDifference(formattedDataset('Difference', 'difference', this.weightData))
    },
    ...mapGetters(['startTime', 'endTime', 'weightData'])
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
