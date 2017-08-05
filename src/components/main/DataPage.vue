<template>
  <div class="data-page-wrapper">
    <aside class="data-sidebar" v-bind:class="{ 'data-sidebar--collapsed': controls.sidebar}">
      <div class="data-sidebar__header">
        <div
          class="data-sidebar-toggle"
          v-on:click="toggleSidebar">
          <i class="data-sidebar-toggle__caret material-icons">arrow_drop_down</i>
        </div>
        <div class="data-sidebar-search">
          <input class="data-sidebar-search__input" v-model="controls.search" placeholder="Search collection sites" />
          <i class="data-sidebar-search__icon material-icons">search</i>
        </div>
        <div
          class="filters-toggle"
          v-on:click="controls.showFilters = !controls.showFilters">
          <span class="filters-toggle__title">
            Filter
          </span>
          <i
            class="material-icons filters-toggle__icon"
            v-bind:class="{'filters-toggle__icon--collapsed': !controls.showFilters }">
            arrow_drop_down
          </i>
        </div>
      </div>

      <!-- Filter Sections -->
      <div
        v-if="controls.showFilters"
        class="filters">
        <!-- HUC Filter -->
        <div class="filters__section">
          <div
            v-on:click="filters.huc = !filters.huc"
            class="filters-toggle--secondary">
            <span class="filters-toggle__title">
              HUC
            </span>
            <i
              class="material-icons filters-toggle__icon"
              v-bind:class="{'filters-toggle__icon--collapsed': !filters.huc }">
              arrow_drop_down
            </i>
          </div>
          <div
            v-if="filters.huc"
            class="filter-body">
            <div
              v-for="huc in hucList"
              class="filter-body__list-item">
              <input
                type="checkbox"
                v-bind:value="huc"
                v-model="filters.hucFilters"
              ></input>
              {{ huc }}
            </div>
          </div>
        </div>

        <!-- Lab Filter -->
        <div class="filters__section">
          <div
            v-on:click="filters.lab = !filters.lab"
            class="filters-toggle--secondary">
            <span class="filters-toggle__title">
              Lab
            </span>
            <i
              class="material-icons filters-toggle__icon"
              v-bind:class="{'filters-toggle__icon--collapsed': !filters.lab }">
              arrow_drop_down
            </i>
          </div>
          <div
            v-if="filters.lab"
            class="filter-body">
            <div
              v-for="lab in labs"
              class="filter-body__list-item">
              <input
                type="checkbox"
                v-bind:value="lab['.value']"
                v-model="filters.labFilters"
              ></input>
              {{ lab['.value'] }}
            </div>
          </div>
        </div>

        <!-- Partner Filter -->
        <div class="filters__section">
          <div
            v-on:click="filters.partner = !filters.partner"
            class="filters-toggle--secondary">
            <span class="filters-toggle__title">
              Partner
            </span>
            <i
              class="material-icons filters-toggle__icon"
              v-bind:class="{'filters-toggle__icon--collapsed': !filters.partner }">
              arrow_drop_down
            </i>
          </div>
          <div
            v-if="filters.partner"
            class="filter-body">
            <div
              v-for="partner in partnerList"
              class="filter-body__list-item">
              <input
                type="checkbox"
                v-bind:value="partner"
                v-model="filters.partnerFilters"
              ></input>
              {{ partner }}
            </div>
          </div>
        </div>
      </div>

      <!-- List items -->
      <div class="data-sidebar__body">
        <div
          class="data-sidebar-list-item"
          v-for=" site in collectionSites">
            {{ site.stationName }}
        </div>
      </div>
    </aside>

    <div class="data-body" v-bind:class="{ 'data-body--collapsed': controls.sidebar}">
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
            <div
              class="controls-card-control-group"
              v-bind:class="{ 'controls-card-control-group--collapsed': controls.selectedControl != 'mapLayer'}">
              <div
                class="controls-card-control-group__header"
                v-on:click="controls.selectedControl = 'mapLayer'">
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
              <i class="material-icons graph-card-title__icon">info_outline</i>
            </span>
            <div>
              <span class="graph-card-title__secondary--strong">
                Last Result:
              </span>
              <span class="graph-card-title__secondary">
                TODO GET RESULT
              </span>
            </div>
          </div>
        </div>

        <!-- Graph 2 -->
        <div class="graph-card">
          <div class="graph-card-title">
            <span class="graph-card-title__primary">
              Turbidity
              <i class="material-icons graph-card-title__icon">info_outline</i>
            </span>
            <div>
              <span class="graph-card-title__secondary--strong">
                Last Result:
              </span>
              <span class="graph-card-title__secondary">
                TODO GET RESULT
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../helpers/firebase'

let collectionSitesRef = db.ref('collectionSites')
let labsRef = db.ref('labs')

