<!-- <template>
  <v-layout>
    <v-btn
      v-on:click="generateJsonBlob"
      class="btn"
      color="primary"
    >
      Generate New GeoJson File
    </v-btn>
  </v-layout>
</template>

<script>
import firebase from 'firebase'
import _ from 'lodash'

export default {
  name: 'generate-geojson',
  props: [
    'collectionSites'
  ],
  methods: {
    generateJsonBlob () {
      let newFile = this.generateJsonObject()
      let storageRef = firebase.storage().ref()
      let fileRef = storageRef.child('sites.geojson')
      let path = fileRef.fullPath

      fileRef.put(newFile).then(function (snapshot) {
        console.log('Uploaded new geojson file!')
      })
    },
    generateJsonObject () {
      let collectionSiteCoordinates = []

      _.forEach(this.collectionSites, function (item) {
        collectionSiteCoordinates.push([item.latitude, item.longitude, item.stationName])
      })

      const dataObject = {
        'type': 'FeatureCollection',
        'crs': {
          'type': 'name',
          'properties': {
            'name': 'urn:ogc:def:crs:OGC:1.3:CRS84'
          }
        },
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [
                collectionSiteCoordinates
              ]
            }
          }
        ]
      }

      return new Blob([JSON.stringify(dataObject)], { type: 'application/json' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only
<style lang="scss" scoped>
</style>

 -->
 -->
