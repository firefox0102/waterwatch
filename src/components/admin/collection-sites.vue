<template>
  <md-layout md-column>
    <md-layout>
      <md-layout md-column md-flex="75">
        <div class="md-title">
          Collection Sites
        </div>

        <div class="md-subhead">
          Neighborhood Water Watch collection stations. Select a site to view logged data.
        </div>
      </md-layout>
      <md-layout md-flex="25" md-align="end">
        <md-button md-menu-trigger class="md-raised">Add New Site</md-button>
      </md-layout>
    </md-layout>

    <md-card>
      <md-card-header>
        <h4>List of Collection Sites</h4>
      </md-card-header>

      <md-table>
        <md-table-header>
          <md-table-row>
            <md-table-head></md-table-head>
            <md-table-head>Station name</md-table-head>
            <md-table-head>Logbook abv</md-table-head>
            <md-table-head>Latitude</md-table-head>
            <md-table-head>Longitude</md-table-head>
            <md-table-head>Collection Partner</md-table-head>
            <md-table-head></md-table-head>
          </md-table-row>
        </md-table-header>

        <md-table-body>
          <md-table-row v-for="collectionSite in collectionSites" v-bind:key="collectionSite.stationName">
            <md-table-cell>
              <md-checkbox v-model="collectionSite.selected" class="md-primary"></md-checkbox>
            </md-table-cell>
            <md-table-cell>{{ collectionSite.stationName }}</md-table-cell>
            <md-table-cell>{{ collectionSite.logbookAbv }}</md-table-cell>
            <md-table-cell>{{ collectionSite.latitude }}</md-table-cell>
            <md-table-cell>{{ collectionSite.longitude }}</md-table-cell>
            <md-table-cell>{{ collectionSite.collectionPartner }}</md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
    </md-card>
  </md-layout>
</template>

<script>
export default {
  name: 'collection-sites',
  data: function() {
    return {
      collectionSites: [
        {
          selected: false,
          stationName: 'Station 1',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK'
        },
        {
          selected: false,
          stationName: 'Station 2',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK'
        },
        {
          selected: false,
          stationName: 'Station 3',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK'
        },
        {
          selected: false,
          stationName: 'Station 4',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK'
        },
        {
          selected: false,
          stationName: 'Station 5',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
