export class MapHelper {
  constructor (mapContainer) {
    this.layerURL = 'pk.eyJ1IjoibGNhY2VkYSIsImEiOiIzNmM4MGRlN2I4NDhiY2UxZjA4MmJjZjE5OWEzYjUzNSJ9.Wc5KTJpWxmpxVMZfcuEQNg'

    this.mapContainer = mapContainer
    this.baseLayerMap = this.setLayer('base')
    this.basinLayerMap = this.setLayer('basin')
    this.labsLayerMap = this.setLayer('labs')
    this.sitesLayerMap = this.setLayer('sites')

    this.markersLayer = L.markerClusterGroup({
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: false,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true
    })

    this.Map = null
    this.arrayOfLatLngs = [,

    this.leaflet = windows.L
  }
}
