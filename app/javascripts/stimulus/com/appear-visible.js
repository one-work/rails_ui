import BaseController from '../base_controller'

export default class extends BaseController {

  connect() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        console.debug('listen after hidden')
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            console.debug('reload after visible')
            Turbo.visit(location, {action: 'replace'})
          }
        }, { once: true })
      }
    }, { once: true })
  }

}

