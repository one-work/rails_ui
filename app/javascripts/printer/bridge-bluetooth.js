import { BridgeComponent } from '@hotwired/hotwire-native-bridge'

export default class extends BridgeComponent {
  static component = 'bluetooth'
  static targets = ['list']
  static values = {
    template: { type: String, default: 'bluetooth-item' }
  }

  connect() {
    super.connect()
    this.notifyBridgeOfConnect()
  }

  notifyBridgeOfConnect() {
    this.send('connect', {}, (data) => {
      this.connectedAddress = data.data.address
      this.element.dataset.add('address', data.data.address)
      console.debug('蓝牙组件已就绪', data)
    })
  }

  search() {
    this.send('search', {}, (data) => {
      console.log(data)
      this.renderDevices(data.data.device)
    })
  }

  connectDevice(event) {
    const item = event.currentTarget
    this.send('connect_device', { address: item.dataset.address }, (success) => {
      console.debug(success)
      if (success) {
        this.connectedAddress = item.dataset.address
        item.dataset.replace('action', 'click->bridge-bluetooth#disconnectDevice')
        item.parentNode.querySelector('.media-right').innerText = '已连接'
      }
    })
  }

  disconnectDevice(event) {
    const item = event.currentTarget
    this.send('disconnect_device', { address: item.dataset.address }, (success) => {
      console.debug(success)
      if (success) {
        this.connectedAddress = null
        item.dataset.replace('action', 'click->bridge-bluetooth#connectDevice')
        item.parentNode.querySelector('.media-right').innerText = '断开连接'
      }
    })
  }

  // 打印
  print(arr) {
    const address = this.element.dataset.address
    this.send('connect_device', { address: address }, (success) => {
      console.debug(success)
      if (success) {
        this.send('send_data', { address: address, data: arr }, (result) => {
          console.debug('打印结果：', result)
        })
      }
    })
  }

  // 打印自测页
  selfTest() {
    this.send('send_data', { address: this.connectedAddress, data: [0x12, 0x54] }, (result) => {
      console.debug('打印结果：', result)
    })
  }

  renderDevices(device) {
    const template = document.getElementById(this.templateValue)

    const fragment = template.content.cloneNode(true)
    const content = fragment.querySelector('.media-content')
    content.innerText = device.name
    content.dataset.add('address', device.address)

    this.listTarget.appendChild(fragment)
  }
}
