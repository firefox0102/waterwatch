
<template>
  <div class="graph-card">
    <div class="graph-card-title">
      <span class="graph-card-title__primary">
        Specific Conductivity (uS)
        <v-dialog
          v-model="controls.conductiveDialog"
          content-class="nww-dialog"
          persistent
        >
          <i slot="activator" class="material-icons graph-card-title__icon">
            info_outline
          </i>
          <v-card>
            <v-card-title class="headline">Specific Conductivity (uS)</v-card-title>
            <v-card-text>
              <p>
                Electrical conductance is a measure of the capacity of a substance to conduct an electrical current. The specific electrical conductance (conductivity) of water is a function of the types and quantities of dissolved substances it contains, normalized to a unit length and unit cross section at a specified temperature.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="btn-nww btn btn--raised" @click.native="controls.conductiveDialog = false">Okay</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </span>
      <div>
        <span class="graph-card-title__secondary--strong">
          Last Result:
        </span>
        <span class="graph-card-title__secondary">
          {{ selectedSite ? selectedSite.lastConductivityResult : null }}
        </span>
      </div>
    </div>
    <div class="graph-card__graph-wrapper">
      <vue-highcharts id="chart4" :options="options" ref="conductivityChart"></vue-highcharts>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import VueHighcharts from 'vue2-highcharts'

export default {
  name: 'conductivity-chart',
  props: ['selectedSite', 'reports'],
  components: {
    VueHighcharts
  },
  data () {
    return {
      chartData: null,
      controls: {
        conductiveDialog: false
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
            text: '(uS)',
            margin: 2
          },
          min: 0
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          pointFormat: '{point.y} (uS)'
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
      let conductivityChart = this.$refs.conductivityChart

      if (this.chartData) {
        conductivityChart.removeSeries(this.chartData)
        this.chartData = null
      }

      conductivityChart.delegateMethod('showLoading', 'Loading...')

      this.chartData = this.parseChartData(this.reports)

      conductivityChart.addSeries(this.chartData)
      conductivityChart.hideLoading()
    },
    parseChartData (reports) {
      let chartObj = {
        data: []
      }

      _.each(reports, function (report) {
        let conductivity = parseInt(report.specificConductivity)
        let date = moment.utc(report.collectionDate).valueOf()

        chartObj.data.push([date, conductivity])
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
