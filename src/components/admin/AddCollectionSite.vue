<template>
  <v-layout row justify-center>
    <v-dialog v-model="controls.showDialog"  :overlay=false>
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
          <v-text-field label="Adopt A Stream Name" v-model="newCollectionSite.adoptAStreamName" required></v-text-field>
          <v-text-field label="Collection Partner" v-model="newCollectionSite.collectionPartner" required></v-text-field>
          <v-text-field label="Google Maps URL" v-model="newCollectionSite.googleMapsUrl" required></v-text-field>
          <v-text-field label="HUC Name" v-model="newCollectionSite.hucName" required></v-text-field>
          <v-text-field label="HUC" type="number" v-model="newCollectionSite.huc" required></v-text-field>
          <v-text-field label="Latitude" v-model="newCollectionSite.latitude" required></v-text-field>
          <v-text-field label="longitude" v-model="newCollectionSite.longitude" required></v-text-field>
          <v-text-field label="storetName" v-model="newCollectionSite.storetName" required></v-text-field>
          <v-select
            v-bind:items="labs"
            v-model="newCollectionSite.lab"
            item-text=".value"
            item-value=".value"
            label="Lab"
            single-line
            class="input-group--limit-height"
            bottom>
          </v-select>
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
      v-model="snackbar.visible">
      {{snackbar.errorMessage}}
      <v-btn dark flat @click.native="snackbar.visible = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import { db } from '../../helpers/firebase'

let collectionSitesRef = db.ref('collectionSites')
let labsRef = db.ref('labs')

export default {
  name: 'site-reports',
  firebase: {
    collectionSites: collectionSitesRef,
    labs: labsRef
  },
  data: function () {
    return {
      controls: {
        showDialog: false
      },
      newCollectionSite: {
        adoptAStreamName: '',
        collectionPartner: '',
        googleMapsUrl: '',
        hucName: '',
        huc: '',
        lab: '',
        latitude: '',
        logbookAbbv: '',
        longitude: '',
        stationName: '',
        storetName: '',
        collectionSiteId: null // TODO set the ID when you save it
      },
      snackbar: {
        visible: false,
        errorMessage: 'There was an issue saving your Collection Site',
        timeout: 6000
      }
    }
  },
  methods: {
    submitForm: function () {
      try {
        this.$firebaseRefs.collectionSites.push(this.newCollectionSite)
        this.controls.showDialog = false
      } catch (e) {
        console.log(e)
        this.snackbar.visible = true
      }
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
