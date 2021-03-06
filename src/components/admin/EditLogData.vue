<template>
  <div>
    <v-dialog full-width v-model="controls.showDialog" :overlay="true">
      <v-btn
        slot="activator"
        class="site-reports-actions__action site-reports-actions__action--no-margin btn btn-nww">
        Edit
        <v-icon right dark>edit</v-icon>
      </v-btn>
      <v-card>
          <div class="page-content-header">
            <div class="page-content-header__text">
              Edit Log Data
            </div>
            <div class="page-content-header__subtext--dark">
              Log new data for a collection site
            </div>
          </div>
          <div class="page-content-body">
            <v-form
              v-model="formValid"
              ref="form"
              v-on:submit.prevent="controls.showConfirmDialog = true"
              class="page-content-body__form">
              <!-- Column 1 -->
              <div class="page-content-body__column">
                <div class="page-content-body__header">
                  Collection Details
                </div>
                <v-text-field
                  label="Logbook Number"
                  v-model="targetLogData.logbookNumber"
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
                  max-width="290px">
                  <v-text-field
                    slot="activator"
                    label="Date"
                    v-model="targetLogData.collectionDate"
                    append-icon="event"
                    class="input-group--limit-height"
                    :rules="[(v) => !!v || 'Collection Date is required']"
                    required>
                  </v-text-field>
                  <v-date-picker v-model="targetLogData.collectionDate" no-title scrollable actions>
                    <template slot-scope="{ save, cancel }">
                      <v-card-actions>
                        <v-btn @click.native="save()" class="btn btn-nww">Save</v-btn>
                        <v-btn flat color="primary" @click.native="cancel()">Cancel</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-menu>

                <v-select
                  v-bind:items="collectionSites"
                  v-model="selectedSite"
                  item-disabled="true"
                  label="Collection Site"
                  autocomplete
                  item-text="stationName"
                  class="input-group--limit-height"
                  :rules="[(v) => !!v || 'Collection Site is required']"
                  bottom>
                </v-select>
                <v-text-field
                  name="input-5-1"
                  label="Notes"
                  v-model="targetLogData.notes"
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
                  min-width="290px">
                  <v-text-field
                    slot="activator"
                    label="Collection Time"
                    v-model="targetLogData.collectionTime">
                  </v-text-field>
                  <v-time-picker
                    v-model="targetLogData.collectionTime"
                    autosave
                    format="24hr">
                  </v-time-picker>
                </v-menu>
                <v-text-field
                    label="Rainfall (in) [trace = 0.001]"
                    class="input-group--limit-height"
                    type="number"
                    step="0.01"
                    :rules="formRules.precipitation"
                    v-model="targetLogData.precipitation">
                </v-text-field>
                <a class="form-input-sub-text" target="_blank" href="https://www.wunderground.com/history/">Rainfall value from Weather Underground</a>
                <v-text-field
                  label="Analyst (Initials)"
                  class="input-group--limit-height"
                  required
                  :rules="formRules.required"
                  v-model="targetLogData.analyst">
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
                    readonly
                    v-model="targetLogData.incubationTime"
                    :rules="formRules.incubationTimeRules"
                    class="input-group--limit-height">
                  </v-text-field>
                  <v-time-picker
                    v-model="targetLogData.incubationTime"
                    format="24hr"
                  ></v-time-picker>
                </v-menu>
                <v-text-field
                    label="Incubation Temp (*C)"
                    class="input-group--limit-height"
                    type="number"
                    :rules="formRules.incubationTempRules"
                    v-model="targetLogData.incubationTemp">
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
                    readonly
                    v-model="targetLogData.incubationOut"
                    :rules="formRules.incubationOutTimeRules"
                    class="input-group--limit-height">
                  </v-text-field>
                  <v-time-picker
                    v-model="targetLogData.incubationOut"
                    format="24hr"
                  ></v-time-picker>
                </v-menu>
                <v-text-field
                    label="# mL/100mL (Dilution)"
                    type="number"
                    :rules="formRules.dilutionRules"
                    v-model="targetLogData.dilution"
                    class="input-group--limit-height">
                </v-text-field>
                <v-text-field
                    label="Fluorometry"
                    class="input-group--limit-height"
                    type="number"
                    step="0.01"
                    :rules="formRules.fluorometryRules"
                    v-model="targetLogData.fluorometry">
                </v-text-field>
                <v-text-field
                    label="Turbidity (NTU)"
                    class="input-group--limit-height"
                    type="number"
                    step="0.01"
                    :rules="formRules.turbidityRules"
                    v-model="targetLogData.turbidity">
                </v-text-field>
                <v-text-field
                    label="Conductivity (µS)"
                    class="input-group--limit-height"
                    type="number"
                    step="0.01"
                    :rules="formRules.conductivityRules"
                    v-model="targetLogData.specificConductivity">
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
                      :rules="formRules.largeCellsRules"
                      v-model="targetLogData.coliformLargeCells">
                  </v-text-field>
                  <v-text-field
                      label="Small Cells"
                      type="number"
                      :rules="formRules.smallCellsRules"
                      v-model="targetLogData.coliformSmallCells">
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
                      :rules="formRules.noNegatives"
                      v-model="targetLogData.airTemp">
                  </v-text-field>
                  <v-text-field
                      label="Water Temperature (*C)"
                      class="input-group--limit-height"
                      type="number"
                      :rules="formRules.noNegatives"
                      v-model="targetLogData.waterTemp">
                  </v-text-field>
                    <v-text-field
                      label="Secchi Depth (meters)"
                      class="input-group--limit-height"
                      type="number"
                      :rules="formRules.noNegatives"
                      v-model="targetLogData.secchiDepth">
                  </v-text-field>
                  <v-text-field
                      label="Dissolved Oxygen (mg/L)"
                      class="input-group--limit-height"
                      type="number"
                      :rules="formRules.noNegatives"
                      v-model="targetLogData.dissolvedOxygen">
                  </v-text-field>
                  <v-text-field
                      label="Nitrate (mg/L)"
                      class="input-group--limit-height"
                      type="number"
                      :rules="formRules.noNegatives"
                      v-model="targetLogData.nitrate">
                  </v-text-field>
                  <v-text-field
                      label="Phosphate (mg/L)"
                      class="input-group--limit-height"
                      type="number"
                      :rules="formRules.noNegatives"
                      v-model="targetLogData.phosphate">
                  </v-text-field>
                  <v-text-field
                      label="Ammonium (mg/L)"
                      class="input-group--limit-height"
                      type="number"
                      :rules="formRules.noNegatives"
                      v-model="targetLogData.ammonium">
                  </v-text-field>
                  <v-text-field
                      label="Total Chlorine (mg/L)"
                      class="input-group--limit-height"
                      type="number"
                      :rules="formRules.noNegatives"
                      v-model="targetLogData.totalChlorine">
                  </v-text-field>
                  <v-text-field
                      label="Chlorophyll (µg/L)"
                      class="input-group--limit-height"
                      type="number"
                      :rules="formRules.noNegatives"
                      v-model="targetLogData.chlorophyll">
                  </v-text-field>
                </div>
                <div class="flex log-data-btn-row">
                  <v-btn
                    slot="activator"
                    v-on:click.native="close"
                    flat
                    color="primary"
                    class="btn">
                    Cancel
                  </v-btn>
                  <v-btn
                    slot="activator"
                    type="submit"
                    v-on:click.native="submitLog"
                    class="btn-nww">
                    Save Data
                  </v-btn>
                </div>
              </div>
            </v-form>
          </div>
      </v-card>
      <v-snackbar
        :timeout="snackbar.timeout"
        :error="true"
        v-model="snackbar.errorVisible">
        {{snackbar.errorMessage}}
        <v-btn dark flat @click.native="snackbar.errorVisible = false">Close</v-btn>
      </v-snackbar>
    </v-dialog>
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

  export default {
    name: 'edit-log-data',
    props: [
      'tableLogData',
      'routeCollectionSiteId',
      'resetSelected',
      'postSubmitForm'
    ],
    firebase: {
      collectionSites: collectionSitesRef.orderByChild('stationName')
    },
    watch: {
      collectionSites: {
        handler (newSites) {
          this.selectedSite = _.find(newSites, (obj) => { return obj['.key'] === this.routeCollectionSiteId }, this.routeCollectionSiteId)
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
      }
    },
    beforeMount () {
      // Copy the targetLogData and modify the read-only-collection
      this.targetLogData = _.cloneDeep(this.tableLogData)
    },
    mounted () {
      this.ecoliLargeCells = this.targetLogData.ecoliLargeCells
      this.ecoliSmallCells = this.targetLogData.ecoliSmallCells
    },
    computed: {
      getTotalColiform: function () {
        try {
          if (this.targetLogData.coliformLargeCells && this.targetLogData.coliformSmallCells && this.targetLogData.dilution) {
            let matrixValue = matrix[this.targetLogData.coliformLargeCells][this.targetLogData.coliformSmallCells]
            let dilutionFactor = this.targetLogData.dilution === 0 ? 0 : 100 / this.targetLogData.dilution
            let computedValue = matrixValue * dilutionFactor
            let roundedValue = Math.max(Math.round(computedValue * 10) / 10).toFixed(1)

            if (this.targetLogData.coliformLargeCells === '0' && this.targetLogData.coliformSmallCells === '0') {
              return roundedValue
            } else if (this.targetLogData.coliformLargeCells === '49' && this.targetLogData.coliformSmallCells === '48') {
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
          if (this.ecoliLargeCells && this.ecoliSmallCells && this.targetLogData.dilution) {
            let matrixValue = matrix[this.ecoliLargeCells][this.ecoliSmallCells]
            let dilutionFactor = this.targetLogData.dilution === 0 ? 0 : 100 / this.targetLogData.dilution
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
        targetLogData: {},
        collectionSites: [],
        selectedSite: null,
        formValid: false,
        ecoliLargeCells: null,
        ecoliSmallCells: null,
        controls: {
          showAdditionalParams: false,
          showConfirmDialog: false,
          showDatepicker: false,
          showDialog: false,
          incubationInMenu: false,
          incubationOutMenu: false
        },
        formRules: {
          conductivityRules: [
            (input) => {
              let conductivity = parseFloat(input)
              if (isNaN(conductivity)) { return true }
              return (typeof conductivity === 'number' && conductivity >= 0) || 'Conductivity must be greater than or equal to 0'
            }
          ],
          dilutionRules: [
            (input) => {
              let dilution = parseFloat(input)
              if (isNaN(dilution)) { return true }
              return (typeof dilution === 'number' && dilution >= 0.25 && dilution <= 100) || 'Dilution must be between 0.25-100'
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
              if (!this.targetLogData) { return true }
              if (startTime === null || startTime === undefined || /^\s*$/.test(startTime)) { return true } // If value is empty, return
              let startDate = dateObj(startTime)
              let testStartDate = dateObj(this.targetLogData.collectionTime)
              let testEndDate = dateObj(this.targetLogData.collectionTime).add(8, 'hours')

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
              if (!this.targetLogData) { return true }
              if (outTime === null || outTime === undefined || /^\s*$/.test(outTime)) { return true } // If value is empty, return

              let startDate = dateObj(this.targetLogData.incubationTime)

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
      close () {
        this.resetSelected()
        this.controls.showDialog = false
      },
      toggleAdditionalParmas: function () {
        this.controls.showAdditionalParams = !this.controls.showAdditionalParams
      },
      submitLog () {
        if (this.$refs.form.validate()) {
          this.updateExistingLog()
        } else {
          this.controls.showConfirmDialog = false
          this.snackbar.errorVisible = true
        }
      },
      updateExistingLog () {
        try {
          this.$bindAsObject('firebaseLogObject', db.ref('reports/' + this.routeCollectionSiteId + '/' + this.targetLogData['.key']))

          if (this.ecoliLargeCells) {
            this.targetLogData.ecoliLargeCells = this.ecoliLargeCells
          }
          if (this.ecoliSmallCells) {
            this.targetLogData.ecoliSmallCells = this.ecoliSmallCells
          }
          if (this.getTotalEcoli !== undefined) {
            this.targetLogData.totalEcoli = this.getTotalEcoli
          }
          if (this.getTotalColiform !== undefined) {
            this.targetLogData.totalColiform = this.getTotalColiform
          }
          this.targetLogData.collectionSite = null

          let itemCopy = { ...this.targetLogData }
          delete itemCopy['.key']

          if (this.tableLogData.collectionSite !== this.selectedSite['.key']) {
            let itemCopy = { ...this.targetLogData }
            delete itemCopy['.key']
            itemCopy.stationName = this.selectedSite.stationName
            itemCopy.aasNumber = this.selectedSite.aasNumber || ''
            itemCopy.storetId = this.selectedSite.storetId || ''
            itemCopy.logbookAbbv = this.selectedSite.logbookAbbv
            itemCopy.collectionSiteId = this.selectedSite['.key']

            this.$firebaseRefs.reports.push(itemCopy)
              .on('value', () => {
                this.$firebaseRefs.firebaseLogObject.remove()
              })
          } else {
            this.$firebaseRefs.firebaseLogObject.set(itemCopy)
          }

          this.$unbind('firebaseLogObject')

          // Success!
          this.controls.showDialog = false
          this.postSubmitForm()
        } catch (e) {
          console.log(e)
          this.snackbar.errorVisible = true
          this.controls.showConfirmDialog = false
        }
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
        if (this.targetLogData.turbidity) {
          this.$firebaseRefs.collectionSites.child(key).child('lastTurbidityResult').set(this.targetLogData.turbidity)
        }

        // Last rainfall equation
        if (this.targetLogData.precipitation) {
          this.$firebaseRefs.collectionSites.child(key).child('lastRainfallResult').set(this.targetLogData.precipitation)
        }

        // Last specific conductivity equation
        if (this.targetLogData.specificConductivity) {
          this.$firebaseRefs.collectionSites.child(key).child('lastConductivityResult').set(this.targetLogData.specificConductivity)
        }
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

  .log-data-btn-row {
    margin-top: 15px;
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
