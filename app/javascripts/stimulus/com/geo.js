import BaseController from '../base_controller'
import { post } from '@rails/request.js'

export default class extends BaseController {
  static values = {
    assign: Boolean
  }

  connect() {
    if (this.hasUrlValue) {
      this.url()
    } else if (this.hasAssignValue) {
      this.assign()
    }
  }

  url() {
    navigator.geolocation.getCurrentPosition(
      async pos => {
        const crd = pos.coords
        const url = new URL(location.href)
        url.searchParams.delete('auth_token') // 将 auth Token 逻辑交还给默认逻辑
        console.debug(crd)
        await post(
          this.urlValue,
          {
            body: JSON.stringify({ url: url, latitude: crd.latitude, longitude: crd.longitude }),
            responseKind: 'turbo-stream'
          }
        )
      },
      err => {
        alert(JSON.stringify(err))
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  }

  assign() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const crd = pos.coords;
        console.debug(crd)
        const latitude = document.getElementById('latitude')
        if (latitude) {
          latitude.value = crd.latitude
        }

        const longitude = document.getElementById('longitude')
        if (longitude) {
          longitude.value = crd.longitude
        }

        const geo = document.getElementById('geo')
        if (geo) {
          geo.value = `POINT (${crd.longitude} ${crd.latitude})`
        }

        this.element.innerText = `经度：${crd.longitude}\n纬度：${crd.latitude}`
      },
      err => {
        alert(JSON.stringify(err))
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  }

}
