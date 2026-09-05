import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = { url: String }

  back() {
    if (history.length > 1) {
      history.back()
    } else if (this.hasUrlValue) {
      Turbo.visit(this.urlValue, { action: 'replace' })
    }
  }

  root() {
    if (history.state.turbo) {
      history.go(-history.state.turbo.restorationIndex)
    }
  }

}
