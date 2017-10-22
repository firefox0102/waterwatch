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
                    <template scope="{ save, cancel }">
                      <v-card-actions>
                        <v-btn @click.native="save()" class="btn btn-nww">Save</v-btn>
                        <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
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
                    label="Collection Time"
                    v-model="targetLogData.collectionTime"
                    type="time"
                    suffix="EST"
                    class="input-group--limit-height">
                </v-text-field>
                <v-text-field
                    label="Analyst (Initials)"
                    class="input-group--limit-height"
                    v-model="targetLogData.analyst">
                </v-text-field>
              </div>

              <!-- Column 2 -->
              <div class="page-content-body__column">
                <div class="page-content-body__header">
                  Incubation and Parameters
                </div>
                <v-text-field
                    label="Incubation In Time"
                    v-model="targetLogData.incubationTime"
                    :rules="formRules.incubationTimeRules"
                    type="time"
                    class="input-group--limit-height">
                </v-text-field>
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
                <v-text-field
                    label="Rainfall (in)"
                    class="input-group--limit-height"
                    type="number"
                    step="0.01"
                    :rules="formRules.noNegatives"
                    v-model="targetLogData.precipitation">
                </v-text-field>
                <a class="form-input-sub-text" target="_blank" href="https://www.wunderground.com/history/">Rainfall value from Weather Underground</a>
                <v-text-field
                    label="Incubation Temp (*C)"
                    class="input-group--limit-height"
                    type="number"
                    :rules="formRules.incubationTempRules"
                    v-model="targetLogData.incubationTemp">
                </v-text-field>
                <v-text-field
                    label="Incubation Out"
                    v-model="targetLogData.incubationOut"
                    :rules="formRules.incubationOutTimeRules"
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
                  <v-text-field
                      name="input-5-1"
                      label="Notes"
                      v-model="targetLogData.notes"
                      class="input-group--limit-height"
                    ></v-text-field>
                </div>
                <div class="flex log-data-btn-row">
                  <v-btn
                    slot="activator"
                    v-on:click.native="close"
                    flat
                    primary
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

  let collectionSitesRef = db.ref('collectionSites')

  export default {
    name: 'edit-log-data',
    props: [
      'tableLogData',
      'routeCollectionSiteId',
      'resetSelected'
    ],
    firebase: {
      collectionSites: collectionSitesRef
    },
    watch: {
      collectionSites: {
        handler (newSites) {
          this.selectedSite = _.find(newSites, (obj) => { return obj['.key'] === this.routeCollectionSiteId }, this.routeCollectionSiteId)
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
      getTotalColiform () {
        if (this.targetLogData.coliformLargeCells && this.targetLogData.coliformSmallCells && this.targetLogData.dilution) {
          let matrixValue = matrix[this.targetLogData.coliformLargeCells][this.targetLogData.coliformSmallCells]
          let dilutionFactor = this.targetLogData.dilution === 0 ? 0 : 100 / this.targetLogData.dilution
          return matrixValue * dilutionFactor
        }
        return 0
      },
      getTotalEcoli () {
        if (this.ecoliLargeCells && this.ecoliSmallCells && this.targetLogData.dilution) {
          let matrixValue = matrix[this.ecoliLargeCells][this.ecoliSmallCells]
          let dilutionFactor = this.targetLogData.dilution === 0 ? 0 : 100 / this.targetLogData.dilution
          return matrixValue * dilutionFactor
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
          showDialog: false
        },
        formRules: {
          conductivityRules: [
            (input) => {
              let conductivity = parseFloat(input)
              if (isNaN(conductivity)) { return true }
              return (conductivity >= 0 && conductivity <= 750) || 'That number seems high. Normal range is 0 - 750'
            }
          ],
          dilutionRules: [
            (input) => {
              let dilution = parseFloat(input)
              if (isNaN(dilution)) { return true }
              return (Number.isInteger(dilution) && dilution >= 0) || 'Dilution must be a whole number'
            }
          ],
          fluorometryRules: [
            (input) => {
              let fluorometry = parseFloat(input)
              if (isNaN(fluorometry)) { return true }
              return (fluorometry >= 0 && fluorometry <= 200) || 'That number seems high. Normal range is 0 - 200'
            }
          ],
          incubationTempRules: [
            (input) => {
              let turbidity = parseFloat(input)
              if (isNaN(turbidity)) { return true }
              return (turbidity >= 10 && turbidity <= 50) || 'Normal range is 10 - 50'
            }
          ],
          incubationTimeRules: [
            (startTime) => {
              if (/^\s*$/.test(startTime)) { return true } // If value is empty, return
              let startDate = dateObj(startTime)

              function dateObj (d) {
                let date = moment()
                let parts = d.split(/:|\s/)
                date.hour(+parts.shift())
                date.minutes(+parts.shift())
                return date
              }

              return moment(startDate).isAfter(moment().subtract(6, 'hours')) || 'Incubation Time should be within last 6 hours'
            }
          ],
          incubationOutTimeRules: [
            (outTime) => {
              if (/^\s*$/.test(outTime)) { return true } // If value is empty, return
              let format = 'hh:mm:ss'
              let startDate = dateObj(this.targetLogData.incubationTime)

              let endDateMin = moment(startDate).add(18, 'hours').format(format)
              let endDateMax = moment(startDate).add(22, 'hours').format(format)
              let outMoment = dateObj(outTime).format(format)

              function dateObj (d, format) {
                let date = moment()
                let parts = d.split(/:|\s/)
                date.hour(+parts.shift())
                date.minutes(+parts.shift())
                return date
              }

              return moment(outMoment, format).isBetween(moment(endDateMin, format), moment(endDateMax, format)) || 'Incubation Out should be within 18 to 22 hours of Incubation In'
            }
          ],
          noNegatives: [
            (v) => {
              let value = parseFloat(v)
              if (isNaN(value)) { return true }
              return (value > 0) || 'Should be greater than 0 (Leave empty if not recorded)'
            }
          ],
          largeCellsRules: [
            (v) => {
              let value = parseFloat(v)
              if (isNaN(value)) { return true }
              return (Number.isInteger(value) && value >= 0 && value <= 49) || 'Should be between 0-49 (Leave empty if not recorded)'
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
              return (turbidity >= 0 && turbidity <= 1000) || 'That number seems high. Normal range is 0 - 1000'
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
          this.targetLogData.ecoliLargeCells = this.ecoliLargeCells
          this.targetLogData.ecoliSmallCells = this.ecoliSmallCells
          this.targetLogData.totalEcoli = this.getTotalEcoli
          this.targetLogData.totalColiform = this.getTotalColiform
          this.targetLogData.collectionSite = null

          let itemCopy = { ...this.targetLogData }
          delete itemCopy['.key']
          this.$firebaseRefs.firebaseLogObject.set(itemCopy)
          this.$unbind('firebaseLogObject')

          // Success!
          this.snackbar.successVisible = true
          this.controls.showDialog = false
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
        this.$firebaseRefs.collectionSites.child(key).child('lastEColiResult').set(this.getTotalEcoli)

        // Last turbidity equation
        this.$firebaseRefs.collectionSites.child(key).child('lastTurbidityResult').set(this.targetLogData.turbidity)

        // Last rainfall equation
        this.$firebaseRefs.collectionSites.child(key).child('lastRainfallResult').set(this.targetLogData.precipitation)

        // Last specific conductivity equation
        this.$firebaseRefs.collectionSites.child(key).child('lastConductivityResult').set(this.targetLogData.specificConductivity)
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
