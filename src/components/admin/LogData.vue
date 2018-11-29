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
        class="page-content-body__form"
        autocomplete="false"
      >
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
            :nudge-left="0"
            class="input-group--limit-height"
            max-width="290px">
            <v-text-field
              slot="activator"
              label="Collection Date(YYYY-MM-DD)"
              v-model="newLogData.collectionDate"
              append-icon="event"
              class="input-group--limit-height"
              :rules="[(v) => !!v || 'Collection Date is required']"
              required>
            </v-text-field>
            <v-date-picker v-model="newLogData.collectionDate" no-title scrollable actions>
              <template slot-scope="{ save, cancel }">
                <v-card-actions>
                  <v-btn class="btn-nww" @click.native="save()">Save</v-btn>
                  <v-btn primary flat @click.native="cancel()">Cancel</v-btn>
                </v-card-actions>
              </template>
            </v-date-picker>
          </v-menu>

          <v-select
            v-bind:items="collectionSites"
            v-model="selectedSite"
            label="Collection Site"
            autocomplete
            item-text="logbookAbbv"
            class="input-group--limit-height"
            :rules="[(v) => !!v || 'Collection Site is required']"
            required
            bottom>
          </v-select>
          <v-text-field
            name="input-5-1"
            label="Notes"
            v-model="newLogData.notes"
            class="input-group--limit-height">
          </v-text-field>
          <v-menu
            lazy
            :close-on-content-click="false"
            v-model="controls.collectionTimeMenu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-right="40"
            max-width="290px"
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              label="Collection Time"
              required
              v-model="newLogData.collectionTime"
            >
            </v-text-field>
            <v-time-picker
              v-model="newLogData.collectionTime"
              autosave
              format="24hr"
            ></v-time-picker>
          </v-menu>
          <v-text-field
            label="Rainfall (in) [trace = 0.001]"
            class="input-group--limit-height"
            type="number"
            step="0.01"
            :rules="formRules.precipitation"
            v-model="newLogData.precipitation">
          </v-text-field>
          <a class="form-input-sub-text" target="_blank" href="https://www.wunderground.com/history/">Rainfall value from Weather Underground</a>
          <v-text-field
              label="Analyst (Initials)"
              class="input-group--limit-height"
              required
              :rules="formRules.required"
              v-model="newLogData.analyst">
          </v-text-field>
        </div>

        <!-- Column 2 -->
        <div class="page-content-body__column">
          <div class="page-content-body__header">
            Incubation and Parameters
          </div>
          <v-menu
            lazy
            :close-on-content-click="false"
            v-model="controls.incubationInMenu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-right="40"
            max-width="290px"
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              label="Incubation In Time"
              v-model="newLogData.incubationTime"
              :rules="formRules.incubationTimeRules"
            >
            </v-text-field>
            <v-time-picker
              v-model="newLogData.incubationTime"
              autosave
              format="24hr"
            ></v-time-picker>
          </v-menu>
          <v-text-field
            label="Incubation Temp (*C)"
            class="input-group--limit-height"
            type="number"
            :rules="formRules.incubationTempRules"
            v-model="newLogData.incubationTemp">
          </v-text-field>
          <v-menu
            lazy
            :close-on-content-click="false"
            v-model="controls.incubationOutMenu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-right="40"
            max-width="290px"
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              label="Incubation Out Time"
              v-model="newLogData.incubationOut"
              :rules="formRules.incubationOutTimeRules"
              class="input-group--limit-height">
            </v-text-field>
            <v-time-picker
              autosave
              v-model="newLogData.incubationOut"
              format="24hr"
            ></v-time-picker>
          </v-menu>
          <v-text-field
              label="# mL/100mL (Dilution)"
              class="input-group--limit-height"
              type="number"
              :rules="formRules.dilutionRules"
              v-model="newLogData.dilution">
          </v-text-field>
          <v-text-field
              label="Fluorometry"
              class="input-group--limit-height"
              type="number"
              step="0.01"
              :rules="formRules.fluorometryRules"
              v-model="newLogData.fluorometry">
          </v-text-field>
          <v-text-field
              label="Turbidity (NTU)"
              class="input-group--limit-height"
              type="number"
              step="0.01"
              :rules="formRules.turbidityRules"
              v-model="newLogData.turbidity">
          </v-text-field>
          <v-text-field
              label="Conductivity (µS)"
              class="input-group--limit-height"
              type="number"
              step="0.01"
              :rules="formRules.conductivityRules"
              v-model="newLogData.specificConductivity">
          </v-text-field>
          <p>Typical range for Conductivity is 0 - 750</p>
        </div>

        <!-- Column 3 -->
        <div class="page-content-body__column page-content-body__column--end">
          <div class="log-data-section-wrapper">
            <div class="page-content-body__header">
              Total Coliform
            </div>
            <v-text-field
                label="Large Cells"
                type="number"
                class="input-group--limit-height"
                :rules="formRules.largeCellsRules"
                v-model="newLogData.coliformLargeCells">
            </v-text-field>
            <v-text-field
                label="Small Cells"
                type="number"
                class="input-group--limit-height"
                :rules="formRules.smallCellsRules"
                v-model="newLogData.coliformSmallCells">
            </v-text-field>
          </div>

          <a class="log-data-total">Total Coliform (MPN/100mL) = {{ getTotalColiform }}</a>

          <div class="log-data-section-wrapper">
            <div class="page-content-body__header">
              E. coli
            </div>
            <v-text-field
                label="Large Cells"
                type="number"
                :rules="formRules.largeCellsRules"
                v-model="ecoliLargeCells">
            </v-text-field>
            <v-text-field
                label="Small Cells"
                type="number"
                :rules="formRules.smallCellsRules"
                v-model="ecoliSmallCells">
            </v-text-field>
          </div>

          <a class="log-data-total">E. coli (MPN/100mL) = {{ getTotalEcoli }}</a>

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
                label="Ammonium (mg/L)"
                class="input-group--limit-height"
                type="number"
                :rules="formRules.noNegatives"
                v-model="newLogData.ammonium">
            </v-text-field>
            <v-text-field
                label="Chlorophyll a (µg/L)"
                class="input-group--limit-height"
                type="number"
                :rules="formRules.noNegatives"
                v-model="newLogData.chlorophyll">
            </v-text-field>
            <v-text-field
                label="Dissolved Oxygen (mg/L)"
                class="input-group--limit-height"
                type="number"
                :rules="formRules.noNegatives"
                v-model="newLogData.dissolvedOxygen">
            </v-text-field>
            <v-text-field
                label="Nitrate (mg/L)"
                class="input-group--limit-height"
                type="number"
                :rules="formRules.noNegatives"
                v-model="newLogData.nitrate">
            </v-text-field>
            <v-text-field
                label="Phosphate (mg/L)"
                class="input-group--limit-height"
                type="number"
                :rules="formRules.noNegatives"
                v-model="newLogData.phosphate">
            </v-text-field>
            <v-text-field
              label="Secchi Depth (meters)"
              class="input-group--limit-height"
              type="number"
              :rules="formRules.noNegatives"
              v-model="newLogData.secchiDepth">
            </v-text-field>
            <v-text-field
                label="Total Chlorine (mg/L)"
                class="input-group--limit-height"
                type="number"
                :rules="formRules.noNegatives"
                v-model="newLogData.totalChlorine">
            </v-text-field>
            <v-text-field
                label="Water Temperature (*C)"
                class="input-group--limit-height"
                type="number"
                :rules="formRules.noNegatives"
                v-model="newLogData.waterTemp">
            </v-text-field>
          </div>

          <v-dialog v-model="controls.showDialog" lazy absolute>
            <v-btn
              slot="activator"
              type="submit"
              class="btn-nww log-data-submit-btn"
            >
              {{ "Log Data" }}
            </v-btn>
            <v-card class="card-alert">
              <v-card-title>
                <div class="headline log-data-confirm__header">Log Data?</div>
              </v-card-title>
              <v-card-text>Please confirm that you would like to log data</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  primary
                  flat
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
  import {
    db
  } from '../../helpers/firebase'
  import _ from 'lodash'
  import moment from 'moment'
  import { matrix } from '../../helpers/coeffecient'
  import MathService from '../../services/MathService'

  let collectionSitesRef = db.ref('collectionSites')
  let logbookNumberRef = db.ref('metaData/logbookNumber')

  export default {
    name: 'log-data',
    firebase: {
      collectionSites: collectionSitesRef.orderByChild('stationName'),
      logbookNumber: logbookNumberRef
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
      collectionSites: {
        handler () {
          if (this.collectionSites.length !== 0 && this.$route.params.id && !this.controls.initialSiteSet) {
            this.selectedSite = _.find(this.collectionSites, ['.key', this.$route.params.id])
            this.controls.initialSiteSet = true
          }
        }
      }
    },
    mounted () {
      this.setLogbookNumber()
    },
    computed: {
      getTotalColiform: function () {
        try {
          if (this.newLogData.coliformLargeCells && this.newLogData.coliformSmallCells && this.newLogData.dilution) {
            let matrixValue = matrix[this.newLogData.coliformLargeCells][this.newLogData.coliformSmallCells]
            let dilutionFactor = this.newLogData.dilution === 0 ? 0 : 100 / this.newLogData.dilution
            let computedValue = matrixValue * dilutionFactor
            let roundedValue = Math.max(Math.round(computedValue * 10) / 10).toFixed(1)

            if (this.newLogData.coliformLargeCells === '0' && this.newLogData.coliformSmallCells === '0') {
              return roundedValue
            } else if (this.newLogData.coliformLargeCells === '49' && this.newLogData.coliformSmallCells === '48') {
              return roundedValue
            }

            return roundedValue
          }
        } catch (e) {
          return 0
        }
      },
      getTotalEcoli: function () {
        try {
          if (this.ecoliLargeCells && this.ecoliSmallCells && this.newLogData.dilution) {
            let matrixValue = matrix[this.ecoliLargeCells][this.ecoliSmallCells]
            let dilutionFactor = this.newLogData.dilution === 0 ? 0 : 100 / this.newLogData.dilution
            let computedValue = matrixValue * dilutionFactor
            let roundedValue = Math.max(Math.round(computedValue * 10) / 10).toFixed(1)
            if (this.ecoliLargeCells === '0' && this.ecoliSmallCells === '0') {
              return roundedValue
            } else if (this.ecoliLargeCells === '49' && this.ecoliSmallCells === '48') {
              return roundedValue
            }

            return roundedValue
          }
        } catch (e) {
          return 0
        }
      }
    },
    data: function () {
      return {
        testData: null,
        collectionSites: [],
        selectedSite: null,
        logbookNumber: null,
        formValid: false,
        ecoliLargeCells: null,
        ecoliSmallCells: null,
        controls: {
          showAdditionalParams: false,
          showDialog: false,
          showDatepicker: false,
          initialSiteSet: false,
          incubationInMenu: false,
          incubationOutMenu: false
        },
        formRules: {
          conductivityRules: [
            (input) => {
              let conductivity = parseFloat(input)
              if (isNaN(conductivity)) { return true }
            }
          ],
          dilutionRules: [
            (input) => {
              let dilution = parseFloat(input)
              if (isNaN(dilution)) { return true }
              return (Number.isInteger(dilution) && dilution >= 0 && dilution <= 100) || 'Dilution must be a whole num. between 0-100'
            }
          ],
          fluorometryRules: [
            (input) => {
              let fluorometry = parseFloat(input)
              if (isNaN(fluorometry)) { return true }
              if (MathService.decimalPlaces(fluorometry)) { return 'Please limit to 3 decimal places' }
              return (fluorometry >= 0 && fluorometry <= 200) || 'Typical range is 0 - 200'
            }
          ],
          incubationTempRules: [
            (input) => {
              let temp = parseFloat(input)
              if (isNaN(temp)) { return true }
              return (temp >= 34.5 && temp <= 35.5) || 'Required Temp is 35°C +/- 0.5'
            }
          ],
          incubationTimeRules: [
            (startTime) => {
              if (startTime === null || startTime === undefined || /^\s*$/.test(startTime)) { return true } // If value is empty, return
              let startDate = dateObj(startTime)
              let testStartDate = dateObj(this.newLogData.collectionTime)
              let testEndDate = dateObj(this.newLogData.collectionTime).add(8, 'hours')

              function dateObj (d) {
                let date = moment()
                let parts = d.split(/:|\s/)
                date.hour(+parts.shift())
                date.minutes(+parts.shift())
                return date
              }

              return startDate.isBetween(testStartDate, testEndDate) || 'Should be within 6 hours of Collection Time'
            }
          ],
          incubationOutTimeRules: [
            (outTime) => {
              if (outTime === null || outTime === undefined || /^\s*$/.test(outTime)) { return true } // If value is empty, return

              let startDate = dateObj(this.newLogData.incubationTime)

              let endDateMin = startDate.clone().add(18, 'hours')
              let endDateMax = startDate.clone().add(22, 'hours')
              let outMoment = dateObj(outTime).date(endDateMax.date()).month(endDateMax.month()).year(endDateMax.year())

              function dateObj (d) {
                let date = moment()
                let parts = d.split(/:|\s/)
                date.hour(+parts.shift())
                date.minutes(+parts.shift())
                return date
              }

              return outMoment.isBetween(endDateMin, endDateMax) || 'Should be within 18 to 22 hours of Incubation In'
            }
          ],
          noNegatives: [
            (v) => {
              let value = parseFloat(v)
              if (isNaN(value)) { return true }
              return (value >= 0) || 'Should be greater than 0 (Leave empty if not recorded)'
            }
          ],
          largeCellsRules: [
            (v) => {
              let value = parseFloat(v)
              if (isNaN(value)) { return true }
              return (Number.isInteger(value) && value >= 0 && value <= 49) || 'Should be between 0-49 (Leave empty if not recorded)'
            }
          ],
          required: [
            (v) => {
              return (v !== '' || 'Value is required')
            }
          ],
          smallCellsRules: [
            (v) => {
              let value = parseFloat(v)
              if (isNaN(value)) { return true }
              return (Number.isInteger(value) && value >= 0 && value <= 48) || 'Should be between 0-48 (Leave empty if not recorded)'
            }
          ],
          turbidityRules: [
            (input) => {
              let turbidity = parseFloat(input)
              if (isNaN(turbidity)) { return true }
              return (turbidity >= 0 && turbidity <= 1500) || 'Typical range is 0 - 1500'
            }
          ],
          precipitation: [
            (v) => {
              let value = parseFloat(v)
              if (isNaN(value)) { return true }
              return (value >= 0) || 'Should be greater than or equal to 0 (Leave empty if not recorded)'
            }
          ]
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
          ecoliLargeCells: null,
          ecoliSmallCells: null,
          fluorometry: null,
          incubationOut: null,
          incubationTemp: null,
          incubationTime: null,
          logbookNumber: 1,
          nitrate: null,
          phosphate: null,
          precipitation: null,
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
          this.saveNewLog()
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

          this.newLogData.stationName = this.selectedSite.stationName
          this.newLogData.aasNumber = this.selectedSite.aasNumber || ''
          this.newLogData.adoptAStreamName = this.selectedSite.adoptAStreamName || ''
          this.newLogData.storetId = this.selectedSite.storetId || ''
          this.newLogData.logbookAbbv = this.selectedSite.logbookAbbv
          this.newLogData.ecoliLargeCells = this.ecoliLargeCells
          this.newLogData.ecoliSmallCells = this.ecoliSmallCells
          this.newLogData.totalEcoli = this.getTotalEcoli ? this.getTotalEcoli : null
          this.newLogData.totalColiform = this.getTotalColiform ? this.getTotalColiform : null
          this.newLogData.collectionSiteId = key
          this.newLogData.collectionDate = collDate
          this.newLogData.collectionSite = null

          this.updateCollectionSite(collDate, key)

          this.$firebaseRefs.reports.push(this.newLogData)
          .on('value', (snap) => {
            const snapcopy = {...snap.val()}
            const key = snap.key
            db.ref('allReports/' + key).set(snapcopy)
          })

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
      resetForm: function () {
        let oldLog = { ...this.newLogData }
        this.ecoliLargeCells = null
        this.ecoliSmallCells = null

        this.newLogData = {
          airTemp: null,
          ammonium: null,
          analyst: oldLog.analyst,
          chlorophyll: null,
          coliformLargeCells: '',
          coliformSmallCells: '',
          collectionDate: oldLog.collectionDate,
          collectionSite: null,
          collectionTime: '',
          dilution: null,
          dissolvedOxygen: null,
          ecoliLargeCells: null,
          ecoliSmallCells: null,
          fluorometry: null,
          incubationOut: '',
          incubationTemp: oldLog.incubationTemp,
          incubationTime: '',
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
        if (this.getTotalEcoli) {
          this.$firebaseRefs.collectionSites.child(key).child('lastEColiResult').set(this.getTotalEcoli)
        }

        // Last turbidity equation
        if (this.newLogData.turbidity) {
          this.$firebaseRefs.collectionSites.child(key).child('lastTurbidityResult').set(this.newLogData.turbidity)
        }

        // Last rainfall equation
        if (this.newLogData.precipitation) {
          this.$firebaseRefs.collectionSites.child(key).child('lastRainfallResult').set(this.newLogData.precipitation)
        }

        // Last specific conductivity equation
        if (this.newLogData.specificConductivity) {
          this.$firebaseRefs.collectionSites.child(key).child('lastConductivityResult').set(this.newLogData.specificConductivity)
        }

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
    /* margin: 24px; */
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
