<template>
  <div class="data-page-wrapper">
    <aside class="data-sidebar" v-bind:class="{ 'data-sidebar--collapsed': filters.sidebar}">
      <div class="data-sidebar__header">
        <div
          class="data-sidebar-toggle"
          v-on:click="toggleSidebar">
          <i class="data-sidebar-toggle__caret material-icons">arrow_drop_down</i>
        </div>
        <div class="data-sidebar-search">
          <input class="data-sidebar-search__input" v-model="filters.search" placeholder="Search collection sites" />
          <i class="data-sidebar-search__icon material-icons">search</i>
        </div>
        <div class="data-sidebar-filter-text">
          Showing all sites
        </div>
        <div class="data-sidebar-filter">
          <v-select
              v-bind:items="filters.filterSites"
              v-model="filters.selectedItem"
              label="Filter"
              dark
              single-line
              bottom
            ></v-select>
        </div>
      </div>
      <div class="data-sidebar__body">
        <div
          class="data-sidebar-list-item"
          v-for=" item in items">
            {{ item.stationName }}
        </div>
      </div>
    </aside>
    <div class="data-body" v-bind:class="{ 'data-body--collapsed': filters.sidebar}">
      <div class="data-body__dynamic-column">
        <div class="map-wrapper">

        </div>
      </div>

      <div class="data-body__fixed-column">
        <!-- Controls Card -->
        <div class="controls-card">
          <div class="controls-card-header">
            Controls
          </div>
          <div class="controls-card-body">
            <div
              class="controls-card-control-group"
              v-bind:class="{ 'controls-card-control-group--collapsed': filters.selectedControl != 'dateRange'}">
              <div
                class="controls-card-control-group__header"
                v-on:click="filters.selectedControl = 'dateRange'">
                Date Range
                <i class="material-icons">arrow_drop_up</i>
              </div>
              <div class="controls-card-control-group__content">
                Select date range:
                <div class="date-picker-wrapper">
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
              </div>
            </div>
            <div
              class="controls-card-control-group"
              v-bind:class="{ 'controls-card-control-group--collapsed': filters.selectedControl != 'report'}">
              <div
                class="controls-card-control-group__header"
                v-on:click="filters.selectedControl = 'report'">
                Reports
                <i class="material-icons">arrow_drop_up</i>
              </div>
              <div class="controls-card-control-group__content">
                Reports stuff here
              </div>
            </div>
            <div
              class="controls-card-control-group"
              v-bind:class="{ 'controls-card-control-group--collapsed': filters.selectedControl != 'mapLayer'}">
              <div
                class="controls-card-control-group__header"
                v-on:click="filters.selectedControl = 'mapLayer'">
                Map Layer
                <i class="material-icons">arrow_drop_up</i>
              </div>
              <div class="controls-card-control-group__content">
                Map Layer Content
              </div>
            </div>
          </div>
        </div>

        <!-- Graph 1 -->
        <div class="graph-card">
          <div class="graph-card-title">
            <span class="graph-card-title__primary">
              E. Coli
            </span>
            <span class="graph-card-title__secondary">
              (MPN/100mL)
            </span>
            <i class="material-icons graph-card-title__icon">info_outline</i>
          </div>
        </div>

        <!-- Graph 2 -->
        <div class="graph-card">
          <div class="graph-card-title">
            <span class="graph-card-title__primary">
              E. Coli
            </span>
            <span class="graph-card-title__secondary">
              (MPN/100mL)
            </span>
            <i class="material-icons graph-card-title__icon">info_outline</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'data-page',
  data: function () {
    return {
      filters: {
        selectedControl: 'dateRange',
        sidebar: false,
        selectedItem: null,
        search: '',
        filterSites: [ 'HUC', 'Lab', 'Partner' ],
        startDate: null,
        endDate: null
      },
      items: [
        {
          selected: false,
          stationName: 'Station 1',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK',
          lab: 'Petes Lab',
          huc: 'no idea',
          collectionSiteId: 1
        },
        {
          selected: false,
          stationName: 'Station 2',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK',
          lab: 'Petes Lab',
          huc: 'no idea',
          collectionSiteId: 2
        },
        {
          selected: false,
          stationName: 'Station 3',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK',
          lab: 'Petes Lab',
          huc: 'no idea',
          collectionSiteId: 3
        },
        {
          selected: false,
          stationName: 'Station 4',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK',
          lab: 'Petes Lab',
          huc: 'no idea',
          collectionSiteId: 4
        },
        {
          selected: false,
          stationName: 'Station 5',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK',
          lab: 'Petes Lab',
          huc: 'no idea',
          collectionSiteId: 5
        },
        {
          selected: false,
          stationName: 'Station 6',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK',
          lab: 'Petes Lab',
          huc: 'no idea',
          collectionSiteId: 6
        }
      ]
    }
  },
  methods: {
    toggleSidebar: function (event) {
      this.filters.sidebar = !this.filters.sidebar
    }
  }
}
</script>

