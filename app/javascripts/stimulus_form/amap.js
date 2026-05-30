import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['container', 'input']
  static values = {
    key: String,
    geo: Object
  }

  connect() {
    window._AMapSecurityConfig = {
      securityJsCode: '「你申请的安全密钥」'
    }
    this.#loadAMap()
  }

  #loadAMap() {
    AMapLoader.load({
      key: this.keyValue,
      version: '2.0',
      plugins: ['AMap.Scale', 'AMap.Geolocation'],
      AMapUI: {
        version: '1.1',
        plugins: ['overlay/SimpleMarker']
      },
      Loca: {
        version: '2.0'
      }
    }).then(AMap => {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 1000, // 超时为 1s
        offset: [10, 20],
        zoomToAccuracy: true,
        position: 'RB'
      })

      geolocation.getCurrentPosition((status, result) => {
        window.xx = result
        this.initMapWithLocation(AMap)
      })
    }).catch(e => {
      console.error(e)
    })
  }

  initMapWithLocation(AMap) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const crd = pos.coords
        console.debug(crd)
        this.#initMap(AMap, crd.latitude, crd.longitude)
      },
      err => {
        console.error(err)
        if (this.hasGeoValue) {
          if (this.geoValue.lat && this.geoValue.lng) {
            this.#initMap(AMap, this.geoValue.lng, this.geoValue.lat)
          } else {
            this.#initMap(AMap, 116.307484, 39.984120)
          }
        } else {
          this.#initMap(AMap, 116.307484, 39.984120)
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  }

  #initMap(AMap, lng, lat) {
    const map = new AMap.Map(
      this.containerTarget,
      {
        zoom: 17.2,
        center: [lng, lat]
      }
    )
    map.addControl(new AMap.Scale())

    const marker = new AMap.Marker({
      map: map,
      icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
      draggable: true,
      position: [lng, lat]
    })
    marker.on('dragend', e => {
      if (this.hasInputTarget) {
        this.inputTarget.value = `POINT (${e.lnglat.lng} ${e.lnglat.lat})`
      }
    })
  }

}