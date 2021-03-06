
<template>
  <aside class="data-sidebar" v-bind:class="{ 'data-sidebar--collapsed': showSidebar}">
    <div class="data-sidebar__header">
      <div class="data-sidebar-toggle" v-on:click="toggleSidebar">
        <i class="data-sidebar-toggle__caret material-icons">arrow_drop_down</i>
      </div>
      <div class="data-sidebar-search">
        <input class="data-sidebar-search__input" v-on:input="debounceInput" placeholder="Search collection sites" />
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
            Subwatersheds (HUC12)
          </span>
          <i class="material-icons filters-toggle__icon" v-bind:class="{'filters-toggle__icon--collapsed': !filters.huc }">
            arrow_drop_down
          </i>
        </div>
        <div v-if="filters.huc" class="filter-body">
          <div v-for="huc in hucList" v-bind:key="huc.key" class="filter-body__list-item">
            <input type="checkbox" v-bind:value="huc['.value']" v-model="filters.hucFilters"></input>
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
    </div>

    <!-- List items -->
    <div class="data-sidebar__body">
      <div class="data-sidebar-list-item"
        v-on:click="selectActiveSite(site)"
        v-bind:class="{'data-sidebar-list-item--active': selectedSite === site}"
        v-bind:key="site.key"
        v-for="site in filteredResults">
         {{ site.stationName }}
      </div>
    </div>
  </aside>
</template>

<script>
import { db } from '../../helpers/firebase'
import _ from 'lodash'

let collectionSitesRef = db.ref('collectionSites')
let labsRef = db.ref('labs')
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
    collectionSites: collectionSitesRef,
    labs: labsRef,
    hucList: hucRef
  },
  computed: {
    filteredResults () {
      let sites = _.orderBy(this.collectionSites, 'stationName')
      sites = _.filter(sites, (site) => {
        let isPrivate = site.isPrivate
        let containsSearch = site.stationName.toLowerCase().includes(this.filters.search)
        let containsHuc = this.filters.hucFilters.length ? this.filters.hucFilters.indexOf(site.hucName) : 0
        let containsLab = this.filters.labFilters.length ? this.filters.labFilters.indexOf(site.lab) : 0

        return containsSearch && !isPrivate && !(containsHuc === -1) && !(containsLab === -1)
      })

      return sites
    }
  },
  data () {
    return {
      controls: {
        showFilters: false,
        filterSites: ['HUC', 'Lab']
      },
      filters: {
        search: '',
        huc: false,
        hucFilters: [],
        lab: false,
        labFilters: []
      }
    }
  },
  methods: {
    toggleSidebar () {
      this.$emit('toggleside')
    },
    selectActiveSite (site) {
      this.$emit('selected', site)
    },
    debounceInput: _.debounce(function (e) {
      this.filters.search = e.target.value
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/colors";

$data-sidebar-width: 240px;

.data-sidebar {
  display: flex;
  left: 0;
  position: absolute;
  top: 0;
  z-index: 2;

  flex-direction: column;
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
    flex: 1;
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
  max-height: 120px;
  padding: 5px 10px;

  background: #f5f5f5;
  overflow-y: auto;
}

.filter-body__list-item {
  font-size: 12px;
  padding: 2px 0;
}
</style>