export default {
  name: 'data-page',
  firebase: {
    collectionSites: collectionSitesRef,
    labs: labsRef
  },
  watch: {
    collectionSites: {
      deep: true,
      handler (newArray) {
        this.partnerList = this._.uniq(this._.map(this.collectionSites, 'collectionPartner'))
        this.hucList = this._.uniq(this._.map(this.collectionSites, 'huc'))
      }
    }
  },
  data: function () {
    return {
      collectionSites: [], // Placeholder for sites watching
      controls: {
        showFilters: false,
        selectedControl: 'dateRange',
        sidebar: false,
        selectedItem: null,
        search: '',
        filterSites: [ 'HUC', 'Lab', 'Partner' ],
        startDate: null,
        endDate: null
      },
      filters: {
        huc: false,
        hucFilters: [],
        lab: false,
        labFilters: [],
        partner: false,
        partnerFilters: []
      }
    }
  },
  methods: {
    toggleSidebar: function (event) {
      this.controls.sidebar = !this.controls.sidebar
    }
  }
}
</script>

<style lang="scss" scoped>
$data-sidebar-width: 240px;

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

.data-sidebar {
  left: 0;
  position: absolute;
  top: 0;
  z-index: 2;

  height: 100%;
  width: 240px;

  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(155, 155, 155, 0.5);
  transition: 0.5s;

  &__header {
    position: relative;

    height: 88px;
    padding-top: 10px;
    width: 100%;

    background-color: #004d71;
  }

  &__body {
    overflow-y: auto;
  }

  &--collapsed {
    left: -240px;
    transition: 0.5s;
  }
}

.data-sidebar-toggle {
  display: flex;

  position: absolute;
  right: -16px;
  top: 10px;

  align-items: center;
  justify-content: center;
  height: 36px;
  width: 16px;

  background-color: #004d71;
  border-radius: 0 2px 2px 0;
  cursor: pointer;

  &__caret {
    height: 20px;
    width: 20px;

    color: #fff;
    font-size: 20px;
    line-height: 20px;
    transform: rotate(450deg);
  }
}

.data-sidebar-search {
  display: flex;

  align-items: center;
  height: 36px;
  margin: 0 10px 6px;
  padding: 10px 15px;
  width: calc(100% - 20px);

  background-color: #fff;
  border-radius: 2px;

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

.data-sidebar-list-item {
  display: block;

  align-items: center;
  justify-content: center;
  height: 38px;
  overflow: hidden;
  padding: 8px 15px 8px 20px;
  width: 100%;

  border-bottom: 1px solid #e4e4e4;
  color: #4a4a4a;
  cursor: pointer;
  font-size: 13px;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;

  &--active,
  &:hover {
    background-color: rgba(77, 134, 160, 0.1);
    color: #004d71;
    font-size: 13px;
    font-weight: 500;
    line-height: 20px;
  }
}

.controls-card {
  display: flex;

  flex-direction: column;
  height: 211px;
  margin-bottom: 24px;
  width: 80%;

  background-color: #fff;
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

  background-color: #004d71;
  color: #fff;
  font-size: 13px;
  font-weight: 400;
}

.controls-card-body {
  height: 184px;
}

.controls-card-control-group {
  height: 108px;
  overflow: hidden;

  border-bottom: 1px solid #e4e4e4;
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

    color: #4a4a4a;
    cursor: pointer;
    font-size: 11px;
    font-weight: 500;
  }

  &__title {
    color: #7fba00;
  }

  &__content {
    display: flex;
    flex-direction: column;
    height: 82px;
    padding: 0 16px;

    color: #4a4a4a;
    font-size: 13px;
  }
}

.graph-card {
  height: 280px;
  margin-bottom: 24px;
  padding-left: 9px;
  padding-top: 13px;
  width: 80%;

  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(155, 155, 155, 0.5);

  @media screen and (min-width: 850px) {
    width: 302px;
  }
}

.graph-card-title {
  display: flex;

  align-items: flex-start;
  flex-direction: column;

  &__primary {
    display: flex;

    align-items: center;

    height: 21px;

    color: #004d71;
    font-size: 18px;
    line-height: 21px;
  }

  &__secondary {
    height: 13px;
    color: #004d71;
    font-size: 11px;
    line-height: 13px;

    &--strong {
      @extend .graph-card-title__secondary;
      font-weight: 500;
    }
  }

  &__icon {
    height: 16px;
    width: 20px;
    color: #7fba00;
    font-size: 16px;
    line-height: 16px;
    text-align: center;
  }
}

.filters-toggle {
  display: flex;

  align-items: center;
  justify-content: flex-start;

  height: 36px;
  padding: 10px 20px;

  border-bottom: 1px solid #e4e4e4;
  cursor: pointer;
  font-size: 16px;

  &--secondary {
    @extend .filters-toggle;
    background-color: #4d86a0;
    font-size: 14px;
  }

  &__title {
    color: #fff;
  }

  &__icon {
    color: #fff;
    font-size: 20px;

    &--collapsed {
      transform: rotate(270deg);
    }
  }
}

.filter-body {
  display: flex;

  flex-direction: column;

  padding: 10px 18px;

  background-color: #dfdfdf;

  &__list-item {
    display: block;

    align-items: center;

    height: 16px;
    overflow: hidden;
    width: 100%;

    color: #4a4a4a;
    font-size: 11px;
    text-overflow: ellipsis;
    white-space: nowrap;

    input[type=checkbox] { //I know this isn't great BEM but I'm okay with it for now
      margin-right: 8px;
    }
  }
}
</style>
