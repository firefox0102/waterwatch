
<template>
  <div class="graph-card">
    <div class="graph-card-title">
      <span class="graph-card-title__primary">
        Specific Conductivity (uS)
        <v-dialog v-model="controls.conductiveDialog" persistent>
          <i slot="activator" class="material-icons graph-card-title__icon">
            info_outline
          </i>
          <v-card>
            <v-card-title class="headline">Specific Conductivity (uS)</v-card-title>
            <v-card-text>
              <p>
                Specific Conductivity (uS) copy
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="green--text darken-1" flat="flat" @click.native="controls.conductiveDialog = false">Close</v-btn>
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
        yAxis: {
          title: {
            text: null
          }
        },
        xAxis: {
          title: {
            text: 'Collection Date'
          }
        },
        tooltip: {
          crosshairs: true,
          shared: true
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0,
            groupPadding: 0.1,
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
      let categories = []
      let chartObj = {
        data: []
      }

      _.each(reports, function (report) {
        let conductivity = parseInt(report.specificConductivity)
        chartObj.data.push(conductivity)
        categories.push(report.collectionDate)
      })

      this.options.xAxis.categories = categories

      return chartObj
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/colors";
@import "../../scss/graph-card";
</style>
