
<template>
  <div class="graph-card">
    <div class="graph-card-title">
      <span class="graph-card-title__primary">
        Turbidity
        <v-dialog
          v-model="controls.turbidityDialog"
          content-class="nww-dialog"
          persistent>
          <i slot="activator" class="material-icons graph-card-title__icon">
            info_outline
          </i>
          <v-card>
            <v-card-title class="headline">Turbidity</v-card-title>
            <v-card-text>
              <p>Turbidity is the measure of the relative clarity of water. High levels of turbidity are a result of the presence of suspended and dissolved matter, such as clay, silt, finely divided organic matter, plankton and other microscopic organisms, organic acids, and dyes. We typically see the highest turbidity levels during and after heavy rain events. During a rainstorm, particles from the surrounding land are washed into the river making the water a muddy brown color, indicating water that has higher turbidity values. Also, during high flows, water velocities are faster and water volumes are higher, which can more easily stir up and suspend material from the stream bed, causing higher turbidity levels.</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="btn-nww btn btn--raised" @click.native="controls.turbidityDialog = false">Okay</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </span>
      <div>
        <span class="graph-card-title__secondary--strong">
          Last Result:
        </span>
        <span class="graph-card-title__secondary">
          {{ selectedSite ? selectedSite.lastTurbidityResult : null }}
          on
          {{ date }}
        </span>
      </div>
    </div>
    <div class="graph-card__graph-wrapper">
      <vue-highcharts id="chart2" :options="options" ref="turbidityChart"></vue-highcharts>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import VueHighcharts from 'vue2-highcharts'

export default {
  name: 'turbidity-chart',
  props: ['selectedSite', 'reports'],
  components: {
    VueHighcharts
  },
  data () {
    return {
      chartData: null,
      controls: {
        turbidityDialog: false
      },
      options: {
        chart: {
          type: 'column',
          width: 290,
          height: 220
        },
        legend: {
          enabled: false
        },
        title: {
          text: null
        },
        credits: {
          enabled: false
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: { // don't display the dummy year
            month: '%e/%m/%y',
            year: '%b'
          },
          title: {
            text: 'Collection Date'
          }
        },
        yAxis: {
          title: {
            text: '(NTU)',
            margin: 2
          },
          min: 0
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          pointFormat: '{point.y} (NTU)'
        },
        plotOptions: {
          column: {
            pointPadding: 0.1,
            borderWidth: 0,
            groupPadding: 0,
            shadow: false,
            color: '#4D86A0'
          }
        },
        series: []
      }
    }
  },
  watch: {
    reports (newVal) {
      if (newVal) {
        this.renderChart()
      }
    }
  },
  methods: {
    renderChart () {
      let turbidityChart = this.$refs.turbidityChart

      if (this.chartData) {
        turbidityChart.removeSeries(this.chartData)
        this.chartData = null
      }

      turbidityChart.delegateMethod('showLoading', 'Loading...')

      this.chartData = this.parseChartData(this.reports)

      turbidityChart.addSeries(this.chartData)
      turbidityChart.hideLoading()
    },
    parseChartData (reports) {
      let chartObj = {
        data: []
      }

      _.each(reports, function (report) {
        let turbidity = parseInt(report.turbidity)
        let date = moment.utc(report.collectionDate).valueOf()

        chartObj.data.push([date, turbidity])
      })

      return chartObj
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/colors";
@import "../../scss/graph-card";
</style>
