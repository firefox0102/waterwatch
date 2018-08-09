<template>
  <div class="data-page-wrapper">
    <filter-sidebar :selected-site="selectedSite" :show-sidebar="controls.sidebar" :collection-sites="collectionSites" v-on:selected="setActiveSite" v-on:toggleside="toggleSidebar"></filter-sidebar>

    <div class="data-body" v-bind:class="{ 'data-body--collapsed': controls.sidebar}">
      <div class="data-body__dynamic-column">
        <div class="data-map">
          <data-map-banner :selected-site="selectedSite"></data-map-banner>
          <div id='menu' class="data-map__menu"></div>
          <div id='zoomContainer' class="mapboxgl-ctrl mapboxgl-ctrl-group"></div>
          <div id='map' class="data-map__map"></div>
        </div>
      </div>

      <div class="data-body__fixed-column">
        <div class="controls-card">
          <div class="controls-card-header">
            Chart Controls
          </div>
          <div class="controls-card-body">
            <div
              class="controls-card-control-group dates"
              v-bind:class="{ 'controls-card-control-group--collapsed': controls.selectedControlDates}">
              <div
                class="controls-card-control-group__header"
                v-on:click="controls.selectedControlDates = !controls.selectedControlDates">
                Date Range
                <i
                  class="material-icons  filters-toggle__icon "
                  v-bind:class="{ 'rotated-icon': controls.selectedControlDates}">
                  arrow_drop_down
                </i>
              </div>
              <div class="controls-card-control-group__content">
                <span class="controls-card-control-group__title">Select date range:</span>
                <div class="date-picker-wrapper">
                  <div class="site-reports-toolbar-datepicker">
                    <v-menu
                      lazy
                      :close-on-content-click="false"
                      v-model="controls.startDateModal"
                      transition="scale-transition"
                      offset-y
                      full-width
                      :nudge-left="40"
                      max-width="290px">
                      <div
                        class="site-reports-toolbar-datepicker__activator"
                        slot="activator">
                        <span class="site-reports-toolbar-datepicker__activator-text">{{ startDate ? startDate : "Start Date"}}</span>
                        <i class="fa fa-calendar"></i>
                      </div>
                      <v-date-picker v-model="startDate" no-title scrollable actions>
                        <template slot-scope="{ save, cancel }">
                          <v-card-actions>
                            <v-btn class="btn-nww" @click.native="save()">Save</v-btn>
                            <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                          </v-card-actions>
                        </template>
                      </v-date-picker>
                    </v-menu>
                  </div>
                  <div class="site-reports-toolbar-datepicker">
                    <v-menu
                      lazy
                      :close-on-content-click="false"
                      v-model="controls.endDateModal"
                      transition="scale-transition"
                      offset-y
                      full-width
                      :nudge-left="40"
                      max-width="290px">
                      <div
                        class="site-reports-toolbar-datepicker__activator"
                        slot="activator">
                        <span class="site-reports-toolbar-datepicker__activator-text">{{ endDate ? endDate : "End Date"}}</span>
                        <i class="fa fa-calendar"></i>
                      </div>
                      <v-date-picker v-model="endDate" no-title scrollable actions>
                        <template slot-scope="{ save, cancel }">
                          <v-card-actions>
                            <v-btn class="btn-nww" @click.native="save()">Save</v-btn>
                            <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                          </v-card-actions>
                        </template>
                      </v-date-picker>
                    </v-menu>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="controls-card-control-group download"
              v-bind:class="{ 'controls-card-control-group--collapsed': controls.selectedControlReport}">
              <div
                class="controls-card-control-group__header"
                v-on:click="controls.selectedControlReport = !controls.selectedControlReport">
                Download Data
                <i
                  class="material-icons"
                  v-bind:class="{ 'rotated-icon': controls.selectedControlReport}">
                  arrow_drop_down
                </i>
              </div>
              <div class="controls-card-control-group__content">
                <v-btn
                  @click="exportXls"
                  v-bind:disabled="!selectedSite"
                  class="btn md-raised btn-nww--light"
                >
                  Download  XLS
                </v-btn>
              </div>
            </div>
          </div>
        </div>

        <ecoli-chart :selected-site="selectedSite" :reports="reports"></ecoli-chart>

        <turbidity-chart :selected-site="selectedSite" :reports="reports"></turbidity-chart>

        <conductivity-chart :selected-site="selectedSite" :reports="reports"></conductivity-chart>

        <rainfall-chart :selected-site="selectedSite" :reports="reports"></rainfall-chart>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../helpers/firebase'
import { MapHelper } from '../../helpers/mapHelper'
import _ from 'lodash'
import moment from 'moment'
import VueHighcharts from 'vue2-highcharts'
import axios from 'axios'

