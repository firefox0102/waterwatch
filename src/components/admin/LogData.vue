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
      <v-form
        v-model="formValid"
        ref="form"
        v-on:submit.prevent="controls.showDialog = true"
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
              v-model="controls.showDatepicker"
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
                class="input-group--limit-height"
                :rules="[(v) => !!v || 'Collection Date is required']"
                required
              >
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
              v-model="selectedSite"
              item-disabled="editingExistingLog"
              label="Collection Site"
              autocomplete
              item-text="stationName"
              class="input-group--limit-height"
              :rules="[(v) => !!v || 'Collection Site is required']"
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
              v-if="labSet"
              v-bind:items="labSet"
              v-model="newLogData.lab"
              label="Lab"
              class="input-group--limit-height"
              bottom>
            </v-select>
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
                v-model="newLogData.specificConductivity">
            </v-text-field>
            <v-text-field
                label="Rainfall (in)"
                class="input-group--limit-height"
                type="number"
                v-model="newLogData.precipitation">
            </v-text-field>
            <a class="form-input-sub-text" target="_blank" href="https://www.wunderground.com/history/">Rainfall value from Weather Underground</a>
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
                  hint="Should be between 0-49 (Leave empty if not recorded)"
                  persistent-hint
                  v-model="newLogData.coliformLargeCells">
              </v-text-field>
              <v-text-field
                  label="Small Cells"
                  class="input-group--limit-height"
                  type="number"
                  hint="Should be between 0-48 (Leave empty if not recorded)"
                  persistent-hint
                  v-model="newLogData.coliformSmallCells">
              </v-text-field>
            </div>

            <a class="log-data-total">Total Coliform = {{ getTotalColiform }}</a>

            <div class="log-data-section-wrapper">
              <div class="page-content-body__header">
                E. coli
              </div>
              <v-text-field
                  label="Large Cells"
                  class="input-group--limit-height"
                  type="number"
                  hint="Should be between 0-49 (Leave empty if not recorded)"
                  persistent-hint
                  v-model="newLogData.ecoliLargeCells">
              </v-text-field>
              <v-text-field
                  label="Small Cells"
                  class="input-group--limit-height"
                  type="number"
                  hint="Should be between 0-48 (Leave empty if not recorded)"
                  persistent-hint
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
                  label="Air Temperature (*C)"
                  class="input-group--limit-height"
                  type="number"
                  v-model="newLogData.airTemp">
              </v-text-field>
              <v-text-field
                  label="Water Temperature (*C)"
                  class="input-group--limit-height"
                  type="number"
                  v-model="newLogData.waterTemp">
              </v-text-field>
               <v-text-field
                  label="Secchi Depth (meters)"
                  class="input-group--limit-height"
                  type="number"
                  v-model="newLogData.secchiDepth">
              </v-text-field>

              <v-text-field
                  label="Dissolved Oxygen (mg/L)"
                  class="input-group--limit-height"
                  type="number"
                  v-model="newLogData.dissolvedOxygen">
              </v-text-field>
              <v-text-field
                  label="Nitrate (mg/L)"
                  class="input-group--limit-height"
                  type="number"
                  v-model="newLogData.nitrate">
              </v-text-field>
              <v-text-field
                  label="Phosphate (mg/L)"
                  class="input-group--limit-height"
                  type="number"
                  v-model="newLogData.phosphate">
              </v-text-field>
              <v-text-field
                  label="Ammonium (mg/L)"
                  class="input-group--limit-height"
                  type="number"
                  v-model="newLogData.ammonium">
              </v-text-field>
              <v-text-field
                  label="Total Chlorine (mg/L)"
                  class="input-group--limit-height"
                  type="number"
                  v-model="newLogData.totalChlorine">
              </v-text-field>
              <v-text-field
                  label="Chlorophyll (µg/L)"
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
                type="submit"
                class="btn-nww log-data-submit-btn">
                {{ editingExistingLog ? "Save Data" : "Log Data" }}
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
        </v-form>
    </div>
    <v-snackbar
      :timeout="snackbar.timeout"
      :error="true"
      v-model="snackbar.errorVisible">
      {{snackbar.errorMessage}}
      <v-btn dark flat @click.native="snackbar.errorVisible = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar
      :timeout="snackbar.timeout"
      :info="true"
      v-model="snackbar.successVisible">
      {{snackbar.successMessage}}
      <v-btn dark flat @click.native="snackbar.successVisible = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { db } from '../../helpers/firebase'
