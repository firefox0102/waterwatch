<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="controls.openExportDialog"
      persistent
      max-width="600px">
      <div
        slot="activator"
        class="site-reports-toolbar-export__activator">
        <div class="site-reports-toolbar-export__activator-text">
          Export
        </div>
        <i class="material-icons">arrow_drop_down</i>
      </div>
      <v-card>
        <v-card-title>
          <span class="headline">Download Excel Reports</span>
        </v-card-title>
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
          <download-excel
            v-if="generatedJsonData !== null && reportsFetched === selected.length"
            type="submit"
            v-bind:data = "generatedJsonData"
            v-bind:fields = "jsonFields"
            :meta = "json_meta"
            name = "NWW_Report.xls">
            Export as XLS
          </download-excel>
          <download-excel
            v-if="generatedJsonData !== null && reportsFetched === selected.length"
            type="submit"
            v-bind:data = "generatedJsonData"
            v-bind:fields = "adoptJsonFields"
            :meta = "json_meta"
            name = "NWW_Report.xls">
            Export Adopt-A-Stream Report
          </download-excel>
          <download-excel
            v-if="storetJsonData !== null && reportsFetched === selected.length"
            type="submit"
            v-bind:data = "storetJsonData"
            v-bind:fields = "storetJsonFields"
            :meta = "json_meta"
            name = "NWW_Report.xls">
            Export Storet Report
          </download-excel>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Close</v-btn>
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
        'stationName': 'Station Name',
        'collectionDate': 'Date Collected',
        'collectionTime': 'Time Collected',
        'specificConductivity': 'Specific Conductivity',
        'precipitation': 'Percipitation',
        'totalEcoli': 'E.Coli Total',
        'turbidity': 'Turbidity Total'
      },
      adoptJsonFields: {
        'adoptAStreamName': 'Station S-',
        'collectionDate': 'Event date (mm/dd/yyyy)',
        'precipitation': 'Amount of rain (inches)',
        'totalEcoli': 'E.coli IDEXX (MPN / 100mL)',
        'turbidity': 'Turbidity (NTU)',
        'specificConductivity': 'Conductivity (µS/cm)',
        'collectionTime': 'Time sample collected (hh:mm am/pm)'
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

      var i = 0
      this.reportsFetched = 0
      _.forEach(this.selected, (selectedItem) => {
        console.log('line 1')
        var stringy = `reports${i}`
        this.$bindAsArray(
          stringy,
          db.ref('reports/' + selectedItem['.key']).orderByChild('collectionDate').startAt(this.startDate).endAt(this.endDate),
          null,
          (reports) => {
            console.log('selected callback fired')
            let itemsCopy = [ ...this[stringy] ]
            this.generatedJsonData = _.concat(this.generatedJsonData, itemsCopy)
            this.generateStoretObjects(itemsCopy)
            this.$unbind(stringy)
            this.reportsFetched++
          }
        )

        i++
      })
    },
    generateStoretObjects (items) {
      let storetItems = []

      _.forEach(items, (item) => {
        let lDate = moment(item.collectionDate).format('YYYYMMDD')
        storetItems.push({
          'projectId': 'NWW_2012',
          'monitoringLocationId': item.logbookAbbv,
          'lField': `NWW40${lDate}`,
          'activityType': 'Sample-Routine',
          'activityMediaName': 'Water',
          'activityStartDate': item.collectionDate,
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
      this.generatedJsonData = []
      this.controls.openExportDialog = false
    }
  }
}
</script>
