<template>
  <v-layout column>
    <div class="collection-sites-header">
      <div class="collection-sites-header__primary-content">
        <div class="collection-sites-header__header">
          Collection Sites
        </div>

        <div class="collection-sites-header__subheader">
          Neighborhood Water Watch collection stations. Select a site to view logged data.
        </div>
      </div>
      <div class="collection-sites-header__secondary-content">
        <v-btn class=" btn-dark">Add New Site</v-btn>
      </div>
    </div>
    <v-card class="white-table collection-site-body">
      <v-card-title primary-title>
        <h4 class="collection-site-body__header">List of Collection Sites</h4>
      </v-card-title>

      <v-data-table
          v-bind:headers="headers"
          :items="items"
          hide-actions
          class="elevation-1"
        >
        <template slot="items" scope="props">
          <td class="text-sm-right">
            <router-link :to="{ name: 'Collection Site Data', params: { siteId: props.item.collectionSiteId } }">
              {{ props.item.stationName }}
            </router-link>
          </td>
          <td class="text-xs-right">{{ props.item.logbookAbv }}</td>
          <td class="text-xs-right">{{ props.item.latitude }}</td>
          <td class="text-xs-right">{{ props.item.longitude }}</td>
          <td class="text-xs-right">{{ props.item.collectionPartner }}</td>
          <td class="text-xs-right">{{ props.item.lab }}</td>
          <td class="text-xs-right">{{ props.item.huc }}</td>
        </template>
      </v-data-table>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: 'collection-sites',
  data: function () {
    return {
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
          huc: 'no idea',
          collectionSiteId: 1
        },
        {
          selected: false,
          stationName: 'Station 1',
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
          stationName: 'Station 1',
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
          stationName: 'Station 1',
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
          stationName: 'Station 1',
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
          stationName: 'Station 1',
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .collection-sites-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 47px;

    &__primary-content {
      padding-left: 32px;
    }

    &__header {
      color: #4A4A4A;
      font-family: Roboto;
      font-size: 32px;
      font-weight: 300;
      letter-spacing: 1px;
      line-height: 38px;
    }

    &__subheader {
      color: #9B9B9B;
      font-family: Roboto;
      font-size: 13px;
      line-height: 16px;
    }
  }

  .collection-site-body {
    &__header {
      height: 16px;
      color: #4A4A4A;
      font-family: Roboto;
      font-size: 24px;
      line-height: 16px;
    }
  }
</style>
