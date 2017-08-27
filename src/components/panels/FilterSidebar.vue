
<template>
  <aside class="data-sidebar" v-bind:class="{ 'data-sidebar--collapsed': showSidebar}">
    <div class="data-sidebar__header">
      <div class="data-sidebar-toggle" v-on:click="toggleSidebar">
        <i class="data-sidebar-toggle__caret material-icons">arrow_drop_down</i>
      </div>
      <div class="data-sidebar-search">
        <input class="data-sidebar-search__input" v-model="controls.search" placeholder="Search collection sites" />
        <i class="data-sidebar-search__icon material-icons">search</i>
      </div>
      <div class="filters-toggle" v-on:click="controls.showFilters = !controls.showFilters">
        <span class="filters-toggle__title">
          Filter
        </span>
        <i class="material-icons filters-toggle__icon" v-bind:class="{'filters-toggle__icon--collapsed': !controls.showFilters }">
          arrow_drop_down
        </i>
      </div>
    </div>

    <!-- Filter Sections -->
    <div v-if="controls.showFilters" class="filters">
      <!-- HUC Filter -->
      <div class="filters__section">
        <div v-on:click="filters.huc = !filters.huc" class="filters-toggle--secondary">
          <span class="filters-toggle__title">
            HUC
          </span>
          <i class="material-icons filters-toggle__icon" v-bind:class="{'filters-toggle__icon--collapsed': !filters.huc }">
            arrow_drop_down
          </i>
        </div>
        <div v-if="filters.huc" class="filter-body">
          <div v-for="huc in hucList" v-bind:key="huc.key" class="filter-body__list-item">
            <input type="checkbox" v-bind:value="huc" v-model="filters.hucFilters"></input>
            {{ huc['.value'] }}
          </div>
        </div>
      </div>

      <!-- Lab Filter -->
      <div class="filters__section">
        <div v-on:click="filters.lab = !filters.lab" class="filters-toggle--secondary">
          <span class="filters-toggle__title">
            Lab
          </span>
          <i class="material-icons filters-toggle__icon" v-bind:class="{'filters-toggle__icon--collapsed': !filters.lab }">
            arrow_drop_down
          </i>
        </div>
        <div v-if="filters.lab" class="filter-body">
          <div v-for="lab in labs" v-bind:key="lab.key" class="filter-body__list-item">
            <input type="checkbox" v-bind:value="lab['.value']" v-model="filters.labFilters"></input>
            {{ lab['.value'] }}
          </div>
        </div>
      </div>

      <!-- Partner Filter -->
      <div class="filters__section">
        <div v-on:click="filters.partner = !filters.partner" class="filters-toggle--secondary">
          <span class="filters-toggle__title">
            Partner
          </span>
          <i class="material-icons filters-toggle__icon" v-bind:class="{'filters-toggle__icon--collapsed': !filters.partner }">
            arrow_drop_down
          </i>
        </div>
        <div v-if="filters.partner" class="filter-body">
          <div v-for="partner in partnerList" v-bind:key="partner.key" class="filter-body__list-item">
            <input type="checkbox" v-bind:value="partner" v-model="filters.partnerFilters"></input>
            {{ partner['.value'] }}
          </div>
        </div>
      </div>
    </div>

    <!-- List items -->
    <div class="data-sidebar__body">
      <div class="data-sidebar-list-item" v-on:click="selectActiveSite(site)" v-bind:class="{'data-sidebar-list-item--active': selectedSite === site}" v-bind:key="site.key" v-for=" site in collectionSites">
        {{ site.stationName }}
      </div>
    </div>
  </aside>
</template>

<script>
import { db } from '../../helpers/firebase'

let labsRef = db.ref('labs')
let partnerRef = db.ref('partners')
let hucRef = db.ref('hucList')

export default {
  name: 'data-page',
  props: [
    'collectionSites',
    'selectedSite',
    'selectSite',
    'showSidebar'
  ],
  firebase: {
    labs: labsRef,
    hucList: hucRef,
    partnerList: partnerRef
  },
  data () {
    return {
      controls: {
        showFilters: false,
        search: '',
        filterSites: ['HUC', 'Lab', 'Partner']
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
    toggleSidebar () {
      this.$emit('toggleside')
    },
    selectActiveSite (site) {
      this.$emit('selected', site)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/colors";

$data-sidebar-width: 240px;

.data-sidebar {
  left: 0;
  position: absolute;
  top: 0;
  z-index: 2;

  height: 100%;
  width: 240px;

  background: $color-finn-white;
  box-shadow: 0 2px 4px 0 rgba(155, 155, 155, 0.5);
  transition: 0.5s;

  &__header {
    position: relative;

    height: 88px;
    padding-top: 10px;
    width: 100%;

    background-color: $color-iron-sea;
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

  background-color: $color-iron-sea;
  border-radius: 0 2px 2px 0;
  cursor: pointer;

  &__caret {
    height: 20px;
    width: 20px;

    color: $color-finn-white;
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

  background-color: $color-finn-white;
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

  border-bottom: 1px solid $color-dust;
  color: $color-storm-cloud;
  cursor: pointer;
  font-size: 13px;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:nth-of-type(1) {
    border-top: 1px solid $color-dust;
  }

  &--active,
  &:hover {
    background-color: rgba(77, 134, 160, 0.1);
    color: $color-iron-sea;
    font-size: 13px;
    font-weight: 500;
    line-height: 20px;
  }
}

.filters-toggle {
  display: flex;

  align-items: center;
  justify-content: flex-start;

  height: 36px;
  padding: 10px 20px;

  border-bottom: 1px solid $color-dust;
  cursor: pointer;
  font-size: 16px;

  &--secondary {
    @extend .filters-toggle;
    background-color: $color-warlock;
    font-size: 14px;
  }

  &__title {
    color: $color-finn-white;
  }

  &__icon {
    color: $color-finn-white;
    font-size: 20px;

    &--collapsed {
      transform: rotate(270deg);
    }
  }
}

.filter-body {
  padding: 5px 10px;
}
</style>
