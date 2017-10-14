<template>
  <v-card class="site-reports-wrapper">
    <div class="collection-sites-header">
      <div class="collection-sites-header__primary-content">
        <div class="collection-sites-header__header">
          Collection Sites
        </div>
        <div class="collection-sites-header__subheader--bold">
          {{ this.metaData[0] ? metaData[0]['.value'] : 0 }} active of {{ this.metaData[2] ? metaData[2]['.value'] : 0 }} total sites
        </div>
        <div class="collection-sites-header__subheader">
          Select a site to view logged data. Create and export reports of logged data for one or many collection sites.
        </div>
      </div>
      <div class="collection-sites-header__secondary-content">
        <v-layout row justify-center>
          <v-btn flat
            slot="activator"
            class="flat-action"
            v-on:click.native="toggleArchived()">
              {{ archivedText() }}
          </v-btn>
          <add-collection-site></add-collection-site>
        </v-layout>
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
                <v-menu lazy :close-on-content-click="false" v-model="controls.startDateModal" transition="scale-transition" offset-y full-width :nudge-left="0" max-width="290px">
                  <div
                    class="site-reports-toolbar-datepicker__activator"
                    slot="activator">
                    <span class="site-reports-toolbar-datepicker__activator-text">{{ startDate ? startDate : "Start Date"}}</span>
                    <i class="fa fa-calendar"></i>
                  </div>
                  <v-date-picker v-model="startDate" no-title scrollable actions>
                    <template scope="{ save, cancel }">
                      <v-card-actions>
                        <v-btn success @click.native="save()">Save</v-btn>
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
                    <template scope="{ save, cancel }">
                      <v-card-actions>
                        <v-btn success @click.native="save()">Save</v-btn>
                        <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-menu>
              </div>
            </div>
          </div>
          <div class="site-reports-body-toolbar__secondary-content">
            <div class="site-reports-actions">
              <edit-collection-site class="site-reports-actions__action" v-if="selected.length === 1" v-bind:collection-site="selected[0]"></edit-collection-site>
              <v-btn v-if="selected.length === 1 && !showArchived" v-on:click.native="archiveSite(selected[0])" class="site-reports-actions__action btn btn-nww">
                Archive
                <v-icon right dark>archive</v-icon>
              </v-btn>
              <v-btn v-if="selected.length === 1 && showArchived" v-on:click.native="unArchiveSite(selected[0])" class="site-reports-actions__action btn-nww--light btn btn--raised">
                Unarchive
                <v-icon right dark>unarchive</v-icon>
              </v-btn>
            </div>
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
                  <v-list-tile v-for="action in controls.exportActions" :key="action['.key']">
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
              <tr
                :active="props.selected"
                @click="props.selected = !props.selected"
              >
                <td>
                  <v-checkbox
                    primary
                    hide-details
                    :input-value="props.selected"
                  ></v-checkbox>
                </td>
                <td class="col-long table-cell__truncate--long">
                  <router-link
                    class="nww-table__primary-link"
                    :to="{ name: 'Collection Site Data', params: { siteId: props.item['.key'] } }">
                    {{ props.item.stationName }}
                  </router-link>
                </td>
                <td class="col-med table-cell__truncate-med">{{ props.item.logbookAbbv }}</td>
                <td>{{ props.item.lab }}</td>
                <td>{{ props.item.lastCollectionDate }}</td>
                <td>{{ props.item.lastEColiResult }}</td>
                <td>{{ props.item.active ? 'active' : 'inactive' }}</td>
                <td>{{ props.item.collectionPartner }}</td>
                <td>{{ props.item.hucName }}</td>
                <td class="col-long table-cell__truncate--long">{{ props.item.adoptAStreamName }}</td>
                <td class="col-long table-cell__truncate--long">{{ props.item.storetName }}</td>
                <td>{{ props.item.numSamples }}</td>
                <td>{{ props.item.firstCollectionDate }}</td>
                <td class="table-cell__truncate--long">
                  <a
                    v-bind:href="props.item.googleMapsUrl"
                    class="nww-table__primary-link"
                    target="_blank">
                    {{ props.item.googleMapsUrl }}
                  </a>
                </td>
                <td>{{ props.item.latitude }}</td>
                <td>{{ props.item.longitude }}</td>
                <td>{{ props.item.huc }}</td>
                <td>{{ props.item.isPrivate }}</td>
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
import EditCollectionSite from './EditCollectionSite'
import moment from 'moment'

let collectionSitesRef = db.ref('collectionSites')
let archivedRef = db.ref('archivedSites')
let metaRef = db.ref('metaData')
let todaysDate = moment(new Date()).format('YYYY-MM-DD')
let oldDate = moment(new Date()).subtract(6, 'months').format('YYYY-MM-DD')

export default {
  name: 'site-reports',
  components: {
    AddCollectionSite,
    EditCollectionSite
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
      showArchived: false,
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
        { text: 'Is Private', value: 'isPrivate' }
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
    archiveSite (item) {
      this.$bindAsArray('setArchivedSites', archivedRef)
      this.$bindAsArray('setCollectionSites', collectionSitesRef)

      let itemCopy = { ...item }
      delete itemCopy['.key']
      itemCopy.archived = true

      this.$firebaseRefs.setArchivedSites.child(item['.key']).set(itemCopy)
      this.$firebaseRefs.setCollectionSites.child(item['.key']).remove()

      // Decrement active sites number
      let newActive = this.metaData[0]['.value'] - 1
      this.$firebaseRefs.metaData.child('activeSites').set(newActive)

      this.selected = []

      this.$unbind('setArchivedSites')
      this.$unbind('setCollectionSites')
    },
    unArchiveSite (item) {
      this.$bindAsArray('setArchivedSites', archivedRef)
      this.$bindAsArray('setCollectionSites', collectionSitesRef)

      let itemCopy = { ...item }
      delete itemCopy['.key']
      itemCopy.archived = false
      this.$firebaseRefs.setCollectionSites.child(item['.key']).set(itemCopy)
      this.$firebaseRefs.setArchivedSites.child(item['.key']).remove()

      // Increment active sites number
      let newActive = this.metaData[0]['.value'] + 1
      this.$firebaseRefs.metaData.child('activeSites').set(newActive)

      this.selected = []

      this.$unbind('setArchivedSites')
      this.$unbind('setCollectionSites')
    },
    toggleArchived () {
      this.showArchived = !this.showArchived
      this.selected = []

      if (this.showArchived) {
        this.$unbind('collectionSites')
        this.$bindAsArray('collectionSites', archivedRef.orderByChild('lastCollectionDate').startAt(this.startDate).endAt(this.endDate))
      } else if (!this.showArchived) {
        this.$unbind('collectionSites')
        this.$bindAsArray('collectionSites', collectionSitesRef.orderByChild('lastCollectionDate').startAt(this.startDate).endAt(this.endDate))
      }
    },
    archivedText () {
      return this.showArchived ? 'Hide Archived' : 'View Archived'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../scss/colors";
@import "../../scss/collection-sites";
</style>