import EcoliChart from '../panels/EcoliChart'
import TurbidityChart from '../panels/TurbidityChart'
import RainfallChart from '../panels/RainfallChart'
import ConductivityChart from '../panels/ConductivityChart'
import FilterSidebar from '../panels/FilterSidebar'
import DataMapBanner from '../map/DataMapBanner'
import JsonExcel from '../json-excel/JsonExcel'

let collectionSitesRef = db.ref('collectionSites')

export default {
  name: 'data-page',
  components: {
    VueHighcharts,
    EcoliChart,
    TurbidityChart,
    RainfallChart,
    ConductivityChart,
    FilterSidebar,
    DataMapBanner,
    'download-excel': JsonExcel
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
    },
    'sharedState.Selected': 'styleMap'
  },
  data () {
    return {
      selectedSite: null,
      reports: null,
      collectionSites: [], // Placeholder for sites watching
      startDate: moment(new Date()).subtract(3, 'months').format('YYYY-MM-DD'),
      endDate: moment(new Date()).format('YYYY-MM-DD'),
      controls: {
        sidebar: false,
        selectedControlDates: false,
        selectedControlReport: true
      },
      jsonFields: {
        'stationName': 'Site Name',
        'collectionDate': 'Collection Date',
        'collectionTime': 'Collection Time',
        'precipitation': 'Rain (in)',
        'totalColiform': 'Total Coliform (MPN / 100mL)',
        'totalEcoli': 'E.Coli (MPN / 100mL)',
        'fluorometry': 'Fluorometry',
        'turbidity': 'Turbidity (NTU)',
        'specificConductivity': 'Specifc Conductivity (µS)'
      }
    }
  },
  methods: {
    toggleSidebar () {
      this.controls.sidebar = !this.controls.sidebar
      this.mapy.resizeMap()
    },
    setActiveSite (site) {
      this.selectedSite = site
      this.getReports()
      this.mapy.zoomIn(this.selectedSite)
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
    },
    selectedSiteCallbackFunc (name) {
      let site = _.find(this.collectionSites, { 'stationName': name })
      if (site) {
        this.setActiveSite(site)
      }
    },
    initializeMap () {
      this.mapy = new MapHelper(this.selectedSiteCallbackFunc)
    },
    exportXls () {
      if (this.selectedSite) {
        this.postToAPI('regular_report', 'NWW_Director_Report.csv')
      }
    },
    postToAPI (exportType, exportName) {
      axios({
        url: 'https://waterwatch-cb707.firebaseapp.com/export',
        method: 'POST',
        data: {
          'export_type': exportType,
          'start_date': this.startDate,
          'end_date': this.endDate,
          'collection_sites': [this.selectedSite['.key']]
        }
      }).then((response) => {
        let blob = new Blob([response.data], { type: 'application/vnd.ms-excel' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = exportName
        link.click()
      })
    }
  },
  mounted: function () {
    this.initializeMap()
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/colors";
@import "../../scss/map";

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

.data-body {
  display: flex;
  z-index: 1;

  flex-direction: column;
  flex-wrap: nowrap;

  height: auto;
  margin-left: 0;
  padding: 0;
  width: 100%;

  transition: 0.5s;
  overflow-y: auto;

  &__fixed-column {
    display: flex;
    align-items: center;
    flex-direction: column;

    min-height: 1422px;
    max-height: 1800px;
    margin-top: 24px;
    width: auto;
  }

  &__dynamic-column {
    height: 400px;
    width: 100vw;

    overflow: hidden;

    @media screen and (min-width: 850px) {
      height: 90vh;
      max-height: 100%;
      min-height: 50vh;
    }
  }

  @media screen and (min-width: 850px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

    height: calc(100vh - 170px);
    padding: 26px 24px;
    width: calc(100% - #{$data-sidebar-width});

    overflow: hidden;

    &--collapsed {
      width: 100%;
      transition: 0.5s;
    }

    &__fixed-column {
      height: calc(100vh - 200px);
      margin-top: 0;
      width: 302px;

      overflow-y: auto;
      max-height: unset;
      min-height: unset;
    }

    &__dynamic-column {
      flex: 1;
      margin-right: 24px;
    }
  }
}

.controls-card {
  flex-direction: column;

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
}

.controls-card-control-group {

  overflow: hidden;

  border-bottom: 1px solid $color-dust;
  transition: all 0.33s ease;

  &:nth-of-type(3) {
    border-bottom: 0;
  }

  &--collapsed {
    height: 40px;
    transition: 0.33s;
  }

  &__header {
    display: flex;

    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding-left: 16px;

    color: $color-storm-cloud;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    line-height: 18px;
  }

  &__title {
    padding-bottom: 4px;

    color: $color-nww-green;
  }

  &__content {
    display: flex;
    flex-direction: column;

    padding: 0 16px 16px 16px;

    color: $color-storm-cloud;
    font-size: 13px;
  }
}
.controls-card .download .btn {
  text-transform: none;
}

#zoomContainer {
  display: flex;
  position: absolute;
  bottom: 29px;
  right: 50px;
  z-index: 1;
}
</style>
