import { BridgeComponent } from '@hotwired/hotwire-native-bridge'

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
      window.xx = message
      const data = message.data

      if (data.address) {
        this.element.dataset.add('address', data.address)
        this.element.dataset.add('name', data.name)

        if (this.hasListTarget) {
          this.renderDeviceActive(data)
        } else if (this.hasInitValue) {
          this.send('connect_device', { address: data.address, name: data.name }, (msg) => {
            console.debug('初始自动连接', msg)
          })
        }
      }
    })
  }

  // 搜索蓝牙设备
  search() {
    this.send('search', {}, (msg) => {
      console.debug(msg)
      this.renderDevice(msg.data.device)
    })
  }

  connectDevice(event) {
    const item = event.currentTarget
    this.#doConnect(item)
  }

  #doConnect(item) {
    const name = item.querySelector('.media-content').innerText
    this.send('connect_device', { address: item.dataset.address, name: name }, (msg) => {
      console.debug('主动连接', msg)
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

  renderDeviceActive(device) {
    const item = this.renderDevice(device)

    if (item) {
      if (device.state === 'connected') {
        this.#activeItem(item, device.state)
      } else if (device.state === 'connecting') {
        this.#activeItem(item, device.state)
      } else {
        this.#doConnect(item)
      }
    }
  }

  renderDevice(device) {
    const template = document.getElementById(this.templateValue)
    if (!template) { return }

    const fragment = template.content.cloneNode(true)
    const item = fragment.querySelector('.media')
    item.dataset.add('address', device.address)
    const content = fragment.querySelector('.media-content')
    content.innerText = device.name

    this.listTarget.appendChild(fragment)
    return item
  }

  #activeItem(item, state) {
    let text = '已连接'
    if (state === 'connecting') {
      text = '连接中'
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
