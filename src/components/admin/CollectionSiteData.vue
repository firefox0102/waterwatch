<template>
  <v-card class="site-reports-wrapper">
    <div class="collection-sites-header">
      <div class="collection-sites-header__primary-content">
        <div class="collection-sites-header__header">
          {{ site ? site.stationName : '' }}
        </div>

        <div class="collection-sites-header__subheader-wrapper">
          <
          <router-link class="collection-sites-header__subheader--nww" :to="{ name: 'Collection Sites'}">
            Back to List of Collection Sites
          </router-link>
        </div>
        <div class="collection-data-group">
          <div class="collection-data-group__row">
            <span class="collection-data-group__text--strong">
              HUC:
            </span>
            <span class="collection-data-group__text">
              {{ site ? site.huc : '' }}
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
              {{ site ? site.totalSamples : '' }}
              <!-- TODO this doesn't exist yet, increment when logging new data -->
            </span>
            <span class="collection-data-group__divider">|</span>
            <span class="collection-data-group__text--strong">
              First Collection Date:
            </span>
            <span class="collection-data-group__text">
              {{ site ? site.firstCollectionDate : '' }}
              <!-- TODO this doesn't exist yet, set when logging new data -->
            </span>
          </div>
          <div class="collection-data-group__row">
            <a class="collection-data-group__link">
              View Data on NWW Map (TODO)
            </a>
            <span class="collection-data-group__divider">|</span>
            <a class="collection-data-group__link">
              View Site on Google Maps (TODO)
            </a>
          </div>
        </div>
      </div>
      <div class="collection-sites-header__secondary-content">
        <router-link class="log-new-data-btn" to="/logData">
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
                placeholder="Search collection sites"/>
            </div>
            <div class="site-reports-datepickers">
              <span class="site-reports-body-toolbar__text-content">Select date range:</span>
              <div class="site-reports-toolbar-datepicker">
                <v-dialog
                  persistent
                  v-model="controls.startDateModal"
                  lazy
                  full-width>
                  <div
                    class="site-reports-toolbar-datepicker__activator"
                    slot="activator">
                    <span class="site-reports-toolbar-datepicker__activator-text">{{ controls.startDate ? controls.startDate : "Start Date"}}</span>
                    <i class="fa fa-calendar"></i>
                  </div>
                  <v-date-picker v-model="controls.startDate" scrollable >
                    <template scope="{ save, cancel }">
                      <v-card-actions>
                        <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                        <v-btn flat primary @click.native="save()">Save</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-dialog>
              </div>
              <div class="site-reports-toolbar-datepicker">
                <v-dialog
                  persistent
                  v-model="controls.endDateModal"
                  lazy
                  full-width>
                  <div
                    class="site-reports-toolbar-datepicker__activator"
                    slot="activator">
                    <span class="site-reports-toolbar-datepicker__activator-text">{{ controls.endDate ? controls.endDate : "End Date"}}</span>
                    <i class="fa fa-calendar"></i>
                  </div>
                  <v-date-picker v-model="controls.endDate" scrollable >
                    <template scope="{ save, cancel }">
                      <v-card-actions>
                        <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                        <v-btn flat primary @click.native="save()">Save</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-dialog>
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
                  <v-list-tile v-for="action in controls.exportActions" :key="action">
                    <v-list-tile-title>{{ action.title }}</v-list-tile-title>
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
              :items="reports"
              select-all
              class="elevation-1"
              selected-key="logbookNumber"
              v-bind:pagination.sync="pagination"
            >
            <template slot="headers" scope="props">
              <tr>
                <th>
                  <v-checkbox
                    primary
                    hide-details
                    @click.native="toggleAll"
                    :input-value="props.all"
                    :indeterminate="props.indeterminate"
                  ></v-checkbox>
                </th>
                <th v-for="header in props.headers" :key="header"
                  :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                  @click="changeSort(header.value)"
                >
                  <v-icon>arrow_upward</v-icon>
                  {{ header.text }}
                </th>
              </tr>
            </template>
            <template slot="items" scope="props">
              <td>
                <v-checkbox
                  primary
                  hide-details
                  :input-value="props.selected"
                ></v-checkbox>
              </td>
              <td class="text-xs-right">{{ props.item.logbookNumber }}</td>
              <td class="text-xs-right">{{ props.item.collectionDate }}</td>
              <td class="text-xs-right">{{ props.item.collectionTime }}</td>
              <td class="text-xs-right">{{ props.item.totalEcoli }}</td>
              <td class="text-xs-right">{{ props.item.fluorometry }}</td>
              <td class="text-xs-right">{{ props.item.turbidity }}</td>
              <td class="text-xs-right">{{ props.item.specifcConductivity }}</td>
              <td class="text-xs-right">{{ props.item.precipitation }}</td>
              <td class="text-xs-right">{{ props.item.totalColiform }}</td>
              <td class="text-xs-right">{{ props.item.notes }}</td>
              <td class="text-xs-right">{{ props.item.dilution }}</td>
              <td class="text-xs-right">{{ props.item.incubationTime }}</td>
              <td class="text-xs-right">{{ props.item.incubationTemp }}</td>
              <td class="text-xs-right">{{ props.item.incubationOut }}</td>
              <td class="text-xs-right">{{ props.item.incubationTime }}</td>
              <td class="text-xs-right">{{ props.item.dilution }}</td>
              <td class="text-xs-right">{{ props.item.analyst }}</td>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </v-card>
  </v-card>
