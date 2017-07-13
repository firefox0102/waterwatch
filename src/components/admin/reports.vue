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
      <div class="reports-body__toolbar">
        <v-layout row>
          <v-text-field
            xs3
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
          <v-menu
            xs2
            lazy
            :close-on-content-click="false"
            v-model="menu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-left="40"
            max-width="290px"
          >
            <v-text-field
              slot="activator"
              label="Picker in menu"
              v-model="e3"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="e3" no-title scrollable actions>
              <template scope="{ save, cancel }">
                <v-card-actions>
                  <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                  <v-btn flat primary @click.native="save()">Save</v-btn>
                </v-card-actions>
              </template>
            </v-date-picker>
          </v-menu>
          <v-menu
            xs1
            right
            lazy
            :close-on-content-click="false"
            v-model="menu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-left="40"
            max-width="290px"
          >
            <v-text-field
              slot="activator"
              label="Picker in menu"
              v-model="e3"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="e3" no-title scrollable actions>
              <template scope="{ save, cancel }">
                <v-card-actions>
                  <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                  <v-btn flat primary @click.native="save()">Save</v-btn>
                </v-card-actions>
              </template>
            </v-date-picker>
          </v-menu>
          <v-flex xs4>
            <v-select
              v-bind:items="items"
              v-model="e1"
              label="Select"
              single-line
              bottom
            ></v-select>
          </v-flex>
        </v-layout>
      </div>
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
