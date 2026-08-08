import { Controller } from '@hotwired/stimulus'
import { PrintPOS, PrintCommand } from 'xcprinter'

export default class extends Controller {
  static values = {
    body: { type: Boolean, default: false },
    button: String
  }

  connect() {
    this.element.dataset.add('controller', 'bridge-bluetooth')
    this.element.dataset.add('controller', 'bridge-overflow-menu')

    const button = document.getElementById(this.element.dataset.buttonId)
    if (button) {
      button.disabled = true
      this.print = this.print.bind(this)
      button.addEventListener('click', this.print)
    }
  }

  print() {
    const arr = []
    this.element.querySelectorAll('[data-print]').forEach(item => {
      arr.push([item.dataset.print, item.innerText])
    })

    const pos = new PrintPOS()
    arr.forEach(item => {
      pos[item[0]](item[1])
    })
    const data = pos.render()
    console.debug('打印数据：', data)
    bluetoothPrinter.print(data)
  }

  get bluetoothPrinter() {
    const bluetoothPrinter = application.getControllerForElementAndIdentifier(this.element, 'bridge-bluetooth')
    window.bluetoothPrinter = bluetoothPrinter
    return bluetoothPrinter
  }

}
