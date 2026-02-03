import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['price']
  static values = {
    seat: Object
  }

  choose(e) {
    const el = e.currentTarget
    this.priceTarget.innerText = el.parentNode.dataset.seatNo
  }

}
