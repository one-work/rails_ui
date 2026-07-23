import { Controller } from '@hotwired/stimulus'
import { PrintPOS } from 'xcprinter'

export default class extends Controller {

  print() {
    const arr = []
    this.element.querySelectorAll('[data-print]').forEach(item => {
      arr.push([item.dataset.print, item.innerText])
    })

    window.xx = arr
  }

}
