import { Controller } from '@hotwired/stimulus'
import { PrintPOS, PrintPic } from 'xcprinter'
import { FetchRequest } from '@rails/request.js'

export default class extends Controller {
  static targets = ['canvas']
  static values = {
    body: { type: Boolean, default: false },
    data: String,
    button: String
  }

  connect() {
    this.element.dataset.add('controller', 'bridge-bluetooth')
    this.element.dataset.add('controller', 'bridge-overflow-menu')

    const button = document.getElementById(this.element.dataset.buttonId)
    if (button) {
      button.dataset.enabled = 'off'
      button.dataset.oldValue = button.innerText
      button.innerText = '正在连接打印机'

      this.print = this.print.bind(this)
      button.addEventListener('click', this.print)
    } else if (this.hasDataValue) {
      this.printRaw()
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

  printRaw() {
    const arr = Uint8Array.fromBase64(this.dataValue)
    this.bluetoothPrinter.print(Array.from(arr))
  }

  print(e) {
    const button = e.currentTarget
    if (button.dataset.enabled === 'off') {
      this.#getConfig()
    } else {
      this.#doPrint(this.element)
    }
  }

  async #getConfig() {
    const request = new FetchRequest(
      'GET',
      'https://linlishenghuo.com/bluetooth/menus',
      {
        body: body,
        headers: headers,
        responseKind: 'turbo-stream'
      }
    )
    const response = await request.perform()
    if (response.statusCode >= 500) {
      alert('error')
    }
    return response
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
