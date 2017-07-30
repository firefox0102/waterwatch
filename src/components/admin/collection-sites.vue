<template>
  <v-card class="site-reports-wrapper">
    <div class="collection-sites-header">
      <div class="collection-sites-header__primary-content">
        <div class="collection-sites-header__header">
          Collection Sites
        </div>

        <div class="collection-sites-header__subheader--bold">
          172 active of 200 total sites (TODO GET THESE METRICS)
        </div>
        <div class="collection-sites-header__subheader">
          Select a site to view logged data. Create and export reports of logged data for one or many collection sites.
        </div>
      </div>
      <div class="collection-sites-header__secondary-content">
        <v-btn v-on:click.native="testingclick" class="btn-nww--light">Add New Site</v-btn>
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
                v-model="filters.search"
                placeholder="Search collection sites"/>
            </div>
            <span class="site-reports-body-toolbar__text-content">Select date range:</span>
            <div class="site-reports-toolbar-datepicker">
              <v-dialog
                persistent
                v-model="filters.startDateModal"
                lazy
                full-width>
                <div
                  class="site-reports-toolbar-datepicker__activator"
                  slot="activator">
                  <span class="site-reports-toolbar-datepicker__activator-text">{{ filters.startDate ? filters.startDate : "Start Date"}}</span>
                  <i class="fa fa-calendar"></i>
                </div>
                <v-date-picker v-model="filters.startDate" scrollable >
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
                v-model="filters.endDateModal"
                lazy
                full-width>
                <div
                  class="site-reports-toolbar-datepicker__activator"
                  slot="activator">
                  <span class="site-reports-toolbar-datepicker__activator-text">{{ filters.endDate ? filters.endDate : "End Date"}}</span>
                  <i class="fa fa-calendar"></i>
                </div>
                <v-date-picker v-model="filters.endDate" scrollable >
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
                  <v-list-tile v-for="action in filters.exportActions" :key="action">
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
              v-bind:search="filters.search"
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
                  <router-link :to="{ name: 'Collection Site Data', params: { siteId: props.item.collectionSiteId } }">
                    {{ props.item.stationName }}
                  </router-link>
                </td>
                <td>{{ props.item.logbookAbbv }}</td>
                <td>{{ props.item.lab }}</td>
                <td>{{ props.item.lastCollectionDate }}</td>
                <td>{{ props.item.lastEColi }}</td>
                <td>{{ props.item.status }}</td>
                <td>{{ props.item.collectionPartner }}</td>
                <td>{{ props.item.hucName }}</td>
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

let collectionSitesRef = db.ref('collectionSites')

export default {
  name: 'site-reports',
  firebase: {
    collectionSites: collectionSitesRef
  },
  data: function () {
    return {
      pagination: {
        sortBy: 'stationName',
        descending: 'asc',
        totalItems: 0, // TODO
        loading: true // TODO
      },
      filters: {
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
        { text: 'Status', value: 'status' },
        { text: 'Collection Partner', value: 'collectionPartner' },
        { text: 'HUC Name', value: 'hucName' },
        { text: 'Adopt-A-Stream Name', value: 'hucName' },
        { text: 'STORET Name', value: 'hucName' },
        { text: '# Samples Collected', value: 'hucName' },
        { text: 'First Collection Data', value: 'hucName' },
        { text: 'Google Maps URL', value: 'hucName' },
        { text: 'Latitude', value: 'hucName' },
        { text: 'Longitude', value: 'hucName' },
        { text: 'HUC', value: 'hucName' }
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$toolbar-datepicker-height: 36px;
$toolbar-breakpoint: 1040px;

.site-reports-wrapper {
  padding: 0 24px 20px;
  background-color: #f7f7f7;
}

.site-reports-body {
  padding: 21px 24px 24px;
}

.site-reports-body-toolbar {
  display: flex;

  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;

  margin-bottom: 13px;

  @media screen and (min-width: $toolbar-breakpoint) {
    flex-direction: row;
    flex-wrap: nowrap;
  }

  &__primary-content {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;

    height: 36px;
    width: 100%;

    @media screen and (min-width: $toolbar-breakpoint) {
      width: 90%;
    }
  }

  &__secondary-content {
    display: flex;

    align-items: center;
    flex-wrap: nowrap;
    justify-content: flex-end;

    height: 36px;
    width: 100%;

    @media screen and (min-width: $toolbar-breakpoint) {
      width: 10%;
    }
  }

  &__text-content {
    min-width: 112px;
    width: 112px;
  }
}

.site-reports-toolbar-search {
  display: flex;
  height: 36px;
  margin-right: 29px;
  padding: 6px 16px;
  width: 330px;

  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);

  &__icon {
    height: 17.49px;
    margin-right: 28px;
    width: 17.49px;
  }

  &__input {
    width: 250px;

    &:focus {
      outline: none;
    }
  }
}

.site-reports-toolbar-export {
  width: 100%;

  color: #7fba00;

  &__activator {
    display: flex;

    justify-content: space-between;
    height: 28px;
    width: 100px;
    border-bottom: 2px solid #9b9b9b;
  }

  &__activator-text {
    height: 24px;
    padding-left: 2px;
    width: 47px;

    font-size: 16px;
    line-height: 24px;
  }
}

.collection-sites-header {
  display: flex;

  justify-content: space-between;
  padding: 22px 0 17px 32px;

  &__primary-content {
    // padding-left: 32px;
  }

  &__header {
    color: #004d71;
    font-size: 32px;
    font-weight: 300;
    letter-spacing: 1px;
    line-height: 38px;
  }

  &__subheader {
    color: #7d7d7d;
    font-size: 13px;
    line-height: 16px;

    &--bold {
      @extend .collection-sites-header__subheader;
      font-weight: 500;
    }
  }
}
</style>
