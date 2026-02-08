import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            alert('你回来了')
          }
        }, { once: true })
      }
    }, { once: true })
  }

}
