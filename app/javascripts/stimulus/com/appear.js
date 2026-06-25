import BaseController from '../base_controller'

export default class extends BaseController {

  connect() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.post('/auth/board/user/autonym_wait')
      }
    }, { once: true })
  }

}
