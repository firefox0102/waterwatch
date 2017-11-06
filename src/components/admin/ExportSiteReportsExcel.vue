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
            <li>
            <download-excel
              v-if="generatedJsonData !== null && reportsFetched === selected.length"
              v-bind:data = "generatedJsonData"
              v-bind:fields = "jsonFields"
              :meta = "json_meta"
              name = "NWW_XLS-Report.xls">
              Export as XLS
            </download-excel>
            </li>
            <li>
            <download-excel
              v-if="generatedJsonData !== null && reportsFetched === selected.length"
              v-bind:data = "generatedJsonData"
              v-bind:fields = "adoptJsonFields"
              :meta = "json_meta"
              name = "NWW_Adopt-A-Stream-Report.xls">
              Export Adopt-A-Stream Report
            </download-excel>
            </li>
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
      }
    }
  },
  methods: {
    generateReport () {
      console.log('generating')
      this.controls.isExporting = true
      this.generatedJsonData = []

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
            this.$unbind(stringy)
            this.reportsFetched++
          }
        )

        i++
      })
    },
    close () {
      this.generatedJsonData = []
      this.controls.openExportDialog = false
    }
  }
}
</script>
