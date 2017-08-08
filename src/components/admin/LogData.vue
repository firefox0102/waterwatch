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
          v-on:submit.prevent="submitLog"
          class="page-content-body__form">
          <!-- Column 1 -->
          <div class="page-content-body__column">
            <div class="page-content-body__header">
              Collection Details
            </div>
            <v-text-field
              label="Logbook Number"
              v-model="newLogData.logbookNumber"
              class="input-group--limit-height"
              disabled>
            </v-text-field>

            <v-menu
              lazy
              :close-on-content-click="false"
              v-model="controls.showDateicker"
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
                class="input-group--limit-height">
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
              class="input-group--limit-height"
              bottom>
            </v-select>
            <v-text-field
                label="Collection Time"
                v-model="newLogData.collectionTime"
                type="time"
                suffix="EST"
                class="input-group--limit-height">
            </v-text-field>
            <v-text-field
                label="Analyst (Initials)"
                class="input-group--limit-height"
                v-model="newLogData.analyst">
            </v-text-field>
            <v-select
              v-bind:items="labs"
              v-model="newLogData.lab"
              item-text=".value"
              item-value=".value"
              label="Lab"
              single-line
              class="input-group--limit-height"
              bottom>
            </v-select>
            <a class="form-input-sub-text--hug-input">Add New Lab (TODO)</a>
          </div>

          <!-- Column 2 -->
          <div class="page-content-body__column">
            <div class="page-content-body__header">
              Incubation and Parameters
            </div>
            <v-text-field
                label="Incubation In Time"
                v-model="newLogData.incubationTime"
                type="time"
                class="input-group--limit-height">
            </v-text-field>
            <v-text-field
                label="# mL/100mL (Dilution)"
                class="input-group--limit-height"
                type="number"
                v-model="newLogData.dilution">
            </v-text-field>
            <v-text-field
                label="Fluorometry"
                class="input-group--limit-height"
                type="number"
                v-model="newLogData.fluorometry">
            </v-text-field>
            <v-text-field
                label="Turbidity (NTU)"
                class="input-group--limit-height"
                type="number"
                v-model="newLogData.turbidity">
            </v-text-field>
            <v-text-field
                label="Conductivity (uS)"
                class="input-group--limit-height"
                type="number"
                v-model="newLogData.specifcConductivity">
            </v-text-field>
            <v-text-field
                label="Rainfall (in)"
                class="input-group--limit-height"
                type="number"
                v-model="newLogData.precipitation">
            </v-text-field>
            <a class="form-input-sub-text--hug-input">Rainfall value from Weather Underground (TODO)</a>
            <v-text-field
                label="Incubation Temp (*C)"
                class="input-group--limit-height"
                type="number"
                v-model="newLogData.incubationTemp">
            </v-text-field>
            <v-text-field
                label="Incubation Out"
                v-model="newLogData.incubationOut"
                type="time"
                class="input-group--limit-height">
            </v-text-field>
          </div>

          <!-- Column 3 -->
          <div class="page-content-body__column page-content-body__column--end">
            <div class="log-data-section-wrapper">
              <div class="page-content-body__header">
                Total Coliform
              </div>
              <v-text-field
                  label="Large Cells"
                  class="input-group--limit-height"
                  type="number"
                  v-model="newLogData.coliformLargeCells">
              </v-text-field>
              <v-text-field
                  label="Small Cells"
                  class="input-group--limit-height"
                  type="number"
                  v-model="newLogData.coliformSmallCells">
              </v-text-field>
            </div>

            <a class="log-data-total">Total Coliform = {{ getTotalColiform }}</a>

            <div class="log-data-section-wrapper">
              <div class="page-content-body__header">
                E. Coli
              </div>
              <v-text-field
                  label="Large Cells"
                  class="input-group--limit-height"
                  type="number"
                  v-model="newLogData.ecoliLargeCells">
              </v-text-field>
              <v-text-field
                  label="Small Cells"
                  class="input-group--limit-height"
                  type="number"
                  v-model="newLogData.ecoliSmallCells">
              </v-text-field>
            </div>

            <a class="log-data-total">Total E. coli = {{ getTotalEcoli }}</a>

            <div
              class="form-input-sub-text"
              v-if="controls.showAdditionalParams === false"
              v-on:click="toggleAdditionalParmas">
              See More Parameters
            </div>
            <div
              class="form-input-sub-text"
              v-if="controls.showAdditionalParams === true"
              v-on:click="toggleAdditionalParmas">
              Hide More Parameters
            </div>

            <div
              class="log-data-section-wrapper"
              v-if="controls.showAdditionalParams === true">
              <div class="page-content-body__header page-content-body__header--space-above">
                Additional Parameters
              </div>
              <v-text-field
                  label="Dissolved Oxygen"
                  class="input-group--limit-height"
                  type="number"
                  v-model="newLogData.dissolvedOxygen">
              </v-text-field>
              <v-text-field
                  label="Nitrate"
                  class="input-group--limit-height"
                  type="number"
                  v-model="newLogData.nitrate">
              </v-text-field>
              <v-text-field
                  label="Phosphate"
                  class="input-group--limit-height"
                  type="number"
                  v-model="newLogData.phosphate">
              </v-text-field>
              <v-text-field
                  label="Ammonium"
                  class="input-group--limit-height"
                  type="number"
                  v-model="newLogData.ammonium">
              </v-text-field>
              <v-text-field
                  label="Total Chlorine"
                  class="input-group--limit-height"
                  type="number"
                  v-model="newLogData.totalChlorine">
              </v-text-field>
              <v-text-field
                  label="Chlorophyll"
                  class="input-group--limit-height"
                  type="number"
                  v-model="newLogData.chlorophyll">
              </v-text-field>
              <v-text-field
                  name="input-5-1"
                  label="Notes"
                  v-model="newLogData.notes"
                  class="input-group--limit-height"
                ></v-text-field>
            </div>

            <v-dialog v-model="controls.showDialog" lazy absolute>
              <v-btn
                slot="activator"
                class="btn-nww log-data-submit-btn">
                Log Data
              </v-btn>
              <v-card>
                <v-card-title>
                  <div class="headline log-data-confirm__header">Log Data?</div>
                </v-card-title>
                <v-card-text>Please confirm that you would like to log data</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="green--text darken-1"
                    flat="flat"
                    v-on:click.native="controls.showDialog = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    class="btn-nww"
                    v-on:click.native="submitLog"
                    type="submit">
                    Confirm
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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

