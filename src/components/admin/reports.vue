<template>
  <v-card>
    <div class="reports-header">
      <div class="reports-header__header">
        Reports
      </div>

      <div class="reports-header__subheader">
        Create and export reports of logged data for one or many collection sites during selected time period.
      </div>
    </div>
    <div class="reports-body">
      <div class="reports-body-toolbar">
        <div class="reports-body-toolbar__primary-content">
          <div class="reports-toolbar-search">
            <i class="reports-toolbar-search__icon material-icons">search</i>
            <input
              class="reports-toolbar-search__input"
              placeholder="Search collection sites"/>
          </div>
          <span>Select date range:</span>
          <div class="reports-toolbar-datepicker">
            <v-dialog
              persistent
              v-model="filters.startDateModal"
              lazy
              full-width>
              <div
                class="reports-toolbar-datepicker__activator"
                slot="activator">
                <span class="reports-toolbar-datepicker__activator-text">{{ filters.startDate ? filters.startDate : "Start Date"}}</span>
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
          <div class="reports-toolbar-datepicker">
            <v-dialog
              persistent
              v-model="filters.endDateModal"
              lazy
              full-width>
              <div
                class="reports-toolbar-datepicker__activator"
                slot="activator">
                <span class="reports-toolbar-datepicker__activator-text">{{ filters.endDate ? filters.endDate : "End Date"}}</span>
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
        <div class="reports-body-toolbar__secondary-content">
          <div class="reports-toolbar-export">
            <v-menu
              offset-y
              left>
              <div
                slot="activator"
                class="reports-toolbar-export__activator">
                <div class="reports-toolbar-export__activator-text">
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
      <v-card class="nww-table">
        <v-data-table
            v-bind:headers="headers"
            :items="items"
            :total-items="totalItems"
            :loading="loading"
            v-bind:pagination.sync="pagination"
            class="elevation-1">
          <template slot="headerCell" scope="props">
            <span v-tooltip:bottom="{ 'html': props.header.text }">
              {{ props.header.text }}
            </span>
          </template>
          <template slot="items" scope="props">
            <td>{{ props.item.stationName }}</td>
            <td class="text-xs-right">{{ props.item.logbookAbv }}</td>
            <td class="text-xs-right">{{ props.item.latitude }}</td>
            <td class="text-xs-right">{{ props.item.longitude }}</td>
            <td class="text-xs-right">{{ props.item.collectionPartner }}</td>
            <td class="text-xs-right">{{ props.item.lab }}</td>
            <td class="text-xs-right">{{ props.item.huc }}</td>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'reports',
  data: function () {
    return {
      pagination: {
        sortBy: 'stationName',
        totalItems: 'totalItems', // TODO
        loading: 'loading' // TODO
      },
      filters: {
        search: '',
        startDate: null,
        endDate: null,
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
        ],
        startDateModal: false,
        endDateModal: false
      },
      headers: [
        { text: 'Station Name', value: 'stationName' },
        { text: 'Logbook abv', value: 'logbookAbv' },
        { text: 'Latitude', value: 'latitude' },
        { text: 'Longitude', value: 'longitude' },
        { text: 'Collection Partner', value: 'collectionPartner' },
        { text: 'Lab', value: 'lab' },
        { text: 'HUC', value: 'huc' }
      ],
      items: [
        {
          selected: false,
          stationName: 'Station 1',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK',
          lab: 'Petes Lab',
          huc: 'no idea'
        },
        {
          selected: false,
          stationName: 'Station 2',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK',
          lab: 'Petes Lab',
          huc: 'no idea'
        },
        {
          selected: false,
          stationName: 'Station 3',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK',
          lab: 'Petes Lab',
          huc: 'no idea'
        },
        {
          selected: false,
          stationName: 'Station 4',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK',
          lab: 'Petes Lab',
          huc: 'no idea'
        },
        {
          selected: false,
          stationName: 'Station 5',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK',
          lab: 'Petes Lab',
          huc: 'no idea'
        },
        {
          selected: false,
          stationName: 'Station 6',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK',
          lab: 'Petes Lab',
          huc: 'no idea'
        },
        {
          selected: false,
          stationName: 'Station 7',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK',
          lab: 'Petes Lab',
          huc: 'no idea'
        },
        {
          selected: false,
          stationName: 'Station 8',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK',
          lab: 'Petes Lab',
          huc: 'no idea'
        },
        {
          selected: false,
          stationName: 'Station 9',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK',
          lab: 'Petes Lab',
          huc: 'no idea'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  $toolbar-datepicker-height: 36px;

  .reports-header {
    display: flex;
    justify-content: space-between;
    padding: 22px 56px 29px;
    flex-direction: column;

    &__header {
      color: #004D71;
      font-size: 32px;
      font-weight: 300;
      letter-spacing: 1px;
      line-height: 38px;
    }

    &__subheader {
      color: #4D86A0;
      font-size: 13px;
      line-height: 16px;
    }
  }

  .reports-body {
    padding: 0 24px 24px;


  }

  .reports-body-toolbar {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    height: 36px;
    margin-bottom: 13px;
    justify-content: space-between;

    &__primary-content {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      width: 60%;
    }

    &__secondary-content {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      justify-content: flex-end;
      width: 10%;
    }
  }

  .reports-toolbar-search {
    display: flex;
  	height: 36px;
  	width: 330px;
    margin-right: 29px;
  	border-radius: 2px;
    padding: 6px 16px;
  	background-color: #FFFFFF;
  	box-shadow: 0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24);

    &__icon {
      height: 17.49px;
      width: 17.49px;
      margin-right: 28px;
    }

    &__input {
      width: 250px;
      &:focus {
        outline: none;
      }
    }
  }

  .reports-toolbar-datepicker {
  	height: $toolbar-datepicker-height;
  	width: 130px;
    margin-left: 10px;
  	border-radius: 2px;
  	background-color: #FFFFFF;
  	box-shadow: 0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24);

    &__activator {
      display: flex;
      align-items: center;
      height: $toolbar-datepicker-height;
      cursor: pointer;
      padding: 11px 10px 11px 15px;
    }

    &__activator-text {
    	height: 20px;
    	width: 71px;
    	color: #9B9B9B;
    	font-size: 14px;
    	line-height: 20px;
      margin-right: 19px;
    }
  }

  .reports-toolbar-export {
    width: 100%;
    color: #7FBA00;

    &__activator {
      height: 28px;
      width: 100px;
      border-bottom: 2px solid #9B9B9B;
    }

    &__activator-text {
    	height: 24px;
    	width: 47px;
      padding-left: 2px;
    	font-size: 16px;
    	line-height: 24px;
    }
  }
</style>
