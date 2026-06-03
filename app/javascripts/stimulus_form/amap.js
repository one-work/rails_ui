import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['container', 'input', 'address']
  static values = {
    key: String,
    code: String,
    geo: Object,
    auto: { type: Boolean, default: true }
  }

  connect() {
    window._AMapSecurityConfig = {
      securityJsCode: this.codeValue
    }
    if (this.autoValue) {
      this.loadAMap()
    }
  }

  loadAMap() {
    AMapLoader.load({
      key: this.keyValue,
      version: '2.0',
      plugins: [
        'AMap.Scale',
        'AMap.ToolBar', // 显示缩放控件
        'AMap.Geolocation',
        'AMap.AutoComplete',
        'AMap.PlaceSearch',
        'AMap.Geocoder'
      ],
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
        offset: [18, 86],
        zoomToAccuracy: true,
        position: 'RB'
      })

      geolocation.getCurrentPosition((status, result) => {
        if (result.status === 0) {
          alert(result.position[0])
          this.#initMap(AMap, geolocation, result.position[0], result.position[1])
        } else if (this.hasGeoValue) {
          this.#initMap(AMap, geolocation, this.geoValue.lng, this.geoValue.lat)
        } else {
          this.#initMap(AMap, geolocation, 116.307484, 39.984120)
        }
      })
    }).catch(e => {
      console.error(e)
    })
  }

  #initMap(AMap, geolocation, lng, lat) {
    const map = new AMap.Map(
      this.containerTarget,
      {
        resizeEnable: true,
        zoom: 17.2,
        center: [lng, lat]
      }
    )
    map.addControl(new AMap.ToolBar())
    map.addControl(new AMap.Scale())
    map.addControl(geolocation)

    const auto = new AMap.AutoComplete({
      input: 'tipinput'
    })
    const placeSearch = new AMap.PlaceSearch({
      map: map
    })
    auto.on('select', e => {
      placeSearch.setCity(e.poi.adcode)
      placeSearch.search(e.poi.name)

      this.#setMarker(AMap, map, e.poi.location.lng, e.poi.location.lat)
    })
  }

  #setMarker(AMap, map, lng, lat) {
    const geocoder = new AMap.Geocoder({
      radius: 10000
    })
    window.geocoder = geocoder

    const marker = new AMap.Marker({
      map: map,
      icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
      draggable: true,
      position: [lng, lat]
    })
    marker.on('dragend', e => {
      const lnglat = [e.lnglat.lng, e.lnglat.lat]
      if (this.hasInputTarget) {
        this.inputTarget.value = `POINT (${e.lnglat.lng} ${e.lnglat.lat})`
      }
      geocoder.getAddress(lnglat, (status, result) => {
        if (this.hasAddressTarget) {
          this.addressTarget.value = result.regeocode.formattedAddress
        }
      })
    })
  }

}