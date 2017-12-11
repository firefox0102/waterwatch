<template>
  <v-layout>
    <v-btn
      v-if="generatedJsonData == null && adoptJsonData == null && storetJsonData == null"
      v-on:click="generateReport"
      class="btn btn-nww--light"
    >
      Generate Report
    </v-btn>
    <v-progress-circular
      v-if="showProgressSpinner"
      indeterminate
      color="green"
    ></v-progress-circular>
    <v-menu
      v-if="showExportButton"
      offset-y
      left
    >
      <div slot="activator" class="site-reports-toolbar-export__activator">
        <div class="site-reports-toolbar-export__activator-text">
          Export
        </div>
        <i class="material-icons">arrow_drop_down</i>
      </div>
      <v-list>
        <v-list-tile>
          <v-list-tile-title>
            <download-excel
              v-if="xlsJsonData.length === resultsCount"
              v-bind:data="xlsJsonData"
              v-bind:fields="xlsJsonFields"
              :meta="json_meta"
              type="csv"
              name="NWW_Director_Report.xls"
            >
              Export as XLS
            </download-excel>
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-title>
            <download-excel
              v-if="adoptJsonData.length === resultsCount"
              v-bind:data="adoptJsonData"
              v-bind:fields="adoptJsonFields"
              :meta="json_meta"
              type="csv"
              name="NWW_Adopt-A-Stream-Report.xlsx"
            >
              Export for Adopt-A-Stream
            </download-excel>
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-title>
            <download-excel
              v-if="storetJsonData.length === resultsCount"
              v-bind:data="storetJsonData"
              v-bind:fields="storetJsonFields"
              :meta="json_meta"
              type="csv"
              name="NWW_Storet-Report.xls"
            >
              Export for STORET
            </download-excel>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-layout>
</template>

<script>
import { db } from '../../helpers/firebase'
import _ from 'lodash'
import moment from 'moment'

