import BaseController from '../base_controller'

export default class extends BaseController {
  static values = {
    url: { type: String, default: 'ship/board/users' }
  }

  connect() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const crd = pos.coords;
        console.debug(crd)
        this.patch(this.urlValue, JSON.stringify(crd))
      },
      res => {
        alert(res)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  }

}
