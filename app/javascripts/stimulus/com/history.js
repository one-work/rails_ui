import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  back() {
    history.back()
  }

  root() {
    if (history.state.turbo) {
      history.go(-(history.state.turbo.restorationIndex + 1))
    }
  }

}
