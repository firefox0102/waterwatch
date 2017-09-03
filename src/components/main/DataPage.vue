
<template>
  <div class="data-page-wrapper">
    <filter-sidebar :selected-site="selectedSite" :show-sidebar="controls.sidebar" :collection-sites="collectionSites" v-on:selected="setActiveSite" v-on:toggleside="toggleSidebar"></filter-sidebar>

    <div class="data-body" v-bind:class="{ 'data-body--collapsed': controls.sidebar}">
      <!-- TODO make a component -->
      <div class="data-body__dynamic-column">
        <div class="map-wrapper">
          <div id='menu' class="menu"></div>
          <div id='map' class="map"></div>
        </div>
      </div>

      <div class="data-body__fixed-column">
        <!-- Controls Card TODO make a component -->
        <div class="controls-card">
          <div class="controls-card-header">
            Chart Controls
          </div>
          <div class="controls-card-body">
            <div
              class="controls-card-control-group"
              v-bind:class="{ 'controls-card-control-group--collapsed': controls.selectedControl != 'dateRange'}">
              <div
                class="controls-card-control-group__header"
                v-on:click="controls.selectedControl = 'dateRange'">
                Date Range
                <i class="material-icons">arrow_drop_up</i>
              </div>
              <div class="controls-card-control-group__content">
                <span class="controls-card-control-group__title">Select date range:</span>
                <div class="date-picker-wrapper">
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
            </div>
            <div
              class="controls-card-control-group"
              v-bind:class="{ 'controls-card-control-group--collapsed': controls.selectedControl != 'report'}">
              <div
                class="controls-card-control-group__header"
                v-on:click="controls.selectedControl = 'report'">
                Reports
                <i class="material-icons">arrow_drop_up</i>
              </div>
              <div class="controls-card-control-group__content">
                Reports stuff here
              </div>
            </div>
          </div>
        </div>

        <ecoli-chart :selected-site="selectedSite" :reports="reports"></ecoli-chart>

        <turbidity-chart :selected-site="selectedSite" :reports="reports"></turbidity-chart>

        <rainfall-chart :selected-site="selectedSite" :reports="reports"></rainfall-chart>

        <conductivity-chart :selected-site="selectedSite" :reports="reports"></conductivity-chart>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../helpers/firebase'
import { MapHelper } from '../../helpers/mapHelper'
import moment from 'moment'
import VueHighcharts from 'vue2-highcharts'

import EcoliChart from '../panels/EcoliChart'
import TurbidityChart from '../panels/TurbidityChart'
import RainfallChart from '../panels/RainfallChart'
import ConductivityChart from '../panels/ConductivityChart'
import FilterSidebar from '../panels/FilterSidebar'

let collectionSitesRef = db.ref('collectionSites')

export default {
  name: 'data-page',
  components: {
    VueHighcharts,
    EcoliChart,
    TurbidityChart,
    RainfallChart,
    ConductivityChart,
    FilterSidebar
  },
  firebase: {
    collectionSites: collectionSitesRef
  },
  watch: {
    startDate (val) {
      this.getReports()
    },
    endDate (val) {
      this.getReports()
    }
  },
  data () {
    return {
      selectedSite: null,
      reports: null,
      collectionSites: [], // Placeholder for sites watching
      startDate: moment(new Date()).subtract(6, 'months').format('YYYY-MM-DD'),
      endDate: moment(new Date()).format('YYYY-MM-DD'),
      controls: {
        sidebar: false,
        selectedControl: 'dateRange'
      }
    }
  },
  methods: {
    toggleSidebar () {
      console.log('hai')
      this.controls.sidebar = !this.controls.sidebar
    },
    setActiveSite (site) {
      console.log('select site callback!')

      this.selectedSite = site
      this.getReports()
    },
    getReports () {
      if (this.$firebaseRefs.reports) {
        this.$unbind('reports')
      }

      if (this.startDate && this.endDate) {
        this.$bindAsArray('reports', db.ref('reports/' + this.selectedSite['.key']).orderByChild('collectionDate').startAt(this.startDate).endAt(this.endDate))
      } else {
        this.$bindAsArray('reports', db.ref('reports/' + this.selectedSite['.key']).orderByChild('collectionDate').limitToLast(10))
      }
    }
  },
  mounted: function () {
    const mapy = new MapHelper()
    console.log(mapy)
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/colors";

$data-sidebar-width: 240px;

.mapboxgl-popup {
  max-width: 400px;
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.data-page-wrapper {
  display: flex;
  position: relative;
  z-index: 1;

  justify-content: flex-end;
  width: 100vw;

  @media screen and (min-width: 401px) {
    margin: -24px;
  }
}

.date-picker-wrapper {
  display: flex;
  margin-left: -10px;
}

.map-wrapper {
  flex: 1;
  height: 100%;
  width: 100%;
  background: #808080;
}

.data-body {
  display: flex;

  flex-direction: column;
  flex-wrap: wrap;

  height: 100%;
  margin-left: 0;
  padding: 0;
  width: 100%;

  transition: 0.5s;

  &__fixed-column {
    display: flex;
    align-items: center;
    flex-direction: column;

    margin-top: 24px;
    width: auto;
  }

  &__dynamic-column {
    height: 50vh;
    width: 100vw;

    @media screen and (min-width: 850px) {
      height: auto;
      max-height: 100%;
      min-height: 50vh;
    }
  }

  @media screen and (min-width: 850px) {
    flex-direction: row;
    justify-content: center;

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

.controls-card {
  display: flex;

  flex-direction: column;
  height: 211px;
  margin-bottom: 24px;
  width: 80%;

  background-color: $color-finn-white;
  box-shadow: 0 2px 4px 0 rgba(155, 155, 155, 0.5);

  @media screen and (min-width: 850px) {
    width: 302px;
  }
}

.controls-card-header {
  display: flex;

  align-items: center;
  height: 26px;
  padding-left: 16px;
  width: 100%;

  background-color: $color-iron-sea;
  color: $color-finn-white;
  font-size: 13px;
  font-weight: 400;
}

.controls-card-body {
  height: 184px;
}

.controls-card-control-group {
  height: 150px;
  overflow: hidden;

  border-bottom: 1px solid $color-dust;
  transition: all 0.33s ease;

  &:nth-of-type(3) {
    border-bottom: 0;
  }

  &--collapsed {
    height: 36px;
    transition: 0.33s;
  }

  &__header {
    display: flex;

    align-items: center;
    justify-content: space-between;
    height: 36px;
    padding-left: 16px;

    color: $color-storm-cloud;
    cursor: pointer;
    font-size: 11px;
    font-weight: 500;
  }

  &__title {
    padding-bottom: 4px;

    color: $color-nww-green;
  }

  &__content {
    display: flex;
    flex-direction: column;
    height: 82px;
    padding: 0 16px;

    color: $color-storm-cloud;
    font-size: 13px;
  }
}

.map {
  position: relative;
  z-index: 0;

  height: 100%;
  width: 100%;
}

.menu {
  display: flex;
  position: absolute;
  top: 40px;
  z-index: 1;

  flex-direction: column;
  height: 70px;
  width: 120px;

  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 3px;
  font-family: "Open Sans", sans-serif;

  a {
    display: block;
    margin: 0;
    padding: 10px;

    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    color: #404040;
    font-size: 13px;
    text-align: center;
    text-decoration: none;

    &:last-child {
      border: 0;
    }

    &:hover {
      background-color: #f8f8f8;
      color: #404040;
    }

    &.active {
      background-color: #3887be;
      color: #fff;

      &:hover {
        background: #3074a4;
      }
    }
  }
}
</style>
