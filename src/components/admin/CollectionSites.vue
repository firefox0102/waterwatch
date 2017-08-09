<template>
  <v-card class="site-reports-wrapper">
    <div class="collection-sites-header">
      <div class="collection-sites-header__primary-content">
        <div class="collection-sites-header__header">
          Collection Sites
        </div>

        <div class="collection-sites-header__subheader--bold">
          {{ activeSites.length }} active of {{ collectionSites.length }}
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
                 @click="changeSort(header.value)"
               >
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

let collectionSitesRef = db.ref('collectionSites')

export default {
  name: 'site-reports',
  components: {
    'add-collection-site': AddCollectionSite
  },
  firebase () {
    return {
      collectionSites: collectionSitesRef,
      activeSites: {
        source: collectionSitesRef.orderByChild('active').equalTo(true)
      }
    }
  },
  data: function () {
    return {
      pagination: {
        sortBy: 'stationName',
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
        { text: 'First Collection Data', value: 'firstCollectionDate' },
        { text: 'Google Maps URL', value: 'googleMapsUrl' },
        { text: 'Latitude', value: 'latitude' },
        { text: 'Longitude', value: 'longitude' },
        { text: 'HUC', value: 'huc' }
      ],
      selected: []
    }
  },
  methods: {
    toggleAll: function () {
      if (this.selected.length) {
        this.selected = []
      } else {
        this.selected = this.collectionSites.slice()
      }
    },
    changeSort: function (column) {
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
</style>
