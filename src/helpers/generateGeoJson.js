import firebase from 'firebase'
import _ from 'lodash'

export const uploadNewGeoJsonFile = (collectionSites) => {
  let newFile = _generateJsonObject(collectionSites)
  let storageRef = firebase.storage().ref()
  let fileRef = storageRef.child('sites.geojson')

  fileRef.put(newFile).then(function (snapshot) {
    console.log('Uploaded new geojson file!')
  })
}

function _generateJsonObject (collectionSites) {
  let features = []

  _.forEach(collectionSites, function (item) {
    if (!item.isPrivate) {
      let tempObject = {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [
            item.longitude,
            item.latitude
          ]
        },
        'properties': {
          'Name': item.stationName
        }
      }
      features.push(tempObject)
    }
  })

  const dataObject = {
    'type': 'FeatureCollection',
    'crs': {
      'type': 'name',
      'properties': {
        'name': 'urn:ogc:def:crs:OGC:1.3:CRS84'
      }
    },
    'features': features
  }

  return new Blob([JSON.stringify(dataObject)], { type: 'application/json' })
}
