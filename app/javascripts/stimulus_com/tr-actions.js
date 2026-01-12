import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    action: { type: String, default: 'template_tr_action' },
    link: { type: String, default: 'template_tr_link' },
    data: Array
  }

  connect() {
    const templateAction = document.getElementById(this.actionValue)
    const templateLink = document.getElementById(this.linkValue)
    const td = document.createElement('td')
    const div = document.createElement('div')
    div.dataset.showTarget = 'item'
    div.classList.add('visibility-hidden')

    this.dataValue.forEach(item => {
      if (item.action) {
        const fragment = templateAction.content.cloneNode(true)
        const form = fragment.querySelector('form')
        form.action = item.action

        const button = fragment.querySelector('button')
        button.ariaLabel = item.title

        this.#setIcon(fragment, item.icon)

        div.appendChild(fragment)
      } else {
        const fragment = templateLink.content.cloneNode(true)
        const a = fragment.querySelector('a')
        a.href = item.href

        const span = fragment.querySelector('span')
        span.innerText = item.title

        this.#setIcon(fragment, item.icon)
      }
    })

    td.appendChild(div)
    this.element.appendChild(td)
  }

  #setIcon(fragment, icon) {
    const use = fragment.querySelector('use')
    if (icon) {
      use.setAttribute('href', `${use.href.baseVal}#${icon}`)
    } else {
      use.parentNode.remove()
    }
  }

}