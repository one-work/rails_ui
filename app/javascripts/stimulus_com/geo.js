import BaseController from '../base_controller'

export default class extends BaseController {

  connect() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const crd = pos.coords;
        console.debug(crd)
        if (this.hasUrlValue) {
          this.patch(this.urlValue, JSON.stringify(crd))
        } else {
          const url = new URL(location.href)
          url.searchParams.set('latitude', crd.latitude)
          url.searchParams.set('longitude', crd.longitude)
          Turbo.visit(url)
        }
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
