<template>
  <v-layout row justify-center>
    <v-dialog v-model="controls.showDialog"  :overlay="false">
      <v-btn
        slot="activator"
        class="btn-nww--light">
        Add New Site
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">New Collection Site</span>
        </v-card-title>
        <form
          class="add-form"
          v-on:submit.prevent="submitForm">
          <v-text-field label="Station Name" v-model="newCollectionSite.stationName" required></v-text-field>
          <v-text-field label="Logbook Abbreviation" v-model="newCollectionSite.logbookAbbv" required></v-text-field>
          <v-text-field label="Adopt A Stream Name" v-model="newCollectionSite.adoptAStreamName"></v-text-field>
          <v-text-field label="HUC 12 Name" v-model="newCollectionSite.hucName" required></v-text-field>
          <v-text-field label="HUC 12" type="number" v-model="newCollectionSite.huc" required></v-text-field>
          <v-text-field label="Latitude (eg. 34.004401)" v-model="newCollectionSite.latitude" required></v-text-field>
          <v-text-field label="Longitude (eg. -84.350555)" v-model="newCollectionSite.longitude" required></v-text-field>
          <v-text-field label="Storet Name" v-model="newCollectionSite.storetName"></v-text-field>
          <v-select
            v-bind:items="partnerSet"
            v-model="newCollectionSite.collectionPartner"
            item-text=".value"
            item-value=".value"
            label="Collection Partner"
            required
            bottom>
          </v-select>
          <v-select
            v-bind:items="labSet"
            v-model="newCollectionSite.lab"
            item-text=".value"
            item-value=".value"
            label="Lab"
            required
            bottom>
          </v-select>
          <v-checkbox v-bind:label="`Is Private: ${ newCollectionSite.isPrivate ? 'true' : 'false' }`" v-model="newCollectionSite.isPrivate" success></v-checkbox>
          <v-btn
            class="btn-nww"
            type="submit">
            Confirm
          </v-btn>
        </form>
      </v-card>
    </v-dialog>
    <v-snackbar
      :timeout="snackbar.timeout"
      :error="true"
      v-model="snackbar.errorVisible">
      {{snackbar.errorMessage}}
      <v-btn dark flat @click.native="snackbar.errorVisible = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar
      :timeout="snackbar.timeout"
      :info="true"
      v-model="snackbar.successVisible">
      {{snackbar.successMessage}}
      <v-btn dark flat @click.native="snackbar.successVisible = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import { db } from '../../helpers/firebase'
import _ from 'lodash'

let collectionSitesRef = db.ref('collectionSites')
let labsRef = db.ref('labs')
let partnersRef = db.ref('partners')
let metaRef = db.ref('metaData')

export default {
  name: 'add-collection-site',
  firebase: {
    collectionSites: collectionSitesRef,
    labs: labsRef,
    partners: partnersRef,
    metaData: metaRef
  },
  watch: {
    labs: {
      handler () {
        this.labSet = _.map(this.labs, '.value')
      }
    },
    partners: {
      handler () {
        this.partnerSet = _.map(this.partners, '.value')
      }
    }
  },
  data: function () {
    return {
      labs: [],
      labSet: [],
      partners: [],
      partnerSet: [],
      controls: {
        showDialog: false
      },
      newCollectionSite: {
        adoptAStreamName: '',
        collectionPartner: '',
        hucName: '',
        huc: '',
        lab: '',
        latitude: '',
        logbookAbbv: '',
        longitude: '',
        stationName: '',
        storetName: '',
        numSamples: 0,
        isPrivate: false
      },
      snackbar: {
        errorVisible: false,
        successVisible: false,
        successMessage: 'Collection Site saved successfully!',
        errorMessage: 'There was an issue saving your Collection Site',
        timeout: 6000
      }
    }
  },
  methods: {
    submitForm: function () {
      try {
        this.$firebaseRefs.collectionSites.push(this.newCollectionSite)

        let activeSites = _.find(this.metaData, { '.key': 'activeSites' })
        let totalSites = _.find(this.metaData, { '.key': 'totalSites' })

        let newActive = activeSites['.value'] + 1
        this.$firebaseRefs.metaData.child('activeSites').set(newActive)
        let newTotalSites = totalSites['.value'] + 1
        this.$firebaseRefs.metaData.child('totalSites').set(newTotalSites)

        this.snackbar.successVisible = true
        this.controls.showDialog = false
      } catch (e) {
        console.log(e)
        this.snackbar.errorVisible = true
      }
    },
    resetCollectionForm () {
      this.newCollectionSite = {
        adoptAStreamName: '',
        collectionPartner: '',
        hucName: '',
        huc: '',
        lab: '',
        latitude: '',
        logbookAbbv: '',
        longitude: '',
        stationName: '',
        storetName: '',
        numSamples: 0
      }
    },
    close () {
      this.controls.showDialog = false
    }
  }
}
</script>

<style lang="scss">
@import "../../scss/colors";

.add-header-toolbar {
  background-color: $color-iron-sea !important;
}

.add-form {
  padding: 10px;
}
</style>
