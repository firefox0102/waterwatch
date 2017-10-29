
<template>
  <div class="graph-card">
    <div class="graph-card-title">
      <span class="graph-card-title__primary">
        Specific Conductivity (µS)
        <v-dialog
          v-model="controls.conductiveDialog"
          content-class="nww-dialog"
          persistent>
          <i slot="activator" class="material-icons graph-card-title__icon">
            info_outline
          </i>
          <v-card>
            <v-card-title class="headline">Specific Conductivity (µS)</v-card-title>
            <v-card-text>
              <p>Specific Conductivity (conductivity) is a measure of the water’s ability to pass an electrical current and indicates the presence of ions. Sources of ions in streams include nutrients, heavy metals, and salts from urban and agricultural runoff, or minerals from rock weathering. Background levels of conductivity in streams in Georgia range from 50 – 1500 µS/cm. We closely monitor any deviations in conductivity at each site we monitor.</p>
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
          on
          {{ date }}
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
            text: '(µS)',
            margin: 2
          },
          min: 0,
          ceiling: 6000
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          pointFormat: '{point.y} (µS)'
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
