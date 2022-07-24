<script>

import { Line as LineChart } from 'vue-chartjs'

export default{
  extends: LineChart,
  name: 'Graphs',
  props: {
    labels: null,
    label: null,
    data: null
  },
  methods: {
    async renderEverything () {
      this.renderChart({
        labels: this.labels,
        datasets: [
          {
            label: this.label,
            data: this.data,
            backgroundColor: 'transparent',
            borderColor: 'rgba(1, 116, 188, 0.50)',
            pointBackgroundColor: 'rgba(171, 71, 188, 1)',
            height: 500
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false
      })
    }
  },
  mounted () {
    this.renderEverything()
    console.log(this.labels)
    console.log(this.datasets)
  },
  components: {
    LineChart
  }
}
</script>
