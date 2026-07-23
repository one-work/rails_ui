import { Controller } from '@hotwired/stimulus'
import { PrintPOS } from 'xcprinter'

export default class extends Controller {

  print() {
    const hash = {}
    this.element.querySelectorAll('[data-print]').forEach(item => {
      hash[item.dataset.print] = item.innerText
    })

    window.xx = hash
  }

}
