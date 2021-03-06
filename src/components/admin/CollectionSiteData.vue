<template>
  <v-card class="site-reports-wrapper">
    <div class="collection-sites-header">
      <div class="collection-sites-header__primary-content">
        <div class="collection-sites-header__header">
          {{ site ? site.stationName : '' }}
        </div>
        <div class="collection-sites-header__subheader-wrapper">
          <router-link class="collection-sites-header__subheader--nww" :to="{ name: 'Collection Sites'}">
            Back to List of Collection Sites
          </router-link>
        </div>
        <div class="collection-data-group">
          <div class="collection-data-group__row">
            <span class="collection-data-group__text--strong">
              Subwatershed (HUC12):
            </span>
            <span class="collection-data-group__text">
              {{ site ? site.hucName : '' }}
            </span>
            <span class="collection-data-group__divider">|</span>
            <span class="collection-data-group__text--strong">
              Lab:
            </span>
            <span class="collection-data-group__text">
              {{ site ? site.lab : '' }}
            </span>
            <span class="collection-data-group__divider">|</span>
            <span class="collection-data-group__text--strong">
              Collection Partner:
            </span>
            <span class="collection-data-group__text">
              {{ site ? site.collectionPartner : '' }}
            </span>
            <span class="collection-data-group__divider">|</span>
            <span class="collection-data-group__text--strong">
              Total Samples:
            </span>
            <span class="collection-data-group__text">
              {{ site ? reports.length : '' }}
            </span>
            <span class="collection-data-group__divider">|</span>
            <span class="collection-data-group__text--strong">
              First Collection Date:
            </span>
            <span class="collection-data-group__text">
              {{ site ? site.firstCollectionDate : '' }}
            </span>
          </div>
          <div class="collection-data-group__row">
            <a
              class="collection-data-group__link"
              v-bind:href="getGoogleMapsUrl"
              target="_blank">
              View Site on Google Maps
            </a>
          </div>
        </div>
      </div>
      <div class="collection-sites-header__secondary-content">
        <router-link class="log-new-data-btn" :to="{ name: 'Log Data Id', params: { 'id': $route.params.siteId } }">
          <v-btn class="btn-nww--light">
            Log New Data
          </v-btn>
        </router-link>
      </div>
    </div>
    <v-card>
      <div class="site-reports-body">
        <div class="site-reports-body-toolbar">
          <div class="site-reports-body-toolbar__primary-content">
            <div class="site-reports-toolbar-search">
              <i class="site-reports-toolbar-search__icon material-icons">search</i>
              <input
                class="site-reports-toolbar-search__input"
                v-model="controls.search"
                placeholder="Search reports"/>
            </div>
            <div class="site-reports-datepickers">
              <span class="site-reports-body-toolbar__text-content">Select export date range:</span>
              <div class="site-reports-toolbar-datepicker">
                <v-menu lazy :close-on-content-click="false" v-model="controls.startDateModal" transition="scale-transition" offset-y full-width :nudge-left="0" max-width="290px">
                  <div
                    class="site-reports-toolbar-datepicker__activator"
                    slot="activator">
                    <span class="site-reports-toolbar-datepicker__activator-text">{{ startDate ? startDate : "Start Date"}}</span>
                    <i class="fa fa-calendar"></i>
                  </div>
                  <v-date-picker v-model="startDate" no-title scrollable actions>
                    <template slot-scope="{ save, cancel }">
                      <v-card-actions>
                        <v-btn class="btn btn-nww" @click.native="save()">Save</v-btn>
                        <v-btn flat color="info" @click.native="cancel()">Cancel</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-menu>
              </div>
              <div class="site-reports-toolbar-datepicker">
                <v-menu lazy :close-on-content-click="false" v-model="controls.endDateModal" transition="scale-transition" offset-y full-width :nudge-left="0" max-width="290px">
                  <div
                    class="site-reports-toolbar-datepicker__activator"
                    slot="activator">
                    <span class="site-reports-toolbar-datepicker__activator-text">{{ endDate ? endDate : "Start Date"}}</span>
                    <i class="fa fa-calendar"></i>
                  </div>
                  <v-date-picker v-model="endDate" no-title scrollable actions>
                    <template slot-scope="{ save, cancel }">
                      <v-card-actions>
                        <v-btn class="btn btn-nww" @click.native="save()">Save</v-btn>
                        <v-btn flat color="info" @click.native="cancel()">Cancel</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-menu>
              </div>
            </div>
          </div>
          <div class="site-reports-body-toolbar__secondary-content">
            <div class="site-reports-actions">
              <edit-log-data
                v-bind:table-log-data="selected[0]"
                v-bind:reset-selected="resetSelected"
                v-bind:route-collection-site-id="$route.params.siteId"
                v-bind:post-submit-form="postSubmitForm"
                v-if="selected.length === 1">
              </edit-log-data>
              <v-btn
                v-if="selected.length > 0"
                color="error"
                v-on:click.native="controls.showDeleteDialog = true"
                class="site-reports-actions__action btn btn-nww"
              >
                  Delete
                <v-icon right dark>delete</v-icon>
              </v-btn>
              <v-dialog v-model="controls.showDeleteDialog" lazy absolute>
                <v-card class="card-alert">
                  <v-card-title>
                    <div class="headline log-data-confirm__header">Delete Data?</div>
                  </v-card-title>
                  <v-card-text>Please confirm that you would like to permenantly delete this data</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="info"
                      flat
                      v-on:click.native="controls.showDeleteDialog = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      class="btn-nww"
                      v-on:click.native="deleteSelected(selected)"
                      type="submit">
                      Delete Forever
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

            </div>
            <div
              class="site-reports-toolbar-export"
              v-if="selected.length === 0"
            >
              <v-menu
                offset-y
                left>
                <div
                  slot="activator"
                  class="site-reports-toolbar-export__activator">
                  <div class="site-reports-toolbar-export__activator-text">
                    Export
                  </div>
                  <i class="material-icons">arrow_drop_down</i>
                </div>
                <v-list>
                  <v-list-tile v-on:click="exportXls">
                    <v-list-tile-title>
                      Export as XLS
                    </v-list-tile-title>
                  </v-list-tile>
                   <v-list-tile v-on:click="adpotExport">
                    <v-list-tile-title>
                      Export for Adopt-A-Stream
                    </v-list-tile-title>
                  </v-list-tile>
                   <v-list-tile v-on:click="storetExport">
                    <v-list-tile-title>
                      Export for STORET
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </div>
          </div>
        </div>

        <v-card class="nww-table nww-table--left-align">
          <v-data-table
              v-model="selected"
              v-bind:headers="headers"
              v-bind:items="reports"
              v-bind:pagination.sync="pagination"
              v-bind:search="controls.search"
              select-all
              item-key=".key"
              class="elevation-1"
            >
            <template slot="headers" slot-scope="props">
              <tr class="nww-table__header" :active="props.selected" @click="props.selected = !props.selected">
                <th>
                  <v-checkbox
                    primary
                    hide-details
                    @click.native="toggleAll"
                    :input-value="props.all"
                    :indeterminate="props.indeterminate"
                  ></v-checkbox>
                </th>
                <th v-for="header in props.headers" :key="header.value"
                  :class="['text-sm-left', 'column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                  @click="changeSort(header.value)"
                >
                  {{ header.text }}
                  <v-icon>arrow_upward</v-icon>
                </th>
              </tr>
            </template>
            <template slot="items" slot-scope="props">
              <tr
                :active="props.selected"
                @click="props.selected = !props.selected"
              >
                <td>
                  <v-checkbox
                    primary
                    hide-detail
                    :input-value="props.selected"
                  ></v-checkbox>
                </td>
                <td>{{ props.item.logbookNumber }}</td>
                <td>{{ props.item.collectionDate }}</td>
                <td>{{ props.item.collectionTime }}</td>
                <td>{{ props.item.analyst }}</td>
                <td>{{ props.item.totalColiform }}</td>
                <td>{{ props.item.totalEcoli }}</td>
                <td>{{ props.item.fluorometry }}</td>
                <td>{{ props.item.turbidity }}</td>
                <td>{{ props.item.specificConductivity }}</td>
                <td>{{ props.item.precipitation }}</td>
                <td>{{ props.item.incubationTime }}</td>
                <td>{{ props.item.dilution }}</td>
                <td>{{ props.item.incubationTemp }}</td>
                <td>{{ props.item.incubationOut }}</td>
                <td class="col-long table-cell__truncate--long">{{ props.item.notes }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </v-card>
    <v-snackbar
      :timeout="snackbar.timeout"
      :error="true"
      v-model="snackbar.deleteVisible">
      {{snackbar.deleteSuccessMessage}}
      <v-btn dark flat @click.native="snackbar.deleteVisible = false">Close</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import { db } from '../../helpers/firebase'
import _ from 'lodash'
import moment from 'moment'
import EditLogData from './EditLogData'
import JsonExcel from '../json-excel/JsonExcel'
import axios from 'axios'

let collectionSitesRef = db.ref('collectionSites')
let todaysDate = moment(new Date()).format('YYYY-MM-DD')
let oldDate = moment(new Date()).subtract(1, 'months').format('YYYY-MM-DD')

export default {
  name: 'collection-sites',
  components: {
    EditLogData,
    JsonExcel
  },
  firebase () {
    return {
      firebaseSite: {
        source: collectionSitesRef.orderByKey().equalTo(this.$route.params.siteId)
      },
      reports: db.ref('reports/' + this.$route.params.siteId).orderByChild('collectionDate').startAt(oldDate).endAt(todaysDate)
    }
  },
  computed: {
    getGoogleMapsUrl: function () {
      if (this.site && this.site.longitude && this.site.latitude) {
        return `https://www.google.com/maps/place/${this.site.latitude},${this.site.longitude}`
      } else {
        return null
      }
    }
  },
  watch: {
    firebaseSite: {
      deep: true,
      handler (newArray) {
        this.site = newArray[0]
      }
    },
    startDate (val) {
      this.filterByDate()
    },
    endDate (val) {
      this.filterByDate()
    }
  },
  data: function () {
    return {
      firebaseSite: [],
      startDate: oldDate,
      endDate: todaysDate,
      site: {},
      pagination: {
        sortBy: 'logbookNumber',
        descending: 'asc',
        totalItems: 0,
        loading: true
      },
      controls: {
        search: '',
        startDateModal: false,
        endDateModal: false,
        exportAction: { label: 'Export' },
        showDeleteDialog: false
      },
      headers: [
        { text: 'Logbook #', value: 'logbookNumber' },
        { text: 'Collection Date', value: 'collectionDate' },
        { text: 'Collection Time', value: 'collectionTime' },
        { text: 'Analyst', value: 'analyst' },
        { text: 'Total Coliform (MPN/100mL)', value: 'totalColiform' },
        { text: 'E. coli (MPN/100mL)', value: 'totalEcoli' },
        { text: 'Fluorometry', value: 'fluorometry' },
        { text: 'Turbidity (NTU)', value: 'turbidity' },
        { text: 'Conductivity (uS)', value: 'specificConductivity' },
        { text: 'Rainfall (in)', value: 'precipitation' },
        { text: 'Incubation In Time', value: 'incubationTime' },
        { text: '# mL/100mL (Dilution)', value: 'dilution' },
        { text: 'Incubation Temp', value: 'incubationTemp' },
        { text: 'Incubation Out Time', value: 'incubationOut' },
        { text: 'Notes', value: 'notes' }
      ],
      selected: [],
      json_meta: [
        [{
          'key': 'charset',
          'value': 'utf-8'
        }]
      ],
      jsonFields: {
        'logbookNumber': 'site ID #',
        'logbookAbbv': 'Site Name',
        'collectionDate': 'Collection Date',
        'collectionTime': 'Collection Time',
        'precipitation': 'Rainfall (in.)',
        'dilution': 'Dilution (mL / 100mL)',
        'totalColiform': 'Total Coliform (MPN / 100mL)',
        'totalEcoli': 'E. coli (MPN/100mL)',
        'fluorometry': 'Fluorometry',
        'turbidity': 'Turbidity (NTU)',
        'specificConductivity': 'Specific Conductivity (µS)',
        'analyst': 'Analyst',
        'notes': 'Notes'
      },
      jsonFieldsAdopt: {
        'aasSiteName': 'Site S-',
        'collectionDate': 'Event date (mm/dd/yyyy)',
        'collectionTime': 'Time sample collected (hh:mm)',
        'participation': 'Total # of particip',
        'samplingTime': 'Time spent sampling (minutes)',
        'monitor': 'Adopt-A-Stream monitors',
        'precipitation': 'Amount of rain (inches)',
        'hours': 'In last (hours)',
        'specificConductivity': 'Conductivity (µS/cm)',
        'turbidity': 'Turbidity (NTU)',
        'film': 'Other than Petri film?',
        'totalEcoli': 'E.coli IDEXX (MPN / 100mL)'
      },
      jsonFieldsStoret: {
        'projectID': 'Project ID',
        'stationName': 'Monitoring Location ID',
        'lField': 'L',
        'activityType': 'Activity Type',
        'water': 'Activity Media Name',
        'collectionDate': 'Activity Start Date',
        'collectionTime': 'Activity Start Time',
        'timeZone': 'Activity Start Time Zone',
        'activityMeasure': 'Activity Depth/Height Measure',
        'activityUnit': 'Activity Depth/Height Unit',
        'collectionMethod': 'Sample Collection Method ID',
        'equipment': 'Sample Collection Equipment Name',
        'equipComment': 'Sample Collection Equipment Comment',
        'loggerLine': 'Data Logger Line',
        'characteristic': 'Characteristic Name',
        'methodSpeciation': 'Method Speciation',
        'resultDetection': 'Result Detection Condition',
        'totalEcoli': 'Result Value',
        'resultUnit': 'Result Unit',
        'qualifier': 'Result Measure Qualifier',
        'resultSampleFraction': 'Result Sample Fraction',
        'resultStatus': 'Result Status ID',
        'baseCode': 'Statistical Base Code',
        'valueType': 'Result Value Type',
        'analyticalMethod': 'Result Analytical Method ID',
        'analyticalMethodContext': 'Result Analytical Method Context',
        'startDate': 'Analysis Start Date',
        'limitMeasure': 'Result Detection/Quantitation Limit Type',
        'limitUnit': 'Result Detection/Quantitation Limit Unit',
        'comments': 'Result Comment'
      },
      snackbar: {
        deleteVisible: false,
        successVisible: false,
        successMessage: 'Data logged successfully!',
        deleteSuccessMessage: 'Reports deleted successfully',
        timeout: 6000
      }
    }
  },
  methods: {
    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.reports.slice()
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    filterByDate () {
      this.$unbind('reports')
      this.$bindAsArray('reports', db.ref('reports/' + this.$route.params.siteId).orderByChild('collectionDate').startAt(this.startDate).endAt(this.endDate))
    },
    resetSelected () {
      this.selected = []
    },
    postSubmitForm () {
      this.snackbar.successVisible = true
      this.resetSelected()
    },
    deleteSelected () {
      _.each(this.selected, (item) => {
        let key = item['.key']
        this.$firebaseRefs.reports.child(key).remove()
      })

      this.selected = []
      this.snackbar.deleteVisible = true
      this.controls.showDeleteDialog = false
    },
    adpotExport () {
      this.postToAPI('adopt_report', 'NWW_Adopt-A-Stream-Report.csv')
    },
    exportXls () {
      this.postToAPI('regular_report', 'NWW_Director_Report.csv')
    },
    storetExport () {
      this.postToAPI('storet_report', 'NWW_STORET_Report.csv')
    },
    postToAPI (exportType, exportName) {
      axios({
        url: 'https://waterwatch-cb707.firebaseapp.com/export',
        method: 'POST',
        data: {
          'export_type': exportType,
          'start_date': this.startDate,
          'end_date': this.endDate,
          'collection_sites': [this.$route.params.siteId]
        }
      }).then((response) => {
        let blob = new Blob([response.data], { type: 'application/vnd.ms-excel' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = exportName
        link.click()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../scss/colors";
@import "../../scss/collection-sites";

.log-new-data-btn {
  text-decoration: none;
}

.collection-data-group {
  display: flex;
  flex-direction: column;

  &__divider {
    margin: 0 8px;

    color: $color-sad-grey;
    font-size: 13px;
    font-weight: 400;
  }

  &__row {
    display: flex;
  }

  &__subheader-wrapper {
    color: $color-bumble-bee;
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;

    &--strong {
      @extend .collection-data-group__text;
      margin-right: 4px;

      font-weight: 500;
    }
  }

  &__text {
    color: $color-sad-grey;
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;

    &--strong {
      @extend .collection-data-group__text;
      margin-right: 4px;

      font-weight: 500;
    }
  }

  &__link {
    color: $color-bumble-bee;
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    text-decoration: underline;
  }
}

.collection-site-body {
  &__header {
    color: $color-iron-sea;
    font-size: 32px;
    font-weight: 300;
    letter-spacing: 1px;
    line-height: 38px;
  }

  &__subheader {
    color: $color-bumble-bee;
    font-size: 13px;
    font-weight: 400;
  }
}
</style>
