<template>
  <v-card class="site-reports-wrapper">
    <div class="collection-sites-header">
      <div class="collection-sites-header__primary-content">
        <div class="collection-sites-header__header">
          Collection Sites
        </div>

        <div class="collection-sites-header__subheader--bold">
          {{ this.metaData[0] ? metaData[0]['.value'] : 0 }} active of {{ this.metaData[1] ? metaData[1]['.value'] : 0 }}
        </div>
        <div class="collection-sites-header__subheader">
          Select a site to view logged data. Create and export reports of logged data for one or many collection sites.
        </div>
      </div>
      <div class="collection-sites-header__secondary-content">
        <add-collection-site></add-collection-site>
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
                    <span class="site-reports-toolbar-datepicker__activator-text">{{ startDate ? startDate : "Start Date"}}</span>
                    <i class="fa fa-calendar"></i>
                  </div>
                  <v-date-picker v-model="startDate" scrollable >
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
                    <span class="site-reports-toolbar-datepicker__activator-text">{{ endDate ? endDate : "End Date"}}</span>
                    <i class="fa fa-calendar"></i>
                  </div>
                  <v-date-picker v-model="endDate" scrollable >
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
              v-bind:items="collectionSites"
              v-bind:pagination.sync="pagination"
              v-bind:search="controls.search"
              select-all
              selected-key="stationName"
              class="elevation-1">
            <template slot="headers" scope="props">
             <tr class="nww-table__header">
               <th>
                 <v-checkbox
                   primary
                   hide-details
                   @click.native="toggleAll"
                   :input-value="props.all"
                   :indeterminate="props.indeterminate"
                 ></v-checkbox>
               </th>
               <th v-for="header in props.headers" :key="header.text"
                 :class="['text-sm-left', 'column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                 @click="changeSort(header.value)">
                  {{ header.text }}
                  <v-icon>arrow_upward</v-icon>
               </th>
             </tr>
            </template>
            <template slot="items" scope="props">
              <tr :active="props.selected" @click="props.selected = !props.selected">
                <td>
                  <v-checkbox
                    primary
                    hide-details
                    :input-value="props.selected"
                  ></v-checkbox>
                </td>
                <td>
                  <router-link
                    class="nww-table__primary-link"
                    :to="{ name: 'Collection Site Data', params: { siteId: props.item['.key'] } }">
                    {{ props.item.stationName }}
                  </router-link>
                </td>
                <td>{{ props.item.logbookAbbv }}</td>
                <td>{{ props.item.lab }}</td>
                <td>{{ props.item.lastCollectionDate }}</td>
                <td>{{ props.item.lastEColi }}</td>
                <td>{{ props.item.active ? 'active' : 'inactive' }}</td>
                <td>{{ props.item.collectionPartner }}</td>
                <td>{{ props.item.hucName }}</td>
                <td>{{ props.item.adoptAStreamName }}</td>
                <td>{{ props.item.storetName }}</td>
                <td>{{ props.item.numSamples }}</td>
                <td>{{ props.item.firstCollectionDate }}</td>
                <td>{{ props.item.googleMapsUrl }}</td>
                <td>{{ props.item.latitude }}</td>
                <td>{{ props.item.longitude }}</td>
                <td>{{ props.item.huc }}</td>
                <td>
                  <v-menu bottom left>
                    <v-btn icon slot="activator">
                      <v-icon>more_horiz</v-icon>
                    </v-btn>
                    <v-list>
                      <v-list-tile v-if="!props.item.archived" v-on:click.native="archiveSite(props.item)">
                        <v-list-tile-title>Archive</v-list-tile-title>
                      </v-list-tile>
                      <v-list-tile v-if="props.item.archived" v-on:click.native="unArchiveSite(props.item)">
                        <v-list-tile-title>Un-Archive</v-list-tile-title>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-title>Edit</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </td>
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
import AddCollectionSite from './AddCollectionSite'
import moment from 'moment'

let collectionSitesRef = db.ref('collectionSites')
let metaRef = db.ref('metaData')
let todaysDate = moment(new Date()).format('YYYY-MM-DD')
let oldDate = moment(new Date()).subtract(6, 'months').format('YYYY-MM-DD')

export default {
  name: 'site-reports',
  components: {
    'add-collection-site': AddCollectionSite
  },
  firebase () {
    return {
      collectionSites: collectionSitesRef.orderByChild('lastCollectionDate').startAt(oldDate).endAt(todaysDate),
      metaData: metaRef
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
      pagination: {
        sortBy: 'stationName',
        descending: false,
        totalItems: 0,
        loading: true
      },
      controls: {
        search: '',
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
      headers: [
        { text: 'Station Name', value: 'stationName' },
        { text: 'Logbook abv', value: 'logbookAbbv' },
        { text: 'Lab', value: 'lab' },
        { text: 'Last Collection Date', value: 'lastCollectionDate' },
        { text: 'Last E. coli Result', value: 'lastEColi' },
        { text: 'Status', value: 'active' },
        { text: 'Collection Partner', value: 'collectionPartner' },
        { text: 'HUC Name', value: 'hucName' },
        { text: 'Adopt-A-Stream Name', value: 'adoptAStreamName' },
        { text: 'STORET Name', value: 'storetName' },
        { text: '# Samples Collected', value: 'numSamples' },
        { text: 'First Collection Date', value: 'firstCollectionDate' },
        { text: 'Google Maps URL', value: 'googleMapsUrl' },
        { text: 'Latitude', value: 'latitude' },
        { text: 'Longitude', value: 'longitude' },
        { text: 'HUC', value: 'huc' },
        { text: '', value: '' }
      ],
      selected: []
    }
  },
  methods: {
    toggleAll () {
      if (this.selected.length) {
        this.selected = []
      } else {
        this.selected = this.collectionSites.slice()
      }
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
      this.$unbind('collectionSites')
      this.$bindAsArray('collectionSites', collectionSitesRef.orderByChild('lastCollectionDate').startAt(this.startDate).endAt(this.endDate))
    },
    archiveSite (item, value) {
      if (!this.$firebaseRefs.archivedSites) {
        this.$bindAsArray('archivedSites', db.ref('archivedSites'))
      }

      let itemCopy = { ...item }
      delete itemCopy['.key']
      itemCopy.archived = true
      this.$firebaseRefs.archivedSites.child(item['.key']).set(itemCopy)

      this.$firebaseRefs.collectionSites.child(item['.key']).remove()
    },
    unArchiveSite (item) {
      if (!this.$firebaseRefs.archivedSites) {
        this.$bindAsArray('archivedSites', db.ref('archivedSites'))
      }

      let itemCopy = { ...item }
      delete itemCopy['.key']
      itemCopy.archived = false
      this.$firebaseRefs.collectionSites.child(item['.key']).set(itemCopy)

      this.$firebaseRefs.archivedSites.child(item['.key']).remove()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../scss/colors";
@import "../../scss/collection-sites";
</style>
