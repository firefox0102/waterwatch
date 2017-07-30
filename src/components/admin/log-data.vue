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
            class="input-group--focused input-group--limit-height"
            disabled
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
              class="input-group--focused input-group--limit-height"
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
            class="input-group--focused input-group--limit-height"
            required
            bottom>
          </v-select>
          <v-text-field
              label="Collection Time"
              v-model="newLogData.collectionTime"
              type="time"
              suffix="EST"
              required
              class="input-group--focused input-group--limit-height">
          </v-text-field>
          <v-text-field
              label="Analyst (Initials)"
              class="input-group--focused input-group--limit-height"
              required
              v-model="newLogData.analyst">
          </v-text-field>
          <v-select
            v-bind:items="labs"
            v-model="newLogData.collectionSite"
            item-text=".value"
            item-value=".key"
            label="Lab"
            single-line
            class="input-group--focused input-group--limit-height"
            required
            bottom>
          </v-select>
          <a class="form-input-sub-text--hug-input">Add New Lab (TODO ADD THIS)</a>
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
              class="input-group--focused input-group--limit-height">
          </v-text-field>
          <v-text-field
              label="# mL/100mL (Dilution)"
              class="input-group--focused input-group--limit-height"
              required
              type="number"
              v-model="newLogData.dilution">
          </v-text-field>
          <v-text-field
              label="Fluorometry"
              class="input-group--focused input-group--limit-height"
              required
              type="number"
              v-model="newLogData.fluorometry">
          </v-text-field>
          <v-text-field
              label="Turbidity (NTU)"
              class="input-group--focused input-group--limit-height"
              required
              type="number"
              v-model="newLogData.turbidity">
          </v-text-field>
          <v-text-field
              label="Conductivity (uS)"
              class="input-group--focused input-group--limit-height"
              required
              type="number"
              v-model="newLogData.specifcConductivity">
          </v-text-field>
          <v-text-field
              label="Rainfall (in)"
              class="input-group--focused input-group--limit-height"
              required
              type="number"
              v-model="newLogData.precipitation">
          </v-text-field>
          <a class="form-input-sub-text--hug-input">Rainfall value from Weather Underground (TODO ADD THIS)</a>
          <v-text-field
              label="Incubation Temp (*C)"
              class="input-group--focused input-group--limit-height"
              required
              type="number"
              v-model="newLogData.incubationTemp">
          </v-text-field>
          <v-text-field
              label="Incubation Out"
              v-model="newLogData.incubationOut"
              type="time"
              required
              class="input-group--focused input-group--limit-height">
          </v-text-field>
        </div>

        <div class="page-content-body__column">
          <div class="page-content-body__header">
            Total Coliform
          </div>
          <v-text-field
              label="Large Cells"
              class="input-group--focused input-group--limit-height"
              required
              type="number"
              v-model="newLogData.coliformLargeCells">
          </v-text-field>
          <v-text-field
              label="Small Cells"
              class="input-group--focused input-group--limit-height"
              required
              type="number"
              v-model="newLogData.coliformSmallCells">
          </v-text-field>

          <a class="log-data-total">Total Coliform = TODO</a>

          <div class="page-content-body__header">
            E. Coli
          </div>
          <v-text-field
              label="Large Cells"
              class="input-group--focused input-group--limit-height"
              required
              type="number"
              v-model="newLogData.ecoliLargeCells">
          </v-text-field>
          <v-text-field
              label="Small Cells"
              class="input-group--focused input-group--limit-height"
              required
              type="number"
              v-model="newLogData.ecoliSmallCells">
          </v-text-field>

          <a class="log-data-total">Total E. coli = TODO</a>

          <a class="form-input-sub-text">See More Parameters</a>

          <div>
            <div class="page-content-body__header page-content-body__header--space-above">
              Additional Parameters
            </div>
            <v-text-field
                label="Dissolved Oxygen"
                class="input-group--focused input-group--limit-height"
                type="number"
                v-model="newLogData.dissolvedOxygen"
                required>
            </v-text-field>
            <v-text-field
                label="Nitrate"
                class="input-group--focused input-group--limit-height"
                type="number"
                v-model="newLogData.nitrate"
                required>
            </v-text-field>
            <v-text-field
                label="Phosphate"
                class="input-group--focused input-group--limit-height"
                type="number"
                v-model="newLogData.phosphate"
                required>
            </v-text-field>
            <v-text-field
                label="Ammonium"
                class="input-group--focused input-group--limit-height"
                type="number"
                v-model="newLogData.ammonium"
                required>
            </v-text-field>
            <v-text-field
                label="Total Chlorine"
                class="input-group--focused input-group--limit-height"
                type="number"
                v-model="newLogData.totalChlorine"
                required>
            </v-text-field>
            <v-text-field
                label="Chlorophyll"
                class="input-group--focused input-group--limit-height"
                type="number"
                v-model="newLogData.chlorophyll"
                required>
            </v-text-field>
            <v-text-field
                name="input-5-1"
                label="Notes"
                v-model="newLogData.notes"
                class="input-group--focused input-group--limit-height"
                required
              ></v-text-field>
          </div>

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
let labsRef = db.ref('labs')
let lastReportRef = db.ref('reports').limitToLast(1)

export default {
  name: 'log-data',
  firebase: {
    collectionSites: collectionSitesRef,
    reports: reportsRef,
    labs: labsRef,
    lastReport: lastReportRef
  },
  data: function () {
    return {
      newLogData: {
        ammonium: null,
        analyst: '',
        chlorophyll: null,
        coliformLargeCells: '',
        coliformSmallCells: '',
        collectionDate: '',
        collectionSite: null,
        collectionTime: '',
        dilution: null,
        dissolvedOxygen: null,
        eColiLargeCells: null,
        eColiSmallCells: null,
        fluorometry: null,
        incubationOut: '',
        incubationTemp: null,
        incubationTime: '',
        logbookNumber: 1, // TODO list the logbookNumber
        nitrate: null,
        phosphate: null,
        precipitation: null,
        specifcConductivity: null,
        turbidity: null,
        totalChlorine: null,
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

.log-data-total {
  height: 16px;
  margin-bottom: 32px;
  width: 100%;

  color: #4d86a0;
  font-size: 13px;
  line-height: 16px;
}
</style>