<style lang="scss" scoped>
  $data-sidebar-width: 240px;

  .data-page-wrapper {
    display: flex;
    justify-content: flex-end;
    width: 100vw;
    position: relative;
    z-index: 1;

    @media screen and (min-width: 401px) {
      margin: -36px -48px;
    }
  }

  .date-picker-wrapper {
    display: flex;
    margin-left: -10px;
  }

  .map-wrapper {
    flex: 1;
    background: grey;
    width: 100%;
    height: 100%;
  }

  .data-body {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 0;
    width: 100%;
    height: 100%;
    margin-left: 0;
    transition: 0.5s;

    &__fixed-column {
      width: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 24px;
    }

    &__dynamic-column {
      width: 100vw;
      height: 50vh;
    }

    @media screen and (min-width: 850px) {
      justify-content: center;
      flex-direction: row;
      padding: 26px 24px;
      width: calc(100% - #{$data-sidebar-width});

      &--collapsed {
        width: 100%;
        transition: 0.5s;
      }

      &__fixed-column {
        margin-top: 0;
        width: 302px;
      }

      &__dynamic-column {
        flex: 1;
        margin-right: 24px;
      }
    }
  }

  .data-sidebar {
    width: 240px;
    box-shadow: 0 2px 4px 0 rgba(155, 155, 155, 0.5);
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    background: white;
    transition: 0.5s;
    z-index: 2;

    &__header {
      background-color: #004D71;
      height: 120px;
      position: relative;
      padding: 9px 10px;
    }

    &__body {
      overflow-y: auto;
    }

    &--collapsed {
      transition: 0.5s;
      left: -240px;
    }
  }

  .data-sidebar-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: -16px;
    top: 10px;
    height: 36px;
    width: 16px;
    background-color: rgba(255, 255, 255, 1);
    cursor: pointer;

    &__caret {
      height: 20px;
      width: 20px;
      transform: rotate(450deg);
      color: #9B9B9B;
      font-size: 20px;
      line-height: 20px;
    }
  }

  .data-sidebar-search {
    display: flex;
    align-items: center;
  	height: 36px;
  	width: 220px;
  	border-radius: 2px;
  	background-color: #FFFFFF;
    margin-bottom: 9px;
    padding: 10px 15px 10px;

    &__input {
      width: 175px;

      &:focus {
        outline: none;
      }
    }

    &__icon {
      height: 20px;
      width: 18px;
      opacity: 0.54;
    }
  }

  .data-sidebar-filter {
    color: #ffffff;

    .input-group {
      margin: 0;
    }
  }

  .data-sidebar-filter-text {
    color: #FFFFFF;
    font-size: 11px;
    height: 24px;
    width: 100px;
  }

  .data-sidebar-list-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 38px;
  	width: 100%;
  	color: #4A4A4A;
  	font-size: 13px;
  	line-height: 20px;
    border-bottom: 1px solid #E4E4E4;
    cursor: pointer;

    &--active,
    &:hover {
      background-color: rgba(77,134,160,0.1);
    	color: #004D71;
    	font-size: 13px;
    	font-weight: 500;
    	line-height: 20px;
    }
  }

  .controls-card {
    display: flex;
    flex-direction: column;
    height: 211px;
    width: 80%;
    background-color: #FFFFFF;
    box-shadow: 0 2px 4px 0 rgba(155,155,155,0.5);
    margin-bottom: 24px;

    @media screen and (min-width: 850px) {
      width: 302px;
    }
  }

  .controls-card-header {
    display: flex;
    align-items: center;
    padding-left: 16px;
    height: 26px;
    background-color: #004D71;
    width: 100%;
    color: #FFFFFF;
    font-size: 13px;
    font-weight: 400;
  }

  .controls-card-body {
    height: 184px;
  }

  .controls-card-control-group {
    height: 108px;
    border-bottom: 1px solid #E4E4E4;
    transition: all 0.33s ease;
    transition: 0.33s;
    overflow: hidden;

    &:nth-of-type(3) {
      border-bottom: none;
    }

    &--collapsed {
      height: 36px;
      transition: 0.33s;
    }

    &__header {
      display: flex;
      align-items: center;
      padding-left: 16px;
      height: 36px;
      color: #7FBA00;
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
    }

    &__content {
      display: flex;
      flex-direction: column;
      padding: 0 16px;
      color: #4A4A4A;
      font-size: 13px;
      height: 82px;
    }
  }

  .graph-card {
    height: 232px;
    width: 80%;
    padding-top: 13px;
    padding-left: 9px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 4px 0 rgba(155,155,155,0.5);
    margin-bottom: 24px;

    @media screen and (min-width: 850px) {
      width: 302px;
    }
  }

  .graph-card-title {
    display: flex;
    align-items: flex-end;

    &__primary {
      width: 52px;
      color: #7FBA00;
      font-size: 18px;
      margin-right: 6px;
      height: 21px;
    }

    &__secondary {
      height: 13px;
      width: 71px;
      color: #004D71;
      font-family: Roboto;
      font-size: 11px;
      line-height: 13px;
    }

    &__icon {
      height: 16px;
      width: 20px;
      color: #004D71;
      font-size: 16px;
      line-height: 16px;
      text-align: center;
    }
  }
</style>
