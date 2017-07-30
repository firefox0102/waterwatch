<template>
  <v-layout row justify-center>
    <v-dialog v-model="controls.showDialog" fullscreen  :overlay=false>
      <v-btn
        slot="activator"
        class="btn-nww--light">
        Add New Site
      </v-btn>
      <v-card>
        <v-toolbar dark class="primary">
          <v-btn icon @click.native="controls.showDialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>New Collection Site</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { db } from '../../helpers/firebase'

let collectionSitesRef = db.ref('collectionSites')

export default {
  name: 'site-reports',
  firebase: {
    collectionSites: collectionSitesRef
  },
  data: function () {
    return {
      controls: {
        showDialog: false
      },
      newCollectionsite: {
        adoptAStreamName: '',
        collectionPartner: '',
        storetName: '',
        hucName: '',
        huc: '',
        lab: '',
        latitude: '',
        logbookAbbv: '',
        longitude: '',
        stationName: '',
        googleMapsUrl: ''
      }
    }
  },
  methods: {
    submitCollectionSite: function () {
      try {
        // Set logbook number
        this.newLogData.logbookNumber = this.getLastLogbookNumber()

        this.$firebaseRefs.reports.push(this.newLogData)
      } catch (e) {
        console.log(e)
        this.snackbar.visible = true
      }
    }
  }
}
</script>
