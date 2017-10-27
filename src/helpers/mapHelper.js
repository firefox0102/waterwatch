export class MapHelper {
  constructor (selectSiteCallback) {
    this.selectSiteCallback = selectSiteCallback

    window.mapboxgl.accessToken = 'pk.eyJ1IjoibGNhY2VkYSIsImEiOiIzNmM4MGRlN2I4NDhiY2UxZjA4MmJjZjE5OWEzYjUzNSJ9.Wc5KTJpWxmpxVMZfcuEQNg'
    var map = new window.mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/light-v9', // hosted style id
      center: [-84.057249, 33.15888], // starting position
      zoom: 6.5 // starting zoom
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
        'data': 'https://firebasestorage.googleapis.com/v0/b/waterwatch-cb707.appspot.com/o/sites.geojson?alt=media&token=9b681144-92a4-442f-abf8-411dbc7bfd9d',
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
        'data': 'https://firebasestorage.googleapis.com/v0/b/waterwatch-cb707.appspot.com/o/Georgia_huc12_clip.geojson?alt=media&token=4e4f7991-4a7f-4064-884a-f076bd96be79'
      })

      map.addSource('labs', {
        'type': 'geojson',
        'data': 'https://firebasestorage.googleapis.com/v0/b/waterwatch-cb707.appspot.com/o/labs.geojson?alt=media&token=f88dc7c8-9569-483f-a1fa-c6828fea8d4a'
      })

      // map.addSource('waterbodies', {
      //   'type': 'geojson',
      //   'data': 'https://firebasestorage.googleapis.com/v0/b/waterwatch-cb707.appspot.com/o/Georgia_Waterbodies_clip.geojson?alt=media&token=1f6ba878-757c-44e0-b226-a28c49a37cc5'
      // })
      // map.addSource('flowlines', {
      //   'type': 'geojson',
      //   'data': 'https://firebasestorage.googleapis.com/v0/b/waterwatch-cb707.appspot.com/o/Georgia_flowline_clip.geojson?alt=media&token=5edcc9f8-1d1d-480d-9dda-d813b75b8f21'
      // })
// MAP LAYERS
      // HUC-12 //
      map.addLayer({
        'id': 'Subwatersheds (HUC12)',
        'type': 'fill',
        // 'layout': {
        //   'visibility': 'none'
        // },
        'source': 'hucs',
        'paint': {
          'fill-color': 'rgba(248, 219, 114, 0)',
          'fill-outline-color': 'rgba(190, 118, 48, 1)'
        },
        'minzoom': 8,
        'properties': {
          'description': 'Hucs'
        }
      })
      // Waterbodies
      // map.addLayer({
      //   'id': 'Waterbodies Layer',
      //   'type': 'fill',
      //   'layout': {
      //     'visibility': 'none'
      //   },
      //   'source': 'waterbodies',
      //   'paint': {
      //     'fill-color': 'rgba(128,184,34,1)',
      //     'fill-outline-color': 'rgba(190, 118, 48, 0)'
      //   },
      //   'properties': {
      //     'description': 'Waterbodies'
      //   }
      // })
      // Flowlines
      // map.addLayer({
      //   'id': 'Flowlines Layer',
      //   'type': 'fill',
      //   'layout': {
      //     'visibility': 'none'
      //   },
      //   'source': 'flowlines',
      //   'paint': {
      //     'fill-color': 'rgba(80,134,158,0)',
      //     'fill-outline-color': 'rgba(80,134,158, 1)'
      //   },
      //   'properties': {
      //     'description': 'Flowlines'
      //   }
      // })
      // COUNTIES //
      // map.addLayer({
      //   'id': 'Counties Layer',
      //   'type': 'fill',
      //   'source': 'counties',
      //   'layout': {
      //     'visibility': 'none'
      //   },
      //   'paint': {
      //     'fill-outline-color': 'rgba(7, 78, 112, 1)',
      //     'fill-color': 'rgba(7, 78, 112, 0)'
      //   }
      // })

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

      // map.on('click', 'Labs', function (e) {
      //   new mapboxgl.Popup()
      //   .setLngLat(e.features[0].geometry.coordinates)
      //   .setHTML(e.features[0].properties.description)
      //   .addTo(map)
      // })

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
      console.log(name)
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

     // HUCS popup //
    map.on('click', 'Subwatersheds (HUC12)', function (e) {
      new window.mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.Name)
            .addTo(map)
    })

    map.on('mouseenter', 'Subwatersheds (HUC12)', function () {
      map.getCanvas().style.cursor = 'pointer'
    })

    map.on('mouseleave', 'Subwatersheds (HUC12)', function () {
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

    // MENU TOGGLE//
    // var toggleableLayerIds = ['Subwatersheds (HUC12)']

    // for (var i = 0; i < toggleableLayerIds.length; i++) {
    //   var id = toggleableLayerIds[i]

    //   var link = document.createElement('a')
    //   link.href = '#'
    //   link.className = 'active'
    //   link.textContent = id

    //   link.onclick = function (e) {
    //     var clickedLayer = this.textContent
    //     e.preventDefault()
    //     e.stopPropagation()

    //     var visibility = map.getLayoutProperty(clickedLayer, 'visibility')

    //     if (visibility === 'visible') {
    //       map.setLayoutProperty(clickedLayer, 'visibility', 'none')
    //       this.className = ''
    //     } else {
    //       this.className = 'active'
    //       map.setLayoutProperty(clickedLayer, 'visibility', 'visible')
    //     }
    //   }

    //   var layers = document.getElementById('menu')
    //   layers.appendChild(link)
    // }

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
      zoom: 17
    })
  }

  makeItGreen (name) {
    this.map.setFilter('site-clicked', ['in', 'Name', name])
  }
}