export default {
  name: 'export-site-reports-excel',
  props: [
    'selected',
    'startDate',
    'endDate'
  ],
  watch: {
    selected () {
      this.generatedJsonData = null
      this.xlsJsonData = null
      this.storetJsonData = null
      this.adoptJsonData = null
      this.resultsCount = 0
    }
  },
  data: function () {
    return {
      generatedJsonData: null,
      xlsJsonData: null,
      storetJsonData: null,
      adoptJsonData: null,
      resultsCount: 0,
      reportsFetched: 0,
      controls: {
        openExportDialog: false,
        isExporting: false,
        exportAction: { label: 'Export' },
        exportActions: [
          'Export as XLS',
          'Export for Adopt-A-Stream',
          'Export for STORET'
        ]
      },
      json_meta: [
        [{
          'key': 'charset',
          'value': 'utf-8'
        }]
      ],
      xlsJsonFields: {
        'logbookNumber': '#',
        'logbookAbbv': 'Site Name',
        'collectionDate': 'Collect. Date',
        'collectionTime': 'Collect. Time',
        'precipitation': 'Rain (in)',
        'dilution': 'Dilution (mL / 100mL)',
        'totalColiform': 'Total Coliform (MPN / 100mL)',
        'totalEcoli': 'E.Coli Total',
        'fluorometry:': 'Fluorometry',
        'turbidity': 'Turbid. (NTU)',
        'specificConductivity': 'Specifc Cond. (µS)',
        'analyst': 'Analyst',
        'notes': 'Notes'
      },
      adoptJsonFields: {
        'aasSiteName': 'Site S-',
        'collectionDate': 'Event date (mm/dd/yyyy)',
        'collectionTime': 'Time sample collected (hh:mm)',
        'participation': 'Total # of particip',
        'samplingTime': 'Time spent sampling (minutes)',
        'monitor': 'Adopt-A-Stream monitors',
        'precipitation': 'Amount of rain (inches)',
        'hours': 'In last (hours)',
        'specificConductivity': 'Conductivity (µS/cm)',
        'turbidity': 'Turbidity (NTU)',
        'film': 'Other than Petri film?',
        'totalEcoli': 'E.coli IDEXX (MPN / 100mL)'
      },
      storetJsonFields: {
        'projectId': 'Project ID',
        'monitoringLocationId': 'Monitoring Location Id',
        'lField': 'L',
        'activityType': 'Activity Type',
        'activityMediaName': 'Activity Media Name',
        'activityStartDate': 'Activity Start Date',
        'activityStartTime': 'Activity Start Time',
        'activityStartTimeZone': 'Activity Start Time Zone',
        'activityDepthMeasure': 'Activity Depth/Height Measure',
        'activityDepthUnit': 'Activity Depth/Height Unit',
        'sampleCollectionMethodId': 'Sample Collection Method ID',
        'sampleCollectionEquipmentName': 'Sample Collection Equipment Name',
        'sampleCollectionEquipmentComment': 'Sample Collection Equipment Comment',
        'dataLoggerLine': 'Data Logger Line',
        'characteristicName': 'Characteristic Name',
        'methodSpeciation': 'Method Speciation',
        'resultDetectionCondition': 'Result Detection Condition',
        'resultValue': 'Result Value',
        'resultUnit': 'Result Unit',
        'resultMeasureQualifier': 'Result Measure Qualifier',
        'resultSampleFraction': 'Result Sample Fraction',
        'resultStatusID': 'Result Status ID',
        'statisticalBaseCode': 'Statistical Base Code',
        'resultValueType': 'Result Value Type',
        'resultAnalyticalMethodID': 'Result Analytical Method ID',
        'resultAnalyticalMethodContext': 'Result Analytical Method Context',
        'analysisStartDate': 'Analysis Start Date',
        'resultDetectionQuantitationLimitType': 'Result Detection/Quantitation Limit Type',
        'resultDetectionQuantitationLimitMeasure': 'Result Detection/Quantitation Limit Measure',
        'resultDetectionQuantitationLimitUnit': 'Result Detection/Quantitation Limit Unit',
        'resultComment': 'Result Comment'
      }
    }
  },
  computed: {
    showProgressSpinner () {
      if (!this.selected) { return false }
      return this.generatedJsonData !== null &&
        this.reportsFetched < this.selected.length
    },
    showExportButton () {
      if (!this.selected) {
        return false
      }

      return this.reportsFetched === this.selected.length
    }
  },
  methods: {
    generateReport () {
      this.controls.isExporting = true
      this.generatedJsonData = []
      this.xlsJsonData = []
      this.storetJsonData = []
      this.adoptJsonData = []
      this.resultsCount = 0

      var i = 0
      this.reportsFetched = 0

      _.forEach(this.selected, (selectedItem) => {
        var stringy = `reports${i}`
        this.$bindAsArray(
          stringy,
          db.ref('reports/' + selectedItem['.key']).orderByChild('collectionDate').startAt(this.startDate).endAt(this.endDate),
          null,
          (reports) => {
            let itemsCopy = [ ...this[stringy] ]
            this.resultsCount += itemsCopy.length
            this.generatedJsonData = _.concat(this.generatedJsonData, itemsCopy)
            this.generateXlsData(itemsCopy, selectedItem)
            this.generateAdoptObjects(itemsCopy, selectedItem)
            this.generateStoretObjects(itemsCopy, selectedItem)
            this.$unbind(stringy)
            this.reportsFetched++
          }
        )

        i++
      })
    },
    generateStoretObjects (items, selectedSite) {
      let storetItems = []

      _.forEach(items, (item) => {
        let lDate = moment(item.collectionDate).format('YYYYMMDD')
        let storetDate = moment(item.collectionDate).format('YYYY-MM-DD')
        let storetTime = (item.collectionTime === '') ? '' : `${item.collectionTime}:00`

        storetItems.push({
          'projectId': 'NWW_2012',
          'lField': `${selectedSite.storetID}${lDate}`,
          'activityType': 'Sample-Routine',
          'activityMediaName': 'Water',
          'activityStartDate': storetDate,
          'activityStartTime': storetTime,
          'activityStartTimeZone': 'EST',
          'activityDepthMeasure': ' ',
          'activityDepthUnit': ' ',
          'sampleCollectionMethodId': 'Grab Sample',
          'sampleCollectionEquipmentName': 'Whirl-pak bag',
          'sampleCollectionEquipmentComment': ' ',
          'dataLoggerLine': '',
          'characteristicName': 'Escherichia coli',
          'methodSpeciation': ' ',
          'monitoringLocationId': item.storetID,
          'resultDetectionCondition': ' ',
          'resultValue': item.totalEcoli,
          'resultUnit': 'MPN',
          'resultMeasureQualifier': ' ',
          'resultSampleFraction': ' ',
          'resultStatusID': 'Final',
          'statisticalBaseCode': ' ',
          'resultValueType': 'Calculated',
          'resultAnalyticalMethodID': 'Colilert',
          'resultAnalyticalMethodContext': 'IDEXX',
          'analysisStartDate': ' ',
          'resultDetectionQuantitationLimitType': ' ',
          'resultDetectionQuantitationLimitMeasure': ' ',
          'resultDetectionQuantitationLimitUnit': ' ',
          'resultComment': ' '
        })
      })

      this.storetJsonData = _.concat(this.storetJsonData, storetItems)
    },
    generateXlsData (items, selectedSite) {
      let jsonItems = []

      _.forEach(items, (item) => {
        let jsonDate = moment(item.collectionDate).format('MM/DD/YYYY')
        console.log(selectedSite)
        jsonItems.push({
          logbookNumber: item.logbookNumber,
          logbookAbbv: selectedSite.logbookAbbv,
          collectionDate: jsonDate,
          collectionTime: item.collectionTime,
          precipitation: item.precipitation,
          dilution: item.dilution,
          totalColiform: item.totalColiform,
          totalEcoli: item.totalEcoli,
          fluorometry: item.fluorometry,
          turbidity: item.turbidity,
          specificConductivity: item.specificConductivity,
          analyst: item.analyst,
          notes: item.notes
        })
      })

      this.xlsJsonData = _.concat(this.xlsJsonData, jsonItems)
    },
    generateAdoptObjects (items, selectedSite) {
      let adoptItems = []

      _.forEach(items, (item) => {
        let adoptDate = moment(item.collectionDate).format('MM/DD/YYYY')
        let aasSiteName = item.stationName + ' (' + selectedSite.aasNumber + ')'

        adoptItems.push({
          aasSiteName: aasSiteName,
          collectionDate: adoptDate,
          collectionTime: item.collectionTime,
          participation: '1',
          samplingTime: '60',
          monitor: 'Micheal Meyer (25064)',
          precipitation: item.precipitation,
          hours: '24',
          specificConductivity: item.specificConductivity,
          turbidity: item.turbidity,
          film: 'yes',
          totalEcoli: item.totalEcoli
        })
      })

      this.adoptJsonData = _.concat(this.adoptJsonData, adoptItems)
    },
    close () {
      this.generatedJsonData = null
      this.xlsJsonData = null
      this.storetJsonData = null
      this.adoptJsonData = null
      this.resultsCount = 0
      this.controls.openExportDialog = false
    }
  }
}
</script>
