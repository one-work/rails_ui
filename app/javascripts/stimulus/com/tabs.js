import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
    for (const el of this.element.children) {
      el.addEventListener('click', (e) => {
        const use = e.currentTarget.querySelector('use')
        const urls = use.href.baseVal.split('#')
        use.setAttribute('href', [urls[0], 'rotate-right'].join('#'))
        use.parentNode.classList.add('animate-clockwise')
      })
    }
  }

}
