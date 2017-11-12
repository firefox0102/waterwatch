export class MapHelper {
  constructor (selectSiteCallback) {
    this.selectSiteCallback = selectSiteCallback

    window.mapboxgl.accessToken = 'pk.eyJ1IjoibGNhY2VkYSIsImEiOiIzNmM4MGRlN2I4NDhiY2UxZjA4MmJjZjE5OWEzYjUzNSJ9.Wc5KTJpWxmpxVMZfcuEQNg'
    var map = new window.mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/lcaceda/cj9bqvwwu4kb52smypbx0j8f9', // hosted style id
      center: [-84.057249, 33.15888], // starting position
      zoom: 6.5 // starting zoom
    })

    // MAP LAYERS //
    map.on('load', function () {
      // CHATTAHOOCHEE RIVER BASIN//
// MAP SOURCES
      map.addSource('basin', {
        'type': 'geojson',
        'data': 'https://firebasestorage.googleapis.com/v0/b/waterwatch-cb707.appspot.com/o/Chatt_River_Basin.geojson?alt=media&token=b2fae9b1-5e2b-4de1-8056-7cc7a289a5d5'
      })

      map.addSource('sites', {
        'type': 'geojson',
        'data': 'https://firebasestorage.googleapis.com/v0/b/waterwatch-cb707.appspot.com/o/sites.geojson?alt=media&token=9b681144-92a4-442f-abf8-411dbc7bfd9d',
        'cluster': true,
        'clusterMaxZoom': 14, // Max zoom to cluster points on
        'clusterRadius': 25 // Radius of each cluster when clustering points (defaults to 50)
      })

      // map.addSource('counties', {
      //   'type': 'geojson',
      //   'data': 'https://opendata.arcgis.com/datasets/53ca7db14b8f4a9193c1883247886459_67.geojson'
      // })

      map.addSource('labs', {
        'type': 'geojson',
        'data': 'https://firebasestorage.googleapis.com/v0/b/waterwatch-cb707.appspot.com/o/labs.geojson?alt=media&token=7690b36f-cdca-43cd-888e-e2bda25b06a8'
      })
// MAP LAYERS
      // COLLECTION SITES //
      map.addLayer({
        'id': 'Collection Sites Layer',
        'type': 'circle',
        'source': 'sites',
        'paint': {
          'circle-color': '#50869E',
          'circle-radius': {
            'property': 'point_count',
            'type': 'interval',
            'stops': [
              [0, 10],
              [15, 15],
              [30, 20]
            ]
          }
        },
        'properties': {
          'description': 'points!'
        }
      })

      map.addLayer({
        'id': 'site-clicked',
        'type': 'circle',
        'source': 'sites',
        'paint': {
          'circle-color': '#7FBA00',
          'circle-radius': 12
        },
        'filter': ['in', 'Name', '']
      })

      // Cluster labels //
      map.addLayer({
        'id': 'sites-count',
        'type': 'symbol',
        'source': 'sites',
        'filter': ['has', 'point_count'],
        'layout': {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        },
        'paint': {
          'text-color': '#FFFFFF'
        }
      })

      map.loadImage('/static/icon-star.png', function (error, image) {
        if (error) throw error
        map.addImage('star', image)
        map.addLayer({
          'id': 'Labs',
          'type': 'symbol',
          'source': 'labs',
          'layout': {
            'icon-image': 'star',
            'icon-size': 0.8
          },
          'paint': {
            'icon-color': '#FDF1BF'
          }
        })
      })

      // BASIN
      map.addLayer({
        'id': 'Basin Layer',
        'type': 'fill',
        'source': 'basin',
        'layout': {},
        'paint': {
          'fill-outline-color': 'rgba(7, 78, 112, 1)',
          'fill-color': 'rgba(80, 134, 158, 0.1)'
        },
        'properties': {
          'description': 'Chattahoochee River Basin'
        }
      })
    })

    // Pop up //
    map.on('click', 'Collection Sites Layer', (e) => {
      var name = e.features[0].properties.Name
      this.selectSiteCallback(name)
      this.makeItGreen(name)
    })
    // Labs popup //
    map.on('click', 'Labs', function (e) {
      new window.mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.Lab)
            .addTo(map)
    })

    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'Labs', function () {
      map.getCanvas().style.cursor = 'pointer'
    })

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'Labs', function () {
      map.getCanvas().style.cursor = ''
    })

    map.on('mouseenter', 'Collection Sites Layer', function () {
      map.getCanvas().style.cursor = 'pointer'
    })

    map.on('mouseleave', 'Collection Sites Layer', function () {
      map.getCanvas().style.cursor = ''
    })

    map.on('mouseenter', 'sites-count', function () {
      map.getCanvas().style.cursor = 'pointer'
    })

    map.on('mouseleave', 'sites-count', function () {
      map.getCanvas().style.cursor = ''
    })

    // Add zoom and rotation controls to the map. //
    var zoomBtn = document.createElement('button')
    zoomBtn.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-fullextent'
    zoomBtn.type = 'button'
    zoomBtn.setAttribute('aria-label', 'zoom to full extent')
    zoomBtn.onclick = function () {
      map.flyTo({center: [-84.057249, 33.15888], zoom: 6.5})
    }

    var zoomContainer = document.getElementById('zoomContainer')
    zoomContainer.appendChild(zoomBtn)

    map.addControl(new window.MapboxGeocoder({
      accessToken: window.mapboxgl.accessToken,
      placeholder: 'Search Address'
    }))
    map.addControl(new window.mapboxgl.FullscreenControl(), 'bottom-right')
    map.addControl(new window.mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }), 'bottom-right')
    map.addControl(new window.mapboxgl.NavigationControl(), 'bottom-right')
    this.map = map
  }

  resizeMap () {
    setTimeout(() => this.map.resize(), 500)
  }

  zoomIn (selectedSite) {
    this.makeItGreen(selectedSite.stationName)
    var latLong = [selectedSite.longitude, selectedSite.latitude]
    this.map.flyTo({
      center: latLong,
      zoom: 13
    })
  }

  makeItGreen (name) {
    this.map.setFilter('site-clicked', ['in', 'Name', name])
  }
}

