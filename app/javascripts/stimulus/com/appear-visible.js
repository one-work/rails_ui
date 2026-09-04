import BaseController from '../base_controller'

export default class extends BaseController {

  connect() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        Turbo.visit(location, { action: 'replace' })
      }
    }, { once: true })
  }

}
