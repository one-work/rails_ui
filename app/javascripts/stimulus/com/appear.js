import BaseController from '../base_controller'

export default class extends BaseController {

  connect() {
    if (this.hasUrlValue) {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          this.post(this.urlValue)
        }
      }, { once: true })
    }
  }

}
