import BaseController from '../base_controller'

export default class extends BaseController {
  static values = {
    redirect: Boolean,
    assign: Boolean
  }

  connect() {
    if (this.hasRedirectValue) {
      this.redirect()
    } else if (this.hasUrlValue) {
      this.url()
    } else if (this.hasAssignValue) {
      this.assign()
    }
  }

  url() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const crd = pos.coords;
        console.debug(crd)
        this.patch(this.urlValue, JSON.stringify(crd))
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

  redirect() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const crd = pos.coords;
        console.debug(crd)
        const url = new URL(location.href)
        url.searchParams.delete('auth_token') // 将 auth Token 逻辑交还给默认逻辑
        url.searchParams.set('latitude', crd.latitude)
        url.searchParams.set('longitude', crd.longitude)
        Turbo.visit(url)
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
