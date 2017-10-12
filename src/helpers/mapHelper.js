export class MapHelper {
  constructor (selectSiteCallback) {
    this.selectSiteCallback = selectSiteCallback

    window.mapboxgl.accessToken = 'pk.eyJ1IjoibGNhY2VkYSIsImEiOiIzNmM4MGRlN2I4NDhiY2UxZjA4MmJjZjE5OWEzYjUzNSJ9.Wc5KTJpWxmpxVMZfcuEQNg'
    var map = new window.mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/light-v9', // hosted style id
      center: [-84.387249, 33.455788], // starting position
      zoom: 8 // starting zoom
    })

    // MAP LAYERS //
    map.on('load', function () {
      // CHATTAHOOCHEE RIVER BASIN//
// MAP SOURCES
      map.addSource('basin', {
        'type': 'geojson',
        'data': 'https://firebasestorage.googleapis.com/v0/b/waterwatch-cb707.appspot.com/o/Chatt_River_Basin.geojson?alt=media&token=88e79a45-47fb-4be3-90d8-abaeeed4d5f7'
      })

      map.addSource('sites', {
        'type': 'geojson',
        'data': 'https://firebasestorage.googleapis.com/v0/b/waterwatch-cb707.appspot.com/o/sites.geojson?alt=media&token=8b0b1d0f-a844-4dfb-b97f-37c5787dba51',
        'cluster': true,
        'clusterMaxZoom': 14, // Max zoom to cluster points on
        'clusterRadius': 25 // Radius of each cluster when clustering points (defaults to 50)
      })

      map.addSource('counties', {
        'type': 'geojson',
        'data': 'https://opendata.arcgis.com/datasets/53ca7db14b8f4a9193c1883247886459_67.geojson'
      })

      map.addSource('hucs', {
        'type': 'geojson',
        'data': 'https://firebasestorage.googleapis.com/v0/b/waterwatch-cb707.appspot.com/o/hucClip.geojson?alt=media&token=b6ecd28c-8235-45b5-b10b-56ac2b2a30a0'
        // 'data': 'https://opendata.arcgis.com/datasets/a2954c6f77f54a4eb97d25407209c72c_80.geojson'
      })

      // map.addSource('rivers', {
      //   'type': 'geojson',
      //   'data': 'https://opendata.arcgis.com/datasets/a2954c6f77f54a4eb97d25407209c72c_80.geojson'
      // })

// MAP LAYERS

      // COUNTIES //
      map.addLayer({
        'id': 'Counties Layer',
        'type': 'fill',
        'source': 'counties',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
          'fill-outline-color': 'rgba(7, 78, 112, 1)',
          'fill-color': 'rgba(7, 78, 112, 0)'
        }
      })
      // County labels //
      // map.addLayer({
      //   'id': 'Counties-label',
      //   'type': 'symbol',
      //   'source': 'counties',
      //   'filter': ['has', 'Label'],
      //   'text-field': '{Label}',
      //   'layout': {
      //     'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      //     'text-size': 12
      //   }
      // }, 'place_label_city_small_s')

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

    // // Cluster labels //
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

      // BASIN
      map.addLayer({
        'id': 'Basin Layer',
        'type': 'fill',
        'source': 'basin',
        'layout': {},
        'paint': {
          'fill-outline-color': 'rgba(7, 78, 112, 1)',
          'fill-color': 'rgba(80, 134, 158, 0.2)'
        },
        'properties': {
          'description': 'Chattahoochee River Basin'
        }
      })
      map.addLayer({
        'id': 'HUCs',
        'type': 'fill',
        'layout': {
          'visibility': 'none'
        },
        'source': 'hucs',
        'paint': {
          'fill-color': 'rgba(248, 219, 114, 0)',
          'fill-outline-color': 'rgba(190, 118, 48, 1)'
        },
        'properties': {
          'description': 'Hucs'
        }
      })
      // map.addLayer({
      //   'id': 'Rivers',
      //   'type': 'fill',
      //   'layout': {
      //     'visibility': 'none'
      //   },
      //   'source': 'rivers',
      //   'paint': {
      //     'fill-color': 'rgba(80, 134, 158, 0.2)'
      //     // 'fill-outline-color': 'rgba(190, 118, 48, 1)'
      //   },
      //   'properties': {
      //     'description': 'Hucs'
      //   }
      // })

      // map.addLayer({
      //   'id': 'sites-clicked',
      //   'type': 'circle',
      //   'source': 'sites',
      //   'paint': {
      //     'circle-color': '#81B822',
      //     'circle-radius': 5
      //   },
      //   'filter': ['==', 'name', '']
      // })

      map.addLayer({
        'id': 'sitesClicked',
        'type': 'circle',
        'source': 'sites',
        'paint': {
          'circle-color': '#ca0002',
          'circle-radius': 5
        },
        'filter': ['==', 'name', '']
      })
    })

    // MENU TOGGLE//
<<<<<<< HEAD
    var toggleableLayerIds = ['Basin Layer', 'Counties Layer', 'Collection Sites Layer']
=======
    var toggleableLayerIds = ['Basin', 'Counties', 'Sites', 'HUCs']
>>>>>>> 4f1f9d63215c0ede346f03eb4b9646d7f6425215

    for (var i = 0; i < toggleableLayerIds.length; i++) {
      var id = toggleableLayerIds[i]

      var link = document.createElement('a')
      link.href = '#'
      link.className = 'active'
      link.textContent = id

      link.onclick = function (e) {
        var clickedLayer = this.textContent
        e.preventDefault()
        e.stopPropagation()

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility')

        if (visibility === 'visible') {
          map.setLayoutProperty(clickedLayer, 'visibility', 'none')
          this.className = ''
        } else {
          this.className = 'active'
          map.setLayoutProperty(clickedLayer, 'visibility', 'visible')
        }
      }

      var layers = document.getElementById('menu')
      layers.appendChild(link)
    }

    // Pop up //
    map.on('click', 'Sites', (e) => {
      var name = e.features[0].properties.Name
      console.log(name)
      this.selectSiteCallback(name)
      // map.setFilter('sites-clicked', ['==', 'name', name])
      // if (this.sharedState.name.lnglat) {
      //   this.addMarker()
      // }
    })

    // var selectedSite = ['Sites', 'sitesClicked']
    // for (var n = 0; n < selectedSite.length; n++) {
    //   var cs = selectedSite[n]
    //   var green = document.createElement('e')
    //   green.href = '#'
    //   green.className = 'clicked'
    //   green.textContent = cs

    //   green.onclick = function (e) {
    //     var selectedSite = this.textContent
    //     e.preventDefault()
    //     e.stopPropagation()

    //     var name = map.getLayoutProperty(selectedSite, 'visibility')

    //     if (name === 'Name') {
    //       map.setLayoutProperty(selectedSite, 'visibility', 'visible')
    //       this.className = ''
    //     } else {
    //       this.className = 'notActive'
    //       map.setLayoutProperty(selectedSite, 'visibility', 'none')
    //     }
    //   }

    //   var site = document.getElementById('click')
    //   site.appendChild(green)
    // }

     // Change the cursor to a pointer when the mouse is over the places layer.
    // map.on('mouseenter', 'places', function () {
    //   map.getCanvas().style.cursor = 'pointer'
    // })

    // // Change it back to a pointer when it leaves.
    // map.on('mouseleave', 'places', function () {
    //   map.getCanvas().style.cursor = ''
    // })

    // Add zoom and rotation controls to the map. //
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
    var latLong = [selectedSite.longitude, selectedSite.latitude]
    this.map.flyTo({
      center: latLong,
      zoom: 17
    })
  }
}
