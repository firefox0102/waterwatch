<template>
  <div class="data-map-banner" v-if="selectedSite">
    <div class="data-map-banner__header">
      {{ selectedSite.stationName }}
    </div>

    <div class="data-map-banner__row">
      <div class="data-map-banner__text data-map-banner__text--strong">
        Collected by:
      </div>

      <div class="data-map-banner__text">
        {{ selectedSite.collectionPartner }}
      </div>
    </div>

    <div class="data-map-banner__row">
      <div class="data-map-banner__text data-map-banner__text--strong">
        Watershed Unit (HUC):
      </div>

      <div class="data-map-banner__text">
        {{ selectedSite.hucName }}
      </div>
    </div>

    <div class="data-map-banner__row">
      <div class="data-map-banner__text data-map-banner__text--strong">
        First collected:
      </div>

      <div class="data-map-banner__text">
        {{ selectedSite.firstCollectionDate | formatDate }}
      </div>
    </div>


    <div class="data-map-banner__row data-map-banner__row--top-space">
      <div class="data-map-banner__text data-map-banner__text--nww data-map-banner__text--strong">
        Last E. coli Result:
      </div>

      <div class="data-map-banner__text data-map-banner__text--nww">
        {{ selectedSite.lastEColiResult }} (MPN/100mL) on ({{selectedSite.lastCollectionDate | formatDate}})
      </div>
    </div>
  </div>
</template>

<script>
import formatDateFilter from '../../filters/formatDateFilter'

export default {
  name: 'data-map-banner',
  props: ['selectedSite'],
  filters: {
    formatDateFilter
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/colors";
@import "../../scss/map";
</style>
