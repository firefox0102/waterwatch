<template>
  <v-layout>
    <v-dialog
      v-model="controls.openExportDialog"
      persistent
      max-width="600px">
      <v-btn
        slot="activator"
        class="btn btn-nww--light site-reports-actions__action">
        Export
        <v-icon right dark>file_download</v-icon>
      </v-btn>
      <v-card>
        <v-card-title class="headline">Download Excel Reports</v-card-title>
        <v-card-text>
          <v-btn
            v-on:click="generateReport"
            class="btn btn-nww--light"
          >
            Generate Report
          </v-btn>
          <v-progress-linear
            v-if="generatedJsonData !== null && reportsFetched < selected.length"
            v-bind:indeterminate="true"
          ></v-progress-linear>
          <ul class="report-list list">
            <!-- <li>
              <download-excel
                v-if="generatedJsonData !== null && reportsFetched === selected.length"
                v-bind:data = "generatedJsonData"
                v-bind:fields = "jsonFields"
                :meta = "json_meta"
                name = "NWW_XLS-Report.xls">
                Export as XLS
              </download-excel>
            </li> -->
            <li>
              <download-excel
                v-if="adoptJsonData !== null && reportsFetched === selected.length"
                v-bind:data = "adoptJsonData"
                v-bind:fields = "adoptJsonFields"
                :meta = "json_meta"
                name = "NWW_Adopt-A-Stream-Report.xls">
                Export Adopt-A-Stream Report
              </download-excel>
            </li>
            <!-- <li>
              <download-excel
                v-if="storetJsonData !== null && reportsFetched === selected.length"
                v-bind:data = "storetJsonData"
                v-bind:fields = "storetJsonFields"
                :meta = "json_meta"
                name = "NWW_Report.xls">
                Export Storet Report
              </download-excel>
            </li> -->
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="flat-action" flat @click.native="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  data: function () {
    return {
      generatedJsonData: null,
      storetJsonData: null,
      adoptJsonData: null,
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
      jsonFields: {
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
        'projectId': 'ProjectId',
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
  methods: {
    generateReport () {
      console.log('generating')
      this.controls.isExporting = true
      this.generatedJsonData = []
      this.storetJsonData = []
      this.adoptJsonData = []

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
            this.generatedJsonData = _.concat(this.generatedJsonData, itemsCopy)
            this.generateAdoptObjects(itemsCopy, selectedItem)
            this.generateStoretObjects(itemsCopy, selectedItem)
            this.$unbind(stringy)
            this.reportsFetched++
          }
        )

        i++
      })
    },
    generateAdoptObjects (items, selectedSite) {
      let adoptItems = []

      _.forEach(items, (item) => {
        let collectionDate = moment(item.collectionDate).format('MM/DD/YYYY')
        let aasSiteName = item.stationName + ' (' + selectedSite.aasNumber + ')'

        adoptItems.push({
          aasSiteName: aasSiteName,
          collectionDate: collectionDate,
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
    generateStoretObjects (items, selectedSite) {
      let storetItems = []

      _.forEach(items, (item) => {
        let lDate = moment(item.collectionDate).format('YYYYMMDD')
        let startDate = moment(item.collectionDate).format('YYYY-MM-DD')

        storetItems.push({
          'projectId': 'NWW_2012',
          'lField': `${selectedSite.storetName}${lDate}`,
          'activityType': 'Sample-Routine',
          'activityMediaName': 'Water',
          'activityStartDate': startDate,
          'activityStartTime': item.collectionTime,
          'activityStartTimeZone': 'EST',
          'activityDepthMeasure': ' ',
          'activityDepthUnit': ' ',
          'sampleCollectionMethodId': 'Grab Sample',
          'sampleCollectionEquipmentName': 'Whirl-pak bag',
          'sampleCollectionEquipmentComment': ' ',
          'dataLoggerLine': '',
          'characteristicName': 'Escherichia coli',
          'methodSpeciation': ' ',
          'monitoringLocationId': item.stationName,
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
    close () {
      this.generatedJsonData = null
      this.storetJsonData = null
      this.adoptJsonData = null
      this.controls.openExportDialog = false
    }
  }
}
</script>
