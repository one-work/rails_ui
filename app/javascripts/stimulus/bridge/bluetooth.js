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
    this.send('connect', {}, () => {
      console.log('蓝牙组件已就绪')
    })
  }

  search() {
    this.send('search', {}, (data) => {
      window.xx = data
      console.log(data)
      this.renderDevices(data.data.devices)
    })
  }

  connectDevice(event) {
    const address = event.target.dataset.address
    this.send('connect_device', { address }, (success) => {
      if (success) {
        this.connectedAddress = address
        this.updateStatus('已连接')
      }
    })
  }

  sendData() {
    const input = this.element.querySelector("input")
    const data = input.value

    if (!this.connectedAddress) {
      alert("请先连接设备")
      return
    }

    this.send("send_data", {
      address: this.connectedAddress,
      data: data
    }, (result) => {
      console.log("发送结果:", result)
    })
  }

  renderDevices(devices) {
    const template = document.getElementById(this.templateValue)
    devices.forEach(device => {
      const fragment = template.content.cloneNode(true)
      const form = fragment.querySelector('.media-content')
      form.innerText = device.name

      this.listTarget.appendChild(fragment)
    })
  }

  updateStatus(text) {
    this.element.querySelector("#status").textContent = text
  }
}
