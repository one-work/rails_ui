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
    const el = e.currentTarget
    const checkBox = document.getElementById(el.dataset.id)
    if (checkBox) {
      el.parentNode.remove()
      checkBox.checked = false
    }

    const submit = document.getElementById('order_form_submit')
    if (submit && submit.form.elements.length <= 2) {
      submit.disabled = true
    }
  }

  get checked() {
    return Array.from(this.formTarget.elements).filter(el => el.checked)
  }

}
