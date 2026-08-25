import { Controller } from '@hotwired/stimulus'
import { PrintPOS, PrintPic, PrintCommand } from 'xcprinter'

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

  printInner(e) {
    this.#doPrint(e.currentTarget)
  }

  printPic(event) {
    const input = event.currentTarget
    const button = Array.from(input.form.elements).find(el =>
      el.type === 'submit' && el.name === 'commit'
    )
    input.disabled = true

    const pos = new PrintPOS()

    Array.from(input.files).forEach(file => {
      if (file.type.startsWith('image/')) {
        if (this.hasCanvasTarget) {
          const src = URL.createObjectURL(file) // 创建一个object URL，并不是你的本地路径

          pic.loadImageToCanvas(this.canvasTarget, src, res => {
            URL.revokeObjectURL(src) // 图片加载后，释放object URL
            console.log(res)

            const hiddenInput = document.createElement('input')
            hiddenInput.type = 'hidden'
            hiddenInput.name = input.name
            input.insertAdjacentElement('beforebegin', hiddenInput)

            const arr = pos.#image(res.data, res.meta)
            const x = new Uint8Array(arr)
            hiddenInput.value = x.toBase64()
          })
        }
      }
    })

    input.value = null
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
    console.debug('打印数据：', data)
    this.bluetoothPrinter.print(data)
  }

  get bluetoothPrinter() {
    const bluetoothPrinter = application.getControllerForElementAndIdentifier(this.element, 'bridge-bluetooth')
    window.bluetoothPrinter = bluetoothPrinter
    return bluetoothPrinter
  }

}