</template>

<script>
import { db } from '../../helpers/firebase'

let collectionSitesRef = db.ref('collectionSites')
let reportsRef = db.ref('reports')

export default {
  name: 'collection-sites',
  firebase () {
    return {
      firebaseSite: {
        source: collectionSitesRef.orderByKey().equalTo(this.$route.params.siteId)
      },
      reports: {
        source: reportsRef.orderByChild('collectionSiteId').equalTo(this.$route.params.siteId)
      }
    }
  },
  watch: {
    firebaseSite: {
      deep: true,
      handler (newArray) {
        this.site = newArray[0]
      }
    }
  },
  data: function () {
    return {
      firebaseSite: [],
      site: {},
      pagination: {
        sortBy: 'name',
        descending: 'asc',
        totalItems: 0, // TODO
        loading: true // TODO
      },
      controls: {
        search: '',
        startDate: null, // TODO with firebase
        endDate: null, // TODO with firebase
        startDateModal: false,
        endDateModal: false,
        exportAction: { label: 'Export' },
        exportActions: [
          {
            title: 'Export as CSV',
            callback: 'TODO MAKE CALLBACK'
          },
          {
            title: 'Export as XLS',
            callback: 'TODO MAKE CALLBACK'
          },
          {
            title: 'Export for Adopt-A-Stream',
            callback: 'TODO MAKE CALLBACK'
          },
          {
            title: 'Export for STORET',
            callback: 'TODO MAKE CALLBACK'
          }
        ]
      },
      selected: [],
      headers: [
        { text: 'Logbook #', value: 'logbookNumber' },
        { text: 'Collection Date', value: 'collectionDate' },
        { text: 'Collection Time', value: 'collectionTime' },
        { text: 'E. coli', value: 'totalEcoli' }, // TODO
        { text: 'Fluorometry', value: 'fluorometry' },
        { text: 'Turbidity (NTU)', value: 'turbidity' },
        { text: 'Conductivity (uS)', value: 'specifcConductivity' },
        { text: 'Rainfall', value: 'precipitation' },
        { text: 'Total Coliform', value: 'totalColiform' }, // TODO
        { text: 'Notes', value: 'notes' },
        { text: '# mL/100mL (Dilution)', value: 'dilution' },
        { text: 'Incubation In Time', value: 'incubationTime' },
        { text: 'Incubation Temp', value: 'incubationTemp' },
        { text: 'Incubation Out Time', value: 'incubationOut' },
        { text: 'Incubation In Time', value: 'incubationTime' },
        { text: '# mL/10incubationTemp0mL (Dilution)', value: 'dilution' },
        { text: 'Analyst', value: 'analyst' }
      ]
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../scss/colors";
@import "../../scss/collection-sites";

.collection-site-body {
  &__header {
    height: 16px;
    color: #4a4a4a;
    font-size: 24px;
    line-height: 16px;
  }
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
</style>
