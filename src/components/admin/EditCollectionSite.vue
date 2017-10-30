<template>
  <div>
    <v-dialog v-model="controls.showDialog" :overlay="false">
      <v-btn
        slot="activator"
        class="site-reports-actions__action site-reports-actions__action--no-margin btn btn-nww">
        Edit
        <v-icon right dark>edit</v-icon>
      </v-btn>
      <v-card v-if="collectionSite">
        <div class="page-content-header">
          <div class="page-content-header__text">
            Edit Collection Site
          </div>
        </div>
        <div class="page-content-body">
          <form class="add-form" v-on:submit.prevent="submitForm">
            <v-text-field label="Station Name" v-model="collectionSite.stationName" required></v-text-field>
            <v-text-field label="Logbook Abbreviation" v-model="collectionSite.logbookAbbv" required></v-text-field>
            <v-select
              v-bind:items="labSet"
              v-model="collectionSite.lab"
              item-text=".value"
              item-value=".value"
              label="Lab"
              required
              bottom>
            </v-select>
            <v-text-field label="Latitude (eg. 34.004401)" v-model="collectionSite.latitude" required></v-text-field>
            <v-text-field label="Longitude (eg. -84.350555)" v-model="collectionSite.longitude" required></v-text-field>
            <v-select
              v-bind:items="hucSet"
              v-model="collectionSite.hucName"
              label="Subwatershed (HUC 12) Name"
              required
              autocomplete
              bottom>
            </v-select>
            <v-text-field label="HUC 12 Number" type="number" v-model="collectionSite.huc"></v-text-field>
            <v-text-field label="Adopt-A-Stream Name" v-model="collectionSite.adoptAStreamName"></v-text-field>
            <v-text-field label="Adopt-A-Stream 'S' ID (eg. S-4475)" v-model="collectionSite.adoptAStreamId"
              :rules="[(v) => !!v || 'Enter the 4 numbers after S- only (Leave blank if no ID)']"></v-text-field>
            <v-text-field label="STORET Name" v-model="collectionSite.storetName"></v-text-field>
            <v-text-field label="STORET Location ID (eg. NWW24)" v-model="collectionSite.storetLocationId"></v-text-field>
            <v-select
              v-bind:items="partnerSet"
              v-model="collectionSite.collectionPartner"
              item-text=".value"
              item-value=".value"
              label="Collection Partner"
              bottom>
            </v-select>
            <v-checkbox v-bind:label="`${ collectionSite.isPrivate ? 'Check this box to hide from map (make private)' : 'Check this box to hide from map (make private)' }`" v-model="collectionSite.isPrivate" success></v-checkbox>
            <div class="flex">
              <v-btn class="btn-nww" type="submit">Save Site</v-btn>
              <v-btn v-on:click.native="close" flat primary class="btn">Cancel</v-btn>
            </div>
          </form>
        </div>
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
import _ from 'lodash'

let collectionSitesRef = db.ref('collectionSites')
let labsRef = db.ref('labs')
let partnersRef = db.ref('partners')
let metaRef = db.ref('metaData')
let hucRef = db.ref('hucList')

export default {
  name: 'edit-collection-site',
  props: ['collectionSite'],
  firebase: {
    collectionSites: collectionSitesRef,
    labs: labsRef,
    partners: partnersRef,
    metaData: metaRef,
    hucList: hucRef
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
    },
    hucList: {
      handler () {
        this.hucSet = _.map(this.hucList, '.value')
      }
    }
  },
  data () {
    return {
      labs: [],
      labSet: [],
      hucList: [],
      hucSet: [],
      partners: [],
      partnerSet: [],
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
        let itemCopy = { ...this.collectionSite }
        delete itemCopy['.key']
        this.$firebaseRefs.collectionSites.child(this.collectionSite['.key']).set(itemCopy)

        this.snackbar.successVisible = true
        this.controls.showDialog = false
      } catch (e) {
        console.log(e)
        this.snackbar.errorVisible = true
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
@import "../../scss/collection-sites";

.add-header-toolbar {
  background-color: $color-iron-sea !important;
}

.add-form {
  padding: 10px;
}
</style>
