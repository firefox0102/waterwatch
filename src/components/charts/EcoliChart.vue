
<template>
  <div class="graph-card">
    <div class="graph-card-title">
      <span class="graph-card-title__primary">
        E. coli
        <v-dialog v-model="controls.ecoliDialog" persistent>
          <i slot="activator" class="material-icons graph-card-title__icon">
            info_outline
          </i>
          <v-card>
            <v-card-title class="headline">What is E. coli?</v-card-title>
            <v-card-text>
              <p>
                Escherichia coli (E. coli) is a bacteria that is commonly found in the gastrointestinal tract and feces of warm-blooded animals and humans. According to the U.S. EPA, E. coli is the best indicator of the presence of pathogens in surface waters and its presence provides direct evidence of fecal contamination of the water.
              </p>
              <h5>
                How are the E. coli results interpreted to determine if they are acceptable?
              </h5>
              <p>
                EPA recommends an E. coli recreational safety level for primary contact of a geometric average of 126 cfu/100ml or less. Because it is common to find high bacteria counts in urban areas, Georgia Adopt-A-Stream advises that counts that exceed a 1000 cfu/100 ml threshold may warrant special attention. NWW results that show a “high” bacterial count may be a one-time event or occurrence or may be a part of a chronic problem. This information is useful, but before taking further action additional sampling is necessary to document bacterial levels over a long period to determine seasonal fluctuations and in response to rain events. This long term information is vital in assessing the overall health of the stream and determining if special attention is warranted to investigate potential pollution sources.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
                class="green--text darken-1" 
                flat="flat"
                @click.native="controls.ecoliDialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </span>
      <div>
        <span class="graph-card-title__secondary--strong">
          Last Result:
        </span>
        <span class="graph-card-title__secondary">
          {{ selectedSite ? selectedSite.lastEColiResult : null }}
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
      let categories = []
      let chartObj = {
        data: []
      }

      _.each(reports, function (report) {
        let fakeEcoliData = parseInt(report.ecoliLargeCells + report.ecoliSmallCells)
        chartObj.data.push(fakeEcoliData)
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
