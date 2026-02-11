import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['price', 'form']
  static values = {
    seat: Object
  }

  choose(e) {
    const el = e.currentTarget
    const els = this.checked.map(i => i.parentNode.dataset.seatNo).join(',')
    if (this.hasPriceTarget) {
      this.priceTarget.innerText = els
    }
  }

  uncheck(e) {

  }

  get checked() {
    return Array.from(this.formTarget.elements).filter(el => el.checked)
  }

}
