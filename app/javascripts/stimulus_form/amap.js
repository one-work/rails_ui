import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['container']
  static values = {
    key: String
  }

  connect() {
    window._AMapSecurityConfig = {
      securityJsCode: '「你申请的安全密钥」'
    }
    this.#initMap()
  }

  #initMap() {
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
      const map = new AMap.Map(this.containerTarget)
      map.addControl(new AMap.Scale())


      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 10000,
        offset: [10, 20],
        zoomToAccuracy: true,
        position: 'RB'
      })

      geolocation.getCurrentPosition((status, result) => {
        window.xx = result
        const marker = new AMap.Marker({
          map: map,
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          draggable: true,
          position: [
            result.position.lat,
            result.location.lng
          ]
        })
      })


    }).catch(e => {
      console.error(e)
    })
  }

}