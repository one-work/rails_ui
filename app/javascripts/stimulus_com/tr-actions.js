import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    template: { type: String, default: 'template_tr_action' },
    data: Array
  }

  connect() {
    const template = document.getElementById(this.templateValue)
    const td = document.createElement('td')
    const div = document.createElement('div')
    div.dataset.showTarget = 'item'
    div.classList.add('visibility-hidden')

    this.dataValue.forEach(item => {
      const fragment = template.content.cloneNode(true)
      const form = fragment.querySelector('form')
      form.action = item.action

      const button = fragment.querySelector('button')
      button.ariaLabel = item.title

      const use = fragment.querySelector('use')
      use.setAttribute('href', `${use.href.baseVal}#${item.icon}`)

      div.appendChild(fragment)
    })

    td.appendChild(div)
    this.element.appendChild(td)
  }

}