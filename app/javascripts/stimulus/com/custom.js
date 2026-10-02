import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['tip']
  static values = {
    component: String
  }

  tip(e) {
    const input = e.currentTarget.control
    if (input.dataset.disabled === 'true' || input.disabled) {
      if (this.hasTipTarget) {
        this.tipTarget.classList.remove('display-none')
      }
    }
  }

  toggle(event) {
    const checkbox = event.currentTarget

    const componentId = checkbox.form.elements.namedItem('component_id')
    if (componentId && this.hasComponentValue) {
      componentId.value = this.componentValue
    }

    if (checkbox.dataset.disabled === 'true') {
    } else {
      checkbox.form.requestSubmit()
    }
  }

  submit(e) {
    e.currentTarget.form.requestSubmit()
  }
}
