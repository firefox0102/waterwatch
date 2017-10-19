
<template>
  <div class="graph-card">
    <div class="graph-card-title">
      <span class="graph-card-title__primary">
        Rainfall (inches)
        <v-dialog
          v-model="controls.rainDialog"
          content-class="nww-dialog"
          persisten
        t>
          <i slot="activator" class="material-icons graph-card-title__icon">
            info_outline
          </i>
          <v-card>
            <v-card-title class="headline">Rainfall</v-card-title>
            <v-card-text>
              <p>
                Rainfall is the main way that the water in the skies comes down to Earth, where it fills our lakes and rivers, recharges the underground aquifers, and provides drinks to plants and animals. In the United States, an average of some 70 percent of the annual precipitation returns to the atmosphere by evaporation from land and water surfaces and by transpiration from vegetation. The remaining 30 percent eventually reaches a stream, lake, or ocean, partly by overland runoff during and immediately after rain, and partly by a much slower route by moving though the ground. Much of the rain that enters the ground filters down into subsurface water-bearing rocks (aquifers) and eventually reaches lakes, streams, and rivers where these surface-water bodies intercept the aquifers.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="btn-nww btn btn--raised" @click.native="controls.rainDialog = false">Okay</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </span>
      <div>
        <span class="graph-card-title__secondary--strong">
          Last Result:
        </span>
        <span class="graph-card-title__secondary">
          {{ selectedSite ? selectedSite.lastRainfallResult : null }}
        </span>
      </div>
    </div>
    <div class="graph-card__graph-wrapper">
      <vue-highcharts id="chart3" :options="options" ref="rainfallChart"></vue-highcharts>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import VueHighcharts from 'vue2-highcharts'

export default {
  name: 'rainfall-chart',
  props: ['selectedSite', 'reports'],
  components: {
    VueHighcharts
  },
  data () {
    return {
      chartData: null,
      controls: {
        rainDialog: false
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
          dateTimeLabelFormats: {
            month: '%e/%m/%Y',
            year: '%b'
          },
          title: {
            text: 'Collection Date'
          }
        },
        yAxis: {
          title: {
            text: '(in)',
            margin: 2
          },
          min: 0
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          pointFormat: '{point.y} (in)'
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
      let rainfallChart = this.$refs.rainfallChart

      if (this.chartData) {
        rainfallChart.removeSeries(this.chartData)
        this.chartData = null
      }

      rainfallChart.delegateMethod('showLoading', 'Loading...')

      this.chartData = this.parseChartData(this.reports)

      rainfallChart.addSeries(this.chartData)
      rainfallChart.hideLoading()
    },
    parseChartData (reports) {
      let chartObj = {
        data: []
      }

      _.each(reports, function (report) {
        let rainfall = parseInt(report.precipitation)
        let date = moment.utc(report.collectionDate).valueOf()

        chartObj.data.push([date, rainfall])
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
