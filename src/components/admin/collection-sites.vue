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
    <v-card>
      <v-card-header>
        <h4>List of Collection Sites</h4>
      </v-card-header>

      <v-data-table
          v-bind:headers="headers"
          :items="items"
          hide-actions
          class="elevation-1"
        >
        <template slot="items" scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.calories }}</td>
          <td class="text-xs-right">{{ props.item.fat }}</td>
          <td class="text-xs-right">{{ props.item.carbs }}</td>
          <td class="text-xs-right">{{ props.item.protein }}</td>
          <td class="text-xs-right">{{ props.item.sodium }}</td>
          <td class="text-xs-right">{{ props.item.calcium }}</td>
          <td class="text-xs-right">{{ props.item.iron }}</td>
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
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Station Name', value: 'stationName' },
        { text: 'Logbook abv', value: 'logbookAbv' },
        { text: 'Latitude', value: 'latitude' },
        { text: 'Longitude', value: 'longitude' },
        { text: 'Collection Partner', value: 'collectionPartner' },
        { text: 'Calcium (%)', value: 'calcium' },
        { text: 'Iron (%)', value: 'iron' }
      ],
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
      // height: 16px;
      // width: 502px;
      color: #9B9B9B;
      font-family: Roboto;
      font-size: 13px;
      line-height: 16px;
    }
  }
</style>
