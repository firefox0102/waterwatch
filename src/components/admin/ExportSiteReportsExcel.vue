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
            class="btn md-raised btn-nww--light"
            v-bind:data = "generatedJsonData"
            v-bind:fields = "jsonFields"
            :meta = "json_meta"
            name = "NWW_Report.xls">
            Export as XLS
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
      jsonFieldsStoret: {
        'stationName': 'String',
        'collectionDate': 'String',
        'collectionTime': 'String',
        'specificConductivity': 'Number',
        'precipitation': 'Number',
        'totalEcoli': 'Number',
        'turbidity': 'Number'
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