import _ from 'lodash'
import moment from 'moment'

let collectionSitesRef = db.ref('collectionSites')
let logbookNumberRef = db.ref('metaData/logbookNumber')
let labsRef = db.ref('labs')

export default {
  name: 'log-data',
  firebase: {
    collectionSites: collectionSitesRef,
    logbookNumber: logbookNumberRef,
    labs: labsRef
  },
  watch: {
    logbookNumber: {
      deep: true,
      handler () {
        this.setLogbookNumber()
      }
    },
    selectedSite: {
      handler (newSite) {
        if (newSite) {
          if (this.$firebaseRefs.reports) {
            this.$unbind('reports')
          }
          this.$bindAsArray('reports', db.ref('reports/' + newSite['.key']))
        }
      }
    },
    labs: {
      handler (newSite) {
        this.labSet = _.map(this.labs, '.value')
      }
    },
    newLogData: {
      handler (logData) {
        if (this.editingExistingLog && this.collectionSites) {
          this.selectedSite = _.find(this.collectionSites, '.key', logData.collectionSiteId)
        }
      }
    }
  },
  mounted () {
    this.setLogbookNumber()

    if (this.$route.params.siteId && this.$route.params.reportId) {
      this.editingExistingLog = true
      this.$bindAsObject('newLogData', db.ref('reports/' + this.$route.params.siteId + '/' + this.$route.params.reportId))
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
      labs: [],
      labSet: [],
      selectedSite: null,
      logbookNumber: null,
      editingExistingLog: false,
      formValid: false,
      controls: {
        showAdditionalParams: false,
        showDialog: false,
        showDatepicker: false
      },
      newLogData: {
        airTemp: null,
        ammonium: null,
        analyst: '',
        chlorophyll: null,
        coliformLargeCells: '',
        coliformSmallCells: '',
        collectionDate: moment(new Date().toISOString()).format('YYYY-MM-DD'),
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
        lab: 'Atlanta',
        logbookNumber: 1,
        nitrate: null,
        phosphate: null,
        precipitation: 0.00,
        secchiDepth: null,
        specificConductivity: null,
        turbidity: null,
        totalChlorine: null,
        notes: '',
        waterTemp: null
      },
      snackbar: {
        errorVisible: false,
        successVisible: false,
        successMessage: 'Data logged successfully!',
        errorMessage: 'There was an issue logging your data',
        timeout: 6000
      }
    }
  },
  methods: {
    toggleAdditionalParmas: function () {
      this.controls.showAdditionalParams = !this.controls.showAdditionalParams
    },
    submitLog () {
      if (this.$refs.form.validate()) {
        if (this.editingExistingLog) {
          this.updateExistingLog()
        } else {
          this.saveNewLog()
        }
      } else {
        this.controls.showDialog = false
        this.snackbar.errorVisible = true
      }
    },
    saveNewLog: function () {
      try {
        // Parse collection site data
        let collDate = this.newLogData.collectionDate
        let key = this.selectedSite['.key']

        this.updateCollectionSite(collDate, key)

        this.newLogData.stationName = this.selectedSite.stationName
        this.newLogData.logbookAbbv = this.selectedSite.logbookAbbv
        this.newLogData.totalEcoli = this.getTotalEcoli
        this.newLogData.totalColiform = this.getTotalColiform
        this.newLogData.collectionSiteId = key
        this.newLogData.collectionDate = collDate
        this.newLogData.collectionSite = null

        this.$firebaseRefs.reports.push(this.newLogData)
        this.incrementLogbookNumber(this.newLogData.logbookNumber)

        // Success!
        this.snackbar.successVisible = true
        this.controls.showDialog = false

        this.resetForm()
      } catch (e) {
        console.log(e)
        this.snackbar.errorVisible = true
        this.controls.showDialog = false
      }
    },
    updateExistingLog () {
      try {
        this.newLogData.totalEcoli = this.getTotalEcoli
        this.newLogData.totalColiform = this.getTotalColiform
        this.newLogData.collectionSite = null

        let itemCopy = { ...this.newLogData }
        delete itemCopy['.key']
        this.$firebaseRefs.newLogData.set(itemCopy)
        this.$unbind('newLogData')

        // Success!
        this.snackbar.successVisible = true
        this.controls.showDialog = false

        this.resetForm()
      } catch (e) {
        console.log(e)
        this.snackbar.errorVisible = true
        this.controls.showDialog = false
      }
    },
    resetForm: function () {
      if (this.editingExistingLog) {
        this.editingExistingLog = false
      }

      let oldLog = {...this.newLogData}

      this.newLogData = {
        airTemp: null,
        ammonium: null,
        analyst: oldLog.analyst,
        chlorophyll: null,
        coliformLargeCells: '',
        coliformSmallCells: '',
        collectionDate: moment(new Date().toISOString()).format('YYYY-MM-DD'),
        collectionSite: null,
        collectionTime: '',
        dilution: null,
        dissolvedOxygen: null,
        eColiLargeCells: null,
        eColiSmallCells: null,
        fluorometry: null,
        incubationOut: '',
        incubationTemp: oldLog.incubationTemp,
        incubationTime: '',
        lab: 'Atlanta',
        logbookNumber: 0,
        nitrate: null,
        phosphate: null,
        precipitation: oldLog.precipitation,
        secchiDepth: null,
        specificConductivity: null,
        turbidity: null,
        totalChlorine: null,
        notes: '',
        waterTemp: null
      }

      this.setLogbookNumber()
    },
    setLogbookNumber (logbookObject) {
      _.each(this.logbookNumber, (currentLogbookNumber) => {
        this.newLogData.logbookNumber = currentLogbookNumber['.value'] + 1
      })
    },
    updateCollectionSite (collDate, key) {
      var newNumberSamples = this.selectedSite.numSamples ? this.selectedSite.numSamples + 1 : 1
      this.$firebaseRefs.collectionSites.child(key).child('numSamples').set(newNumberSamples)

      // Set collection site properties from logged report
      this.$firebaseRefs.collectionSites.child(key).child('lastCollectionDate').set(collDate)

      // Last ecoli equation
      // TODO ECOLI EQUATION
      this.$firebaseRefs.collectionSites.child(key).child('lastEColiResult').set(this.newLogData.ecoliLargeCells)

      // Last turbidity equation
      this.$firebaseRefs.collectionSites.child(key).child('lastTurbidityResult').set(this.newLogData.turbidity)

      // Last rainfall equation
      this.$firebaseRefs.collectionSites.child(key).child('lastRainfallResult').set(this.newLogData.precipitation)

      // Last specific conductivity equation
      this.$firebaseRefs.collectionSites.child(key).child('lastConductivityResult').set(this.newLogData.specificConductivity)

      if (!this.selectedSite.firstCollectionDate) {
        this.$firebaseRefs.collectionSites.child(key).child('firstCollectionDate').set(collDate)
      }
    },
    incrementLogbookNumber (newLogbookNum) {
      this.$firebaseRefs.logbookNumber.child('currentLogbookNumber').set(newLogbookNum)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/colors";

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

  color: $color-warlock;
  font-size: 13px;
  line-height: 16px;
}

.log-data-confirm {
  &__header {
    color: $color-iron-sea;
  }

  &__cancel {
    color: $color-nww-green;
  }
}
</style>
