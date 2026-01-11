import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    template: { type: String, default: 'template_tr_action' },
    data: Array
  }

  connect() {
    const template = document.getElementById(this.templateValue)
    const td = document.createElement('td')

    this.dataValue.forEach(item => {
      const fragment = template.content.cloneNode(true)
      const form = fragment.querySelector('form')
      form.action = item.action

      const button = fragment.querySelector('button')
      button.ariaLabel = item.title

      const use = fragment.querySelector('use')
      use.setAttribute('href', `${use.href.baseVal}#${item.icon}`)

      td.appendChild(fragment)
    })

    this.element.appendChild(td)
  }

}