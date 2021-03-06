
<template>
  <div class="graph-card">
    <div class="graph-card-title">
      <span class="graph-card-title__primary">
        E. coli (MPN/100mL)
        <v-dialog
          v-model="controls.ecoliDialog"
          content-class="nww-dialog"
          persistent
        >
          <i slot="activator" class="material-icons graph-card-title__icon">
            info_outline
          </i>
          <v-card>
            <v-card-title class="headline">E. coli</v-card-title>
            <v-card-text>
              <p>Escherichia coli (E. coli) is a bacteria that is commonly found in the gastrointestinal tract and feces of warm-blooded animals and humans. According to the U.S. EPA, E. coli is the best indicator of the presence of pathogens in surface waters and its presence provides direct evidence of fecal contamination of the water.</p>
              <p>EPA recommends an E. coli recreational safety level for primary contact of a geometric average of 126 cfu/100 mL* or less. Because it is common to find high bacteria counts in urban areas, Georgia Adopt-A-Stream advises that counts that exceed a 1000 cfu/100 mL threshold may warrant special attention. NWW results that show a “high” bacterial count may be a one-time event or occurrence or may be a part of a chronic problem. This information is useful, but before taking further action additional sampling is necessary to document bacterial levels over a long period to determine seasonal fluctuations and in response to rain events. This long term information is vital in assessing the overall health of the stream and determining if special attention is warranted to investigate potential pollution sources.</p>
              <p>*Note that our E. coli results are reported with the units MPN/100mL. The units used by the EPA (cfu/100 mL) are directly correlated to MPN/100 mL (ex. 126 cfu/100 mL = 126 MPN/100 mL).</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="btn-nww btn btn--raised"
                @click.native="controls.ecoliDialog = false">
                Okay
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </span>
      <div>
        <span class="graph-card-title__secondary--strong">
          Last Result:
        </span>
        <span v-if="selectedSite" class="graph-card-title__secondary">
          {{ selectedSite.lastEColiResult }}
          on
          {{ selectedSite.lastCollectionDate | formatDate }}
        </span>
      </div>
    </div>
    <div class="graph-card__graph-wrapper">
      <vue-highcharts id="chart1" :options="options" ref="ecoliChart"></vue-highcharts>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import VueHighcharts from 'vue2-highcharts'

export default {
  name: 'ecoli-chart',
  props: ['selectedSite', 'reports'],
  components: {
    VueHighcharts
  },
  data: function () {
    return {
      chartData: null,
      controls: {
        ecoliDialog: false
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
            day: '%m/%d/%y',
            month: '%m/%d/%y',
            week: '%m/%d/%y',
            year: '%m/%d/%y'
          },
          title: {
            text: 'Collection Date'
          }
        },
        yAxis: {
          title: {
            text: '(MPN/100mL)',
            margin: 2
          },
          min: 0,
          ceiling: 6000
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          pointFormat: '{point.y:,.0f} (MPN/100mL)'
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
      let ecoliChart = this.$refs.ecoliChart
      if (this.chartData) {
        ecoliChart.removeSeries(this.chartData)
        this.chartData = null
      }

      ecoliChart.delegateMethod('showLoading', 'Loading...')

      this.chartData = this.parseChartData(this.reports)

      ecoliChart.addSeries(this.chartData)
      ecoliChart.hideLoading()
    },
    parseChartData (reports) {
      let chartObj = {
        data: []
      }

      _.each(reports, function (report) {
        let fakeEcoliData = parseInt(report.totalEcoli)
        let date = moment.utc(report.collectionDate).valueOf()

        chartObj.data.push([date, fakeEcoliData])
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
