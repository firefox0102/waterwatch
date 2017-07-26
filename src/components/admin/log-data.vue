<template>
  <div class="log-data">
    <div class="log-data-header">
      <div class="log-data-header__text">
        Log Data
      </div>
      <div class="log-data-header__subtext">
        Log new data for a collection site
      </div>
    </div>
    <div class="log-data-body">
      <form class="log-data-body__form">
        <div class="log-data-body__column">
          <div class="log-data-body__header">
            Collection Details
          </div>
          <div>
            Logbook # - {{getLogbookNumber()}}
          </div>

          <v-menu
            lazy
            :close-on-content-click="false"
            v-model="newLogData.collectionDate"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-left="40"
            max-width="290px">
            <v-text-field
              slot="activator"
              label="Date"
              v-model="newLogData.collectionDate"
              append-icon="event"
              class="input-group--focused"
              required>
            </v-text-field>
            <v-date-picker v-model="newLogData.collectionDate" no-title scrollable actions>
              <template scope="{ save, cancel }">
                <v-card-actions>
                  <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                  <v-btn flat primary @click.native="save()">Save</v-btn>
                </v-card-actions>
              </template>
            </v-date-picker>
          </v-menu>

          <v-select
            v-bind:items="collectionSites"
            item-text="stationName"
            item-value="$index"
            v-model="newLogData.collectionSite"
            label="Station Name"
            single-line
            class="input-group--focused"
            required
            bottom>
          </v-select>
          <v-text-field
              label="Collection Time"
              v-model="newLogData.collectionTime"
              type="time"
              suffix="EST"
              required
              class="input-group--focused">
          </v-text-field>
          <v-text-field
              label="Analyst (Initials)"
              class="input-group--focused"
              required
              v-model="newLogData.analyst">
          </v-text-field>
          <v-text-field
              name="input-5-1"
              label="Notes"
              v-model="newLogData.notes"
              class="input-group--focused"
              required
            ></v-text-field>
        </div>

        <div class="log-data-body__column">
          <div class="log-data-body__header">
            Incubation and Parameters
          </div>
          <v-text-field
              label="Incubation In Time"
              v-model="newLogData.incubationTime"
              type="time"
              required
              class="input-group--focused">
          </v-text-field>
          <v-text-field
              label="# mL/100mL (Dilution)"
              class="input-group--focused"
              required
              type="number"
              v-model="newLogData.dilution">
          </v-text-field>
          <v-text-field
              label="Fluorometry"
              class="input-group--focused"
              required
              type="number"
              v-model="newLogData.fluorometry">
          </v-text-field>
          <v-text-field
              label="Turbidity (NTU)"
              class="input-group--focused"
              required
              type="number"
              v-model="newLogData.turbidity">
          </v-text-field>
          <v-text-field
              label="Conductivity (uS)"
              class="input-group--focused"
              required
              type="number"
              v-model="newLogData.specifcConductivity">
          </v-text-field>
          <v-text-field
              label="Rainfall (in)"
              class="input-group--focused"
              required
              type="number"
              v-model="newLogData.precipitation">
          </v-text-field>
          <v-text-field
              label="Incubation Temp (*C)"
              class="input-group--focused"
              required
              type="number"
              v-model="newLogData.incubationTemp">
          </v-text-field>
          <v-text-field
              label="Incubation Out"
              v-model="newLogData.incubationOut"
              type="time"
              required
              class="input-group--focused">
          </v-text-field>
        </div>

        <div class="log-data-body__column">
          <div class="log-data-body__header">
            Total Coliform
          </div>
          <v-text-field
              label="Large Cells"
              class="input-group--focused"
              required
              type="number"
              v-model="newLogData.coliformLargeCells">
          </v-text-field>
          <v-text-field
              label="Small Cells"
              class="input-group--focused"
              required
              type="number"
              v-model="newLogData.coliformSmallCells">
          </v-text-field>

          <div class="log-data-body__header">
            E. Coli
          </div>
          <v-text-field
              label="Large Cells"
              class="input-group--focused"
              required
              type="number"
              v-model="newLogData.ecoliLargeCells">
          </v-text-field>
          <v-text-field
              label="Small Cells"
              class="input-group--focused"
              required
              type="number"
              v-model="newLogData.ecoliSmallCells">
          </v-text-field>

          <v-btn class="btn-nww" v-on:click.native="submitLog">
            Log Data
          </v-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '../../helpers/firebase'

let collectionSitesRef = db.ref('collectionSites')
let reportsRef = db.ref('reports')
let lastReportRef = db.ref('reports').limitToLast(1)

function requireAuth (to, from, next) {
  if (!firebase.auth().currentUser) {
    console.log('User is not logged in')
    next({
      path: '/signIn',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    console.log('User is logged in:', firebase.auth().currentUser.uid)
    next()
  }
}

export default {
  name: 'log-data',
  firebase: {
    collectionSites: collectionSitesRef,
    reports: reportsRef,
    lastReport: lastReportRef
  },
  beforeEnter: requireAuth,
  data: function () {
    return {
      newLogData: {
        analyst: '',
        coliformLargeCells: '',
        coliformSmallCells: '',
        collectionDate: '',
        collectionTime: '',
        dilution: null,
        eColiLargeCells: null,
        eColiSmallCells: null,
        fluorometry: null,
        incubationOut: '',
        incubationTemp: null,
        incubationTime: '',
        precipitation: null,
        collectionSite: null,
        siteName: '',
        specifcConductivity: null,
        turbidity: null,
        notes: ''
      }
    }
  },
  methods: {
    submitLog: function () {
      // Parse collection site data
      let selectedSite = this.newLogData.collectionSite
      this.newLogData.stationName = selectedSite.stationName
      this.newLogData.stationId = this.newLogData.collectionSite['.key']
      this.newLogData.collectionSite = null

      // Set logbook number
      this.newLogData.logbookNumber = this.getLogbookNumber()

      this.$firebaseRefs.reports.push(this.newLogData)
    },
    getLogbookNumber: function () {
      return (this.lastReport[0] ? this.lastReport[0].logbookNumber : 0) + 1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .log-data {
    margin: 24px;
    box-shadow: 0 1px 3px 0 rgba(155,155,155,0.5);
  }

  .log-data-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #F7F7F7;
    padding: 22px 56px;

    &__text {
    	height: 38px;
      color: #004D71;
    	font-family: Roboto;
    	font-size: 32px;
    	font-weight: 300;
    	letter-spacing: 1px;
    	line-height: 38px;
    	text-align: center;
      margin-bottom: 5px;
    }

    &__subtext {
      @extend .log-data-header__text;
      height: 16px;
      color: #4D86A0;
      font-family: Roboto;
      font-size: 13px;
      line-height: 16px;
    }
  }

  .log-data-body {
    padding: 33px 50px;
    background-color: #FFFFFF;

    &__column {
      display: flex;
      flex-direction: column;
      width: 300px;
    }

    &__form {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    }

    &__header {
      height: 16px;
      color: #7FBA00;
      font-family: Roboto;
      font-size: 18px;
      font-weight: 500;
      line-height: 16px;
      margin-bottom: 46px;
    }
  }
</style>
