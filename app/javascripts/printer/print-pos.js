import { Controller } from '@hotwired/stimulus'
import { PrintPOS, PrintPic } from 'xcprinter'

export default class extends Controller {
  static targets = ['canvas']
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

  printInner(e) {
    this.#doPrint(e.currentTarget)
  }

  printPic(event) {
    const input = event.currentTarget
    const file = input.files[0]
    if (file && file.type.startsWith('image/')) {
      if (this.hasCanvasTarget) {
        const src = URL.createObjectURL(file) // 创建一个object URL，并不是你的本地路径
        console.debug('链接', src)
        const pos = new PrintPOS()
        const pic = new PrintPic(1, new Image())
        pic.loadImageToCanvas(this.canvasTarget, src, res => {
          URL.revokeObjectURL(src) // 图片加载后，释放object URL
          console.log(res)
          pos.image(res.data, res.meta)
          this.bluetoothPrinter.print(pos.render())
        })
      }
      input.value = ''
    }
  }

  printData(e) {
    const item = e.currentTarget
    const arr = item.dataset.content.split(',').map(i => parseInt(i, 16))
    this.bluetoothPrinter.print(arr)
  }

  print() {
    this.#doPrint(this.element)
  }

  #doPrint(item) {
    const arr = []
    item.querySelectorAll('[data-print]').forEach(item => {
      arr.push([item.dataset.print, item.innerText])
    })

    const pos = new PrintPOS()
    arr.forEach(item => {
      pos[item[0]](item[1])
    })
    const data = pos.render()
    this.bluetoothPrinter.print(data)
  }

  get bluetoothPrinter() {
    const bluetoothPrinter = application.getControllerForElementAndIdentifier(this.element, 'bridge-bluetooth')
    window.bluetoothPrinter = bluetoothPrinter
    return bluetoothPrinter
  }

}
