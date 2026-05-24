import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const crd = pos.coords;
        alert(JSON.stringify(crd))
      },
      res => {
        alert(res)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    )
  }

}
