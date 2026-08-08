import { Controller } from '@hotwired/stimulus'
import { PrintPOS, PrintCommand } from 'xcprinter'

export default class extends Controller {
  static targets = ['button']
  static values = {
    body: { type: Boolean, default: false },
    button: String
  }

  connect() {
    this.bluetoothItem.dataset.add('controller', 'bridge-bluetooth')
    this.element.dataset.add('controller', 'bridge-overflow-menu')

    this.print = this.print.bind(this)
    if (this.hasButtonValue) {
      const button = document.getElementById(this.buttonValue)
      button.addEventListener('click', this.print)
    } else if (this.hasButtonTarget) {
      this.buttonTarget.addEventListener('click', this.print)
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

    const bluetoothPrinter = application.getControllerForElementAndIdentifier(this.bluetoothItem, 'bridge-bluetooth')
    window.bluetoothPrinter = bluetoothPrinter
    bluetoothPrinter.print(data)
  }

  get bluetoothItem() {
    if (this.bodyValue) {
      return this.element
    } else  {
      return document.body
    }
  }

}
