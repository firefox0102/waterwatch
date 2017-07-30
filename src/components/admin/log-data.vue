<template>
  <div class="log-data">
    <div class="page-content-header">
      <div class="page-content-header__text">
        Log Data
      </div>
      <div class="page-content-header__subtext--dark">
        Log new data for a collection site
      </div>
    </div>
    <div class="page-content-body">
      <form
        v-on:submit="submitForm"
        class="page-content-body__form">
        <div class="page-content-body__column">
          <div class="page-content-body__header">
            Collection Details
          </div>
          <v-text-field
            label="Logbook Number"
            v-model="newLogData.logbookNumber"
            class="input-group--focused"
            disabled="true"
            required>
          </v-text-field>

          <v-menu
            lazy
            :close-on-content-click="false"
            v-model="newLogData.collectionDate"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-left="40"
            max-width="290px">
            <v-text-field
              slot="activator"
              label="Date"
              v-model="newLogData.collectionDate"
              append-icon="event"
              class="input-group--focused"
              required>
            </v-text-field>
            <v-date-picker v-model="newLogData.collectionDate" no-title scrollable actions>
              <template scope="{ save, cancel }">
                <v-card-actions>
                  <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                  <v-btn flat primary @click.native="save()">Save</v-btn>
                </v-card-actions>
              </template>
            </v-date-picker>
          </v-menu>

          <v-select
            v-bind:items="collectionSites"
            item-text="stationName"
            item-value="$index"
            v-model="newLogData.collectionSite"
            label="Station Name"
            single-line
            class="input-group--focused"
            required
            bottom>
          </v-select>
          <v-text-field
              label="Collection Time"
              v-model="newLogData.collectionTime"
              type="time"
              suffix="EST"
              required
              class="input-group--focused">
          </v-text-field>
          <v-text-field
              label="Analyst (Initials)"
              class="input-group--focused"
              required
              v-model="newLogData.analyst">
          </v-text-field>
          <v-text-field
              name="input-5-1"
              label="Notes"
              v-model="newLogData.notes"
              class="input-group--focused"
              required
            ></v-text-field>
        </div>

        <div class="page-content-body__column">
          <div class="page-content-body__header">
            Incubation and Parameters
          </div>
          <v-text-field
              label="Incubation In Time"
              v-model="newLogData.incubationTime"
              type="time"
              required
              class="input-group--focused">
          </v-text-field>
          <v-text-field
              label="# mL/100mL (Dilution)"
              class="input-group--focused"
              required
              type="number"
              v-model="newLogData.dilution">
          </v-text-field>
          <v-text-field
              label="Fluorometry"
              class="input-group--focused"
              required
              type="number"
              v-model="newLogData.fluorometry">
          </v-text-field>
          <v-text-field
              label="Turbidity (NTU)"
              class="input-group--focused"
              required
              type="number"
              v-model="newLogData.turbidity">
          </v-text-field>
          <v-text-field
              label="Conductivity (uS)"
              class="input-group--focused"
              required
              type="number"
              v-model="newLogData.specifcConductivity">
          </v-text-field>
          <v-text-field
              label="Rainfall (in)"
              class="input-group--focused"
              required
              type="number"
              v-model="newLogData.precipitation">
          </v-text-field>
          <v-text-field
              label="Incubation Temp (*C)"
              class="input-group--focused"
              required
              type="number"
              v-model="newLogData.incubationTemp">
          </v-text-field>
          <v-text-field
              label="Incubation Out"
              v-model="newLogData.incubationOut"
              type="time"
              required
              class="input-group--focused">
          </v-text-field>
        </div>

        <div class="page-content-body__column">
          <div class="page-content-body__header">
            Total Coliform
          </div>
          <v-text-field
              label="Large Cells"
              class="input-group--focused"
              required
              type="number"
              v-model="newLogData.coliformLargeCells">
          </v-text-field>
          <v-text-field
              label="Small Cells"
              class="input-group--focused"
              required
              type="number"
              v-model="newLogData.coliformSmallCells">
          </v-text-field>

          <div class="page-content-body__header">
            E. Coli
          </div>
          <v-text-field
              label="Large Cells"
              class="input-group--focused"
              required
              type="number"
              v-model="newLogData.ecoliLargeCells">
          </v-text-field>
          <v-text-field
              label="Small Cells"
              class="input-group--focused"
              required
              type="number"
              v-model="newLogData.ecoliSmallCells">
          </v-text-field>

          <v-btn
            type="submit"
            class="btn-nww"
            v-on:click.native="submitLog">
            Log Data
          </v-btn>
        </div>
      </form>
    </div>
    <v-snackbar
      :timeout="snackbar.timeout"
      :error="true"
      v-model="snackbar.visible">
      {{snackbar.errorMessage}}
      <v-btn dark flat @click.native="snackbar.visible = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { db } from '../../helpers/firebase'

let collectionSitesRef = db.ref('collectionSites')
let reportsRef = db.ref('reports')
let lastReportRef = db.ref('reports').limitToLast(1)

export default {
  name: 'log-data',
  firebase: {
    collectionSites: collectionSitesRef,
    reports: reportsRef,
    lastReport: lastReportRef
  },
  data: function () {
    return {
      newLogData: {
        analyst: '',
        coliformLargeCells: '',
        coliformSmallCells: '',
        collectionDate: '',
        collectionSite: null,
        collectionTime: '',
        dilution: null,
        eColiLargeCells: null,
        eColiSmallCells: null,
        fluorometry: null,
        incubationOut: '',
        incubationTemp: null,
        incubationTime: '',
        logbookNumber: 1, // TODO list the logbookNumber
        precipitation: null,
        specifcConductivity: null,
        turbidity: null,
        notes: ''
      },
      snackbar: {
        visible: false,
        errorMessage: 'There was an issue logging your data',
        timeout: 6000
      }
    }
  },
  methods: {
    submitForm (evnt) {
      this.submitLog()
      evnt.preventDefault()
    },
    submitLog: function () {
      try {
        // Parse collection site data
        let selectedSite = this.newLogData.collectionSite
        this.newLogData.stationName = selectedSite.stationName
        this.newLogData.logbookAbbv = selectedSite.logbookAbbv
        this.newLogData.stationId = this.newLogData.collectionSite['.key']
        this.newLogData.collectionSite = null

        // Set logbook number
        this.newLogData.logbookNumber = this.getLastLogbookNumber()

        this.$firebaseRefs.reports.push(this.newLogData)
      } catch (e) {
        console.log(e)
        this.snackbar.visible = true
      }
    },
    getLastLogbookNumber: function () {
      return (this.lastReport[0] ? this.lastReport[0].logbookNumber : 0) + 1
    }
  }
}
</script>

<style lang="scss" scoped>
.log-data {
  margin: 24px;
  box-shadow: 0 1px 3px 0 rgba(155, 155, 155, 0.5);
}
</style>
