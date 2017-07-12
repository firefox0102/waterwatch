<template>
  <v-card>
    <div class="reports-header">
      <div class="reports-header__header">
        Reports
      </div>

      <div class="reports-header__subheader">
        Create and export reports of logged data for one or many collection sites during selected time period.
      </div>
    </div>
    <div class="reports-body">
      MENU ITEMS GO HERE LOL
      <v-card class="white-table">
        <v-data-table
            v-bind:headers="headers"
            :items="items"
            hide-actions
            class="elevation-1">
          <template slot="items" scope="props">
            <td class="text-xs-right">{{ props.item.stationName }}</td>
            <td class="text-xs-right">{{ props.item.logbookAbv }}</td>
            <td class="text-xs-right">{{ props.item.latitude }}</td>
            <td class="text-xs-right">{{ props.item.longitude }}</td>
            <td class="text-xs-right">{{ props.item.collectionPartner }}</td>
            <td class="text-xs-right">{{ props.item.lab }}</td>
            <td class="text-xs-right">{{ props.item.huc }}</td>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'reports',
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
          huc: 'no idea'
        },
        {
          selected: false,
          stationName: 'Station 1',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK',
          lab: 'Petes Lab',
          huc: 'no idea'
        },
        {
          selected: false,
          stationName: 'Station 1',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK',
          lab: 'Petes Lab',
          huc: 'no idea'
        },
        {
          selected: false,
          stationName: 'Station 1',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK',
          lab: 'Petes Lab',
          huc: 'no idea'
        },
        {
          selected: false,
          stationName: 'Station 1',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK',
          lab: 'Petes Lab',
          huc: 'no idea'
        },
        {
          selected: false,
          stationName: 'Station 1',
          logbookAbv: 'Beav @ Park',
          latitude: '33.7489',
          longitude: '-84.3879',
          collectionPartner: 'CRK',
          lab: 'Petes Lab',
          huc: 'no idea'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .reports-header {
    display: flex;
    justify-content: space-between;
    padding: 22px 56px 29px;
    flex-direction: column;

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

  .reports-body {
    padding: 0 24px 24px;
  }
</style>
