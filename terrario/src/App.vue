<template>
  <div id="app">
    <Table :items=highestvalues
    />
    <Table :items=lowesttvalues
    />
    <div>
      <Graphs :height="400" :labels="this.labels" :label="this.labelHumidities" :data="this.dataHumidities" v-if="loadedChart"></Graphs>
    </div>
    <div>
      <Graphs :height="400" :labels="this.labels" :label="this.labelTemperatures" :data="this.dataTemperatures" v-if="loadedChart"></Graphs>
    </div>
  </div>
</template>

<script>

import { getTemperature, get24HTemperature } from '../services/QueryDB'
import Table from './components/Table.vue'
import Graphs from './components/Chart.vue'
export default {
  name: 'App',
  data () {
    return {
      query: null,
      query24h: null,
      highestvalues: [],
      lowesttvalues: [],
      labels: [],
      labelHumidities: 'Humidities registered in the last 24 hours',
      labelTemperatures: 'Temperatures registered in the last 24 hours',
      dataHumidities: [],
      dataTemperatures: [],
      loadedChart: false
    }
  },
  methods: {
    getTemperature () {
      getTemperature().then(response => {
        this.query = response.map(r => {
          return (
            {
              'temperature': r.temperature,
              'humidity': r.humidity,
              'time': r.time
            }
          )
        })
      })
    },
    get24HTemperature () {
      get24HTemperature().then(response => {
        this.query24h = response.map(r => {
          return (
            {
              'temperature': r.temperature,
              'humidity': r.humidity,
              'time': r.time
            }
          )
        })
        console.log('this.datasets', this.datasets)
        this.labels = this.query24h.map(element => {
          return element.time
        })
        this.dataHumidities = this.query24h.map(element => {
          return element.humidity
        })
        this.dataTemperatures = this.query24h.map(element => {
          return element.temperature
        })
        this.highestvalues.push({
          'highest humidity in the last 24 hours': Math.max(...this.query24h.map(item => item.humidity)
          ).toFixed(2),
          'highest temperature in the last 24 hours': Math.max(...this.query24h.map(item => item.temperature)
          ).toFixed(2)
        })
        this.lowesttvalues.push({
          'lowest humidity in the last 24 hours': Math.min(...this.query24h.map(item => item.humidity)
          ).toFixed(2),
          'lowest temperature in the last 24 hours': Math.min(...this.query24h.map(item => item.temperature)
          ).toFixed(2)
        })
        this.loadedChart = true
      })
    }
  },
  mounted () {
    this.getTemperature()
    this.get24HTemperature()
  },
  components: { Table, Graphs }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
