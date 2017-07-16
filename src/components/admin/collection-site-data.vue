<template>
  <v-layout column>
    <div class="collection-sites-header">
      <div class="collection-sites-header__primary-content">
        <div class="collection-sites-header__header">
          {{ site.stationName }}
        </div>

        <div class="collection-sites-header__subheader-wrapper">
          <
          <router-link class="collection-sites-header__subheader" :to="{ name: 'Collection Sites'}">
            Back to List of Collection Sites
          </router-link>

        </div>
      </div>
      <div class="collection-sites-header__secondary-content">
        <router-link to="/logData">
          <v-btn class="btn-nww--light">
            Log New Data
          </v-btn>
        </router-link>
      </div>
    </div>
    <v-card class="nww-table collection-site-body">
      <v-card-title primary-title>
        <h4 class="collection-site-body__header">Logged Data for {{ site.stationName }}</h4>
      </v-card-title>

      <v-data-table
          v-model="selected"
          v-bind:headers="headers"
          :items="items"
          select-all
          class="elevation-1"
          selected-key="logbookNumber"
          v-bind:pagination.sync="pagination"
        >
        <template slot="headers" scope="props">
          <tr>
            <th>
              <v-checkbox
                primary
                hide-details
                @click.native="toggleAll"
                :input-value="props.all"
                :indeterminate="props.indeterminate"
              ></v-checkbox>
            </th>
            <th v-for="header in props.headers" :key="header"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header.value)"
            >
              <v-icon>arrow_upward</v-icon>
              {{ header.text }}
            </th>
          </tr>
        </template>
        <template slot="items" scope="props">
          <td>
            <v-checkbox
              primary
              hide-details
              :input-value="props.selected"
            ></v-checkbox>
          </td>
          <td class="text-xs-right">{{ props.item.logbookNumber }}</td>
          <td class="text-xs-right">{{ props.item.date }}</td>
          <td class="text-xs-right">{{ props.item.collectionTime }}</td>
          <td class="text-xs-right">{{ props.item.analyst }}</td>
          <td class="text-xs-right">{{ props.item.incubationTime }}</td>
          <td class="text-xs-right">{{ props.item.dilution }}</td>
          <td class="text-xs-right">{{ props.item.fluorometry }}</td>
          <td class="text-xs-right">{{ props.item.turbidity }}</td>
          <td class="text-xs-right">{{ props.item.conductivity }}</td>
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
      pagination: {
        sortBy: 'name'
      },
      selected: [],
      headers: [
        { text: 'Logbook #', value: 'logbookNumber' },
        { text: 'Date', value: 'date' },
        { text: 'Collection Time', value: 'collectionTime' },
        { text: 'Analyst', value: 'analyst' },
        { text: 'Incubation In Time', value: 'incubationTime' },
        { text: '# mL/100mL (Dilution)', value: 'dilution' },
        { text: 'Fluorometry', value: 'fluorometry' },
        { text: 'Turbidity (NTU)', value: 'turbidity' },
        { text: 'Conductivity (uS)', value: 'conductivity' }
      ],
      site: {
        stationName: 'Beavers in a Park',
        logbookAbv: 'Beav @ Park',
        latitude: '33.7489',
        longitude: '-84.3879',
        collectionPartner: 'CRK',
        lab: 'Petes Lab',
        huc: 'no idea',
        collectionSiteId: 1
      },
      items: [
        {
          logbookNumber: 8561,
          date: '2/18/16',
          collectionTime: '10:50',
          analyst: 'OI',
          incubationTime: '14:09',
          dilution: '2',
          fluorometry: '7.168',
          turbidity: '6.57',
          conductivity: '360'
        },
        {
          logbookNumber: 8561,
          date: '2/18/16',
          collectionTime: '10:50',
          analyst: 'OI',
          incubationTime: '14:09',
          dilution: '2',
          fluorometry: '7.168',
          turbidity: '6.57',
          conductivity: '360'
        },
        {
          logbookNumber: 8561,
          date: '2/18/16',
          collectionTime: '10:50',
          analyst: 'OI',
          incubationTime: '14:09',
          dilution: '2',
          fluorometry: '7.168',
          turbidity: '6.57',
          conductivity: '360'
        },
        {
          logbookNumber: 8561,
          date: '2/18/16',
          collectionTime: '10:50',
          analyst: 'OI',
          incubationTime: '14:09',
          dilution: '2',
          fluorometry: '7.168',
          turbidity: '6.57',
          conductivity: '360'
        },
        {
          logbookNumber: 8561,
          date: '2/18/16',
          collectionTime: '10:50',
          analyst: 'OI',
          incubationTime: '14:09',
          dilution: '2',
          fluorometry: '7.168',
          turbidity: '6.57',
          conductivity: '360'
        },
        {
          logbookNumber: 8561,
          date: '2/18/16',
          collectionTime: '10:50',
          analyst: 'OI',
          incubationTime: '14:09',
          dilution: '2',
          fluorometry: '7.168',
          turbidity: '6.57',
          conductivity: '360'
        },
        {
          logbookNumber: 8561,
          date: '2/18/16',
          collectionTime: '10:50',
          analyst: 'OI',
          incubationTime: '14:09',
          dilution: '2',
          fluorometry: '7.168',
          turbidity: '6.57',
          conductivity: '360'
        }
      ]
    }
  },
  methods: {
    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.items.slice()
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
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
      color: #004D71;
      font-size: 32px;
      font-weight: 300;
      letter-spacing: 1px;
      line-height: 38px;
    }

    &__subheader {
      color: #8E7630;
      font-size: 13px;
      line-height: 16px;
    }

    &__subheader-wrapper {
      color: #8E7630;
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