export default {
  name: 'log-data',
  firebase: {
    collectionSites: collectionSitesRef,
    reports: reportsRef,
    labs: labsRef
  },
  watch: {
    reports: {
      deep: true,
      handler (newArray) {
        this.newLogData.logbookNumber = this.getLastLogbookNumber(newArray)
      }
    }
  },
  computed: {
    getTotalColiform: function () {
      var num1 = parseInt(this.newLogData.coliformLargeCells)
      var num2 = parseInt(this.newLogData.coliformSmallCells)
      if (num1 + num2) {
        return num1 + num2
      } else {
        return ''
      }
    },
    getTotalEcoli: function () {
      var num1 = parseInt(this.newLogData.ecoliLargeCells)
      var num2 = parseInt(this.newLogData.ecoliSmallCells)
      if (num1 + num2) {
        return num1 + num2
      } else {
        return ''
      }
    }
  },
  data: function () {
    return {
      reports: [], // Placeholder for sites watching
      lastReport: 1,
      controls: {
        showAdditionalParams: false,
        showDialog: false,
        showDateicker: false
      },
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
        logbookNumber: 1,
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
    toggleAdditionalParmas: function () {
      this.controls.showAdditionalParams = !this.controls.showAdditionalParams
    },
    submitLog: function () {
      try {
        // Parse collection site data
        let selectedSite = this.newLogData.collectionSite
        this.newLogData.stationName = selectedSite.stationName
        this.newLogData.logbookAbbv = selectedSite.logbookAbbv
        this.newLogData.collectionSiteId = this.newLogData.collectionSite['.key']
        this.newLogData.collectionSite = null

        // Set logbook number
        // this.newLogData.logbookNumber = this.getLastLogbookNumber()

        this.$firebaseRefs.reports.push(this.newLogData)
        this.controls.showDialog = false
      } catch (e) {
        console.log(e)
        this.snackbar.visible = true
      }
    },
    getLastLogbookNumber: function (newArray) {
      return (newArray[newArray.length - 1] ? newArray[newArray.length - 1].logbookNumber : 0) + 1
    },
    resetForm: function () {
      var newLogNum = this.newLogData.logbookNumber + 1
      this.newLogData = {
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
        logbookNumber: newLogNum,
        nitrate: null,
        phosphate: null,
        precipitation: null,
        specifcConductivity: null,
        turbidity: null,
        totalChlorine: null,
        notes: ''
      }
    },
    getTotal: function (num1, num2) {
      var n1 = parseInt(num1)
      var n2 = parseInt(num2)
      if (n1 + n2 > 0) {
        return n1 + n2
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.log-data {
  margin: 24px;
  box-shadow: 0 1px 3px 0 rgba(155, 155, 155, 0.5);
}

.log-data-submit-btn {
  margin-top: 26px;
  width: 96px;
}

.log-data-section-wrapper {
  width: 100%;
}

.log-data-total {
  height: 16px;
  margin-bottom: 32px;
  width: 100%;

  color: #4d86a0;
  font-size: 13px;
  line-height: 16px;
}

.log-data-confirm {
  &__header {
    color: #004d71;
  }

  &__cancel {
    color: #7fba00;
  }
}
</style>
