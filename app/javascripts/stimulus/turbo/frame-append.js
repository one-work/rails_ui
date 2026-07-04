import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
    Array.from(this.element.children).forEach(el => {
      el.addEventListener('load', () => {
        document.head.appendChild(el)
      })
    })
    //this.element.remove()
  }

}
