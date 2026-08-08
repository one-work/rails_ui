import { BridgeComponent } from '@hotwired/hotwire-native-bridge'
import { PrintCommand } from 'xcprinter'

export default class extends BridgeComponent {
  static component = 'bluetooth'
  static targets = ['list']
  static values = {
    template: { type: String, default: 'bluetooth-item' },
    init: { type: Boolean, default: false }
  }

  connect() {
    super.connect()
    this.notifyBridgeOfConnect()
  }

  notifyBridgeOfConnect() {
    this.send('connect', {}, (message) => {
      console.debug('蓝牙组件就绪', message)
      const data = message.data

      if (data.address) {
        this.element.dataset.add('address', data.address)
        this.element.dataset.add('name', data.name)

        if (this.hasListTarget) {
          const item = this.listTarget.querySelector(`[data-address='${data.address}']`) || this.renderDevice(data)

          if (item) {
            if (data.state) {
              this.#activeItem(item, data.state)
            } else {
              if (data.ready) {
                this.#doConnect(item)
              }
            }
          }
        } else if (this.hasInitValue) {
          console.debug('发起初始连接！')
          this.send('connect_device', { address: data.address, name: data.name }, (msg) => {
            console.debug('初始连接结果：', msg)
          })
        }
      }
    })
  }

  // 搜索蓝牙设备
  search(e) {
    const item = e.currentTarget
    this.listTarget.classList.add('bluetooth-list')
    item.dataset.action = 'click->bridge-bluetooth#hide'

    const id = this.send('search', {}, (msg) => {
      console.debug(id, msg)
      if (this.listTarget.classList.contains('bluetooth-list')) {
        this.renderDevice(msg.data.device)
      }
    })
    this.listTarget.dataset.add('id', id)
  }

  hide(e) {
    const item = e.currentTarget
    item.dataset.action = 'click->bridge-bluetooth#search'
    this.listTarget.classList.remove('bluetooth-list')
    this.listTarget.querySelectorAll('[data-action="click->bridge-bluetooth#connectDevice"]').forEach(el => {
      el.remove()
    })
  }

  connectDevice(event) {
    const item = event.currentTarget
    this.#doConnect(item)
  }

  #doConnect(item) {
    console.debug('发起主动连接！')
    item.querySelector('.media-right').innerText = '开始连接'
    const name = item.querySelector('span').innerText
    this.send('connect_device', { address: item.dataset.address, name: name }, (msg) => {
      console.debug('主动连接结果：', msg)
      const data = msg.data

      if (data.success) {
        this.#disconnectOther()
        this.#activeItem(item, 'connected')

        this.element.dataset.add('address', data.address)
        this.element.dataset.add('name', data.name)
      } else {
        item.querySelector('.media-right').innerText = '连接失败'
      }
    })
  }

  #disconnectOther() {
    this.listTarget.querySelectorAll('.background-light').forEach(el => {
      this.#inactiveItem(el)
    })
  }

  disconnectDevice(event) {
    const item = event.currentTarget
    this.send('disconnect_device', { address: item.dataset.address }, (msg) => {
      console.debug('断开连接', msg)
      if (msg.data.success) {
        this.#inactiveItem(item)
      }
    })
  }

  // 打印
  print(arr) {
    const address = this.element.dataset.address
    const name = this.element.dataset.name
    this.send('connect_device', { address: address, name: name }, (msg) => {
      console.debug('打印时主动连接', msg.data)
      if (msg.data.success) {
        this.send('send_data', { address: address, data: arr }, (result) => {
          console.debug('打印结果：', result)
        })
      }
    })
  }

  printData(e) {
    const item = e.currentTarget
    const arr = item.dataset.content.split(',').map(i => parseInt(i, 16))
    this.print(arr)
  }

  // 打印自测页
  selfTest() {
    this.print([0x12, 0x54])
  }

  setWifi(e) {
    const item = e.currentTarget
    const ssid = item.parentNode.querySelector('[name=ssid]').value
    const password = item.parentNode.querySelector('[name=password]').value

    const pos = new PrintCommand()
    const data = pos.setWifi(ssid, password)
    this.print(data)
  }

  renderDevice(device) {
    const template = document.getElementById(this.templateValue)
    if (!template) { return }

    const fragment = template.content.cloneNode(true)
    const item = fragment.querySelector('.media')
    item.dataset.add('address', device.address)
    const content = fragment.querySelector('span')
    content.innerText = device.name

    this.listTarget.appendChild(fragment)
    return item
  }

  #activeItem(item, state) {
    let text
    if (state === 'connecting') {
      text = '连接中'
    } else if (state === 'connected') {
      text = '已连接'
    } else {
      text = state
    }

    item.dataset.action = 'click->bridge-bluetooth#disconnectDevice'
    item.classList.add('background-light')
    item.querySelector('.media-right').innerText = text
  }

  #inactiveItem(item) {
    item.dataset.action = 'click->bridge-bluetooth#connectDevice'
    item.classList.remove('background-light')
    item.querySelector('.media-right').innerText = ''
  }
}
