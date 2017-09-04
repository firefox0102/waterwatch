<template>
  <div>
    <v-dialog v-model="controls.showDialog" :overlay="false">
      <v-btn 
        slot="activator"
        class="site-reports-actions__action site-reports-actions__action--no-margin success white--text">
        Edit
        <v-icon right dark>edit</v-icon>
      </v-btn>
      <v-card v-if="collectionSite">
        <v-card-title>
          <span class="headline">Edit Collection Site</span>
        </v-card-title>
        <form class="add-form" v-on:submit.prevent="submitForm">
          <v-text-field label="Station Name" v-model="collectionSite.stationName" required></v-text-field>
          <v-text-field label="Logbook Abbreviation" v-model="collectionSite.logbookAbbv" required></v-text-field>
          <v-text-field label="Adopt A Stream Name" v-model="collectionSite.adoptAStreamName" required></v-text-field>
          <v-text-field label="HUC Name" v-model="collectionSite.hucName" required></v-text-field>
          <v-text-field label="HUC" type="number" v-model="collectionSite.huc" required></v-text-field>
          <v-text-field label="Latitude" v-model="collectionSite.latitude" required></v-text-field>
          <v-text-field label="Longitude" v-model="collectionSite.longitude" required></v-text-field>
          <v-text-field label="Storet Name" v-model="collectionSite.storetName" required></v-text-field>
          <v-select v-bind:items="partners" v-model="collectionSite.collectionPartner" item-text=".value" item-value=".value" label="Collection Partner" single-line class="input-group--limit-height" required bottom>
          </v-select>
          <v-select v-bind:items="labs" v-model="collectionSite.lab" item-text=".value" item-value=".value" label="Lab" single-line class="input-group--limit-height" bottom>
          </v-select>
          <v-btn class="btn-nww" type="submit">
            Update Site
          </v-btn>
        </form>
      </v-card>
    </v-dialog>
    <v-snackbar :timeout="snackbar.timeout" :error="true" v-model="snackbar.errorVisible">
      {{snackbar.errorMessage}}
      <v-btn dark flat @click.native="snackbar.errorVisible = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar :timeout="snackbar.timeout" :info="true" v-model="snackbar.successVisible">
      {{snackbar.successMessage}}
      <v-btn dark flat @click.native="snackbar.successVisible = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { db } from '../../helpers/firebase'

let collectionSitesRef = db.ref('collectionSites')
let labsRef = db.ref('labs')
let partnersRef = db.ref('partners')
let metaRef = db.ref('metaData')

export default {
  name: 'edit-collection-site',
  props: ['collectionSite'],
  firebase: {
    collectionSites: collectionSitesRef,
    labs: labsRef,
    partners: partnersRef,
    metaData: metaRef
  },
  data () {
    return {
      controls: {
        showDialog: false
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
    submitForm () {
      try {
        // TODO fix this
        let itemCopy = { ...this.collectionSite }
        delete itemCopy['.key']
        this.$firebaseRefs.collectionSites.child(this.collectionSite['.key']).set(itemCopy)

        this.snackbar.successVisible = true
        this.controls.showDialog = false
      } catch (e) {
        console.log(e)
        this.snackbar.errorVisible = true
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../scss/colors";
@import "../../scss/collection-sites";

.add-header-toolbar {
  background-color: $color-iron-sea !important;
}

.add-form {
  padding: 10px;
}
</style>
