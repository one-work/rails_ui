import { Controller } from '@hotwired/stimulus'
import { PrintPOS } from 'xcprinter'

export default class extends Controller {

  connect() {
    this.element.dataset.add('controller', 'bridge-bluetooth')
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

    const bluetoothPrinter = application.getControllerForElementAndIdentifier(this.element, 'bridge-bluetooth')
    window.bluetoothPrinter = bluetoothPrinter
    bluetoothPrinter.print(data)
  }

}
