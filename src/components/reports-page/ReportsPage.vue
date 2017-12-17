<template>
  <v-card class="site-reports-wrapper">
     <div class="collection-sites-header">
      <div class="collection-sites-header__primary-content">
        <div class="collection-sites-header__header">
          All Reports
        </div>
        <div class="collection-sites-header__subheader">
          All reports can be found here. Filter by collection date to compile a list of reports in a set range.
        </div>
      </div>
      <div class="collection-sites-header__secondary-content">
        <router-link class="log-new-data-btn" :to="{ name: 'Log Data Id' }">
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
              <span class="site-reports-body-toolbar__text-content">Select collection date range:</span>
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
                        <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
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
                        <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-menu>
              </div>
            </div>
          </div>
          <div class="site-reports-body-toolbar__secondary-content">
            <div class="site-reports-toolbar-export">
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
                  <v-list-tile>
                    <v-list-tile-title>
                      <json-excel
                        v-bind:data = "getExportXls"
                        v-bind:fields = "jsonFields"
                        :meta = "json_meta"
                        name = "NWW_Director_Report.xls">
                        Export as XLS
                      </json-excel>
                    </v-list-tile-title>
                  </v-list-tile>
                   <v-list-tile>
                    <v-list-tile-title>
                      <json-excel
                        v-bind:data = "getExportAdopt"
                        v-bind:fields = "jsonFieldsAdopt"
                        :meta = "json_meta"
                        name = "NWW_Adopt-A-Stream-Report.xls">
                        Export for Adopt-A-Stream
                      </json-excel>
                    </v-list-tile-title>
                  </v-list-tile>
                   <v-list-tile>
                    <v-list-tile-title>
                      <json-excel
                        v-bind:data = "getExportStoret"
                        v-bind:fields = "jsonFieldsStoret"
                        :meta = "json_meta"
                        name = "NWW_Storet-Report.xls">
                        Export for STORET
                      </json-excel>
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
                <td>{{ props.item.stationName }}</td>
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
  </v-card>
</template>

<script>
import { db } from '../../helpers/firebase'
import _ from 'lodash'
import moment from 'moment'
import JsonExcel from '../json-excel/JsonExcel'

let todaysDate = moment(new Date()).format('YYYY-MM-DD')
let oldDate = moment(new Date('2010.01.21')).format('YYYY-MM-DD')

export default {
  name: 'reports-page',
  firebase () {
    return {
      reports: db.ref('allReports')
    }
  },
  components: {
    JsonExcel
  },
  computed: {
    getExportXls (selected) {
      let jsonData = []
      if (this.reports && this.selected.length) {
        jsonData = _.map(this.selected, function (report) {
          return {
            logbookAbbv: report.stationName || '',
            logbookNumber: report.logbookNumber || '',
            collectionDate: report.collectionDate || '',
            collectionTime: report.collectionTime || '',
            precipitation: report.precipitation || '',
            dilution: '2/100',
            totalColiform: report.totalColiform || '',
            totalEcoli: report.totalEcoli || '',
            fluorometry: report.fluorometry || '',
            turbidity: report.turbidity || '',
            specificConductivity: report.specificConductivity || '',
            analyst: report.analyst || '',
            notes: report.notes || ''
          }
        })
      }
      return jsonData
    },
    getExportAdopt () {
      let jsonData = []
      if (this.reports && this.selected.length) {
        jsonData = _.map(this.selected, (report) => {
          let startDate = moment(report.collectionDate).format('MM/DD/YY')

          return {
            aasSiteName: report.stationName + ' (' + report.aasNumber + ')' || '',
            collectionDate: startDate || '',
            collectionTime: report.collectionTime || '',
            participation: '1',
            samplingTime: '60',
            monitor: 'Micheal Meyer (25064)',
            precipitation: report.precipitation || '',
            hours: '24',
            specificConductivity: report.specificConductivity || '',
            turbidity: report.turbidity || '',
            film: 'yes',
            totalEcoli: report.totalEcoli || ''
          }
        })
      }
      return jsonData
    },
    getExportStoret () {
      let jsonData = []
      if (this.reports && this.selected.length) {
        jsonData = _.map(this.selected, (report) => {
          let lDate = moment(report.collectionDate).format('YYYYMMDD')
          let startDate = moment(report.collectionDate).format('YYYY-MM-DD')
          let storetTime = (report.collectionTime === '') ? '' : `${report.collectionTime}:00`

          return {
            projectID: 'NWW_2012',
            stationName: `${report.storetID}`,
            lField: `${report.storetID}${lDate}`,
            activityType: 'Sample-Routine',
            water: 'Water',
            collectionDate: startDate || '',
            collectionTime: storetTime || '',
            timeZone: 'EST',
            activityMeasure: ' ',
            activityUnit: ' ',
            collectionMethod: 'Grab Sample',
            equipment: 'Whirl-pak bag',
            equipComment: ' ',
            loggerLine: ' ',
            characteristic: 'Escherichia coli',
            methodSpeciation: ' ',
            resultDetection: ' ',
            totalEcoli: report.totalEcoli || '',
            resultUnit: 'MPN',
            qualifier: ' ',
            resultSampleFraction: ' ',
            resultStatus: 'Final',
            baseCode: ' ',
            valueType: 'Calculated',
            analyticalMethod: 'Colliert',
            analyticalMethodContext: 'IDEXX',
            startDate: ' ',
            limitMeasure: ' ',
            limitUnit: ' ',
            comments: ' '
          }
        })
      }
      return jsonData
    }
  },
  watch: {
    startDate (val) {
      this.filterByDate()
    },
    endDate (val) {
      this.filterByDate()
    }
  },
  data: function () {
    return {
      startDate: oldDate,
      endDate: todaysDate,
      site: {},
      pagination: {
        sortBy: 'collectionDate',
        descending: 'asc',
        totalItems: 0,
        loading: true
      },
      controls: {
        search: '',
        startDateModal: false,
        endDateModal: false,
        exportAction: { label: 'Export' }
      },
      headers: [
        { text: 'Station Name', value: 'stationName' },
        { text: 'Logbook #', value: 'logbookNumber' },
        { text: 'Collection Date', value: 'collectionDate' },
        { text: 'Collection Time', value: 'collectionTime' },
        { text: 'Analyst', value: 'analyst' },
        { text: 'Total Coliform (MPN/100mL)', value: 'totalColiform' },
        { text: 'E. coli (MPN/100mL)', value: 'totalEcoli' },
        { text: 'Fluorometry', value: 'fluorometry' },
        { text: 'Turbidity (NTU)', value: 'turbidity' },
        { text: 'Conductivity (uS)', value: 'specifcConductivity' },
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
        successVisible: false,
        successMessage: 'Data logged successfully!',
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
      this.$bindAsArray('reports', db.ref('allReports').orderByChild('collectionDate').startAt(this.startDate).endAt(this.endDate))
    },
    resetSelected () {
      this.selected = []
    },
    postSubmitForm () {
      this.snackbar.successVisible = true
      this.resetSelected()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../scss/colors";
@import "../../scss/collection-sites";

.site-reports-body-toolbar {
  &__text-content {
    min-width: 176px;
    width: 176px;
  }
}

.site-reports-body-toolbar__primary-content {
  min-width: 840px;
}

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
