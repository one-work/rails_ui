import BaseController from '../base_controller'

export default class extends BaseController {

  connect() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            alert('你回来了')
            this.get('/appear')
          }
        }, { once: true })
      }
    }, { once: true })
  }

}
