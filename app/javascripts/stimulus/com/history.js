import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = { url: String }

  connect() {
    if (history.length <= 1) {
      if (this.element.classList.contains('is-link')) {
        this.element.classList.remove('is-link')
      } else if (this.element.children.length && this.element.children[0].tagName === 'svg') {
        this.element.children[0].remove()
      }
    }
  }

  back() {
    if (history.length > 1) {
      history.back()
    } else if (this.hasUrlValue) {
      Turbo.visit(this.urlValue, { action: 'replace' })
    }
  }

  direct() {
    if (this.hasUrlValue) {
      const index = sessionStorage.getItem(this.urlValue)
      const step = Turbo.session.history.currentIndex - index
      if (step) {
        history.go(-step)
      } else if (history.state.turbo) {
        history.go(-history.state.turbo.restorationIndex)
        Turbo.visit(this.urlValue)
      } else {
        Turbo.visit(this.urlValue)
      }
    }
  }

  root() {
    if (history.state.turbo) {
      history.go(-history.state.turbo.restorationIndex)
    }
  }

}
