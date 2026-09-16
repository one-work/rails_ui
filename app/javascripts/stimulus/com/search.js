import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['input', 'cancel', 'filter']

  connect() {
    if (this.hasInputTarget && this.inputTarget.value.length > 0) {

      if (this.hasCancelTarget) {
        this.cancelTarget.classList.remove('display-none')
      }

      if (this.hasFilterTarget) {
        this.filterTarget.classList.add('display-none')
      }
    }

    if (this.hasCancelTarget) {
      this.cancelTarget.addEventListener('click', this.cancel)
    }
    this.element.dataset.remove('controller', this.identifier)
  }

  clear() {
    this.inputTarget.value = ''
    this.inputTarget.focus()
  }

  cancel(e) {
    Turbo.visit(location.pathname, { action: 'replace' })

    const el = e.currentTarget
    el.classList.add('display-none')
    this.inputTarget.blur()
  }

}
