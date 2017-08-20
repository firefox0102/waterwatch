export class MapHelper {
  constructor () {
    console.log('constusadf')
    window.mapboxgl.accessToken = 'pk.eyJ1IjoibGNhY2VkYSIsImEiOiIzNmM4MGRlN2I4NDhiY2UxZjA4MmJjZjE5OWEzYjUzNSJ9.Wc5KTJpWxmpxVMZfcuEQNg'
    var map = new window.mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/light-v9', // hosted style id
      center: [-84.387249, 33.755788], // starting position
      zoom: 8 // starting zoom
    })

    // MAP LAYERS //
    map.on('load', function () {
      // CHATTAHOOCHEE RIVER BASIN//
      map.addSource('basin', {
        'type': 'geojson',
        'data': 'https://s3.amazonaws.com/waterwatchcrk/Chatt_River_Basin.geojson'
      })
      map.addSource('sites', {
        'type': 'geojson',
        'data': 'https://s3.amazonaws.com/waterwatchcrk/initial_points.geojson',
        'cluster': true,
        'clusterMaxZoom': 14, // Max zoom to cluster points on
        'clusterRadius': 50 // Radius of each cluster when clustering points (defaults to 50)
      })

      map.addLayer({
        'id': 'Basin',
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
      // COUNTIES //
      map.addLayer({
        'id': 'Counties',
        'type': 'fill',
        'source': {
          'type': 'geojson',
          'data': 'https://opendata.arcgis.com/datasets/53ca7db14b8f4a9193c1883247886459_67.geojson'
        },
        'layout': {
          'visibility': 'none'
        },
        'paint': {
          'fill-outline-color': 'rgba(7, 78, 112, 1)',
          'fill-color': 'rgba(7, 78, 112, 0)'
        }
        // This is the important part of this example: the addLayer
        // method takes 2 arguments: the layer as an object, and a string
        // representing another layer's name. if the other layer
        // exists in the stylesheet already, the new layer will be positioned
        // right before that layer in the stack, making it possible to put
        // 'overlays' anywhere in the layer stack.
      }, 'place_label_city_small_s')

      // COLLECTION SITES //
      map.addLayer({
        'id': 'Sites',
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
        'layout': {},
        'properties': {
          'description': 'points!'
        }
      })
    })

    // // Cluster labels //
    // map.addLayer({
    //   'id': 'sites-count',
    //   'type': 'symbol',
    //   'source': 'sites',
    //   'filter': ['has', 'point_count'],
    //   'layout': {
    //     'text-field': '{point_count_abbreviated}',
    //     'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    //     'text-size': 12,
    //     'color': '#ee3311'
    //   }
    // })

    // map.addLayer({
    //   'id': 'unclustered-sites',
    //   'type': 'circle',
    //   'source': 'sites',
    //   'filter': ['!has', 'point-count'],
    //   'paint': {
    //     'circle-color': '#50869E',
    //     'circle-radius': 4,
    //     'circle-stroke-width': 1,
    //     'circle-stroke-color': '#fff'
    //   }
    // })

    // MENU TOGGLE//
    var toggleableLayerIds = ['Basin', 'Counties', 'Sites']

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
    // map.on('click', 'Sites', function (e) {
    //   new mapboxgl.Popup()
    //     .setLngLat(e.features[0].geometry.coordinates)
    //     .setHTML(e.features[0].properties.description)
    //     .addTo(map)
    // })
    //  // Change the cursor to a pointer when the mouse is over the places layer.
    // map.on('mouseenter', 'places', function () {
    //   map.getCanvas().style.cursor = 'pointer'
    // })

    // // Change it back to a pointer when it leaves.
    // map.on('mouseleave', 'places', function () {
    //   map.getCanvas().style.cursor = ''
    // })

    // Add zoom and rotation controls to the map. //
    map.addControl(new window.MapboxGeocoder({
      accessToken: window.mapboxgl.accessToken
    }))
    map.addControl(new window.mapboxgl.NavigationControl())
    map.addControl(new window.mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }))
    map.addControl(new window.mapboxgl.FullscreenControl())
  }
}
