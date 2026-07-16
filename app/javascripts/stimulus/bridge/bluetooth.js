import { BridgeComponent, BridgeElement } from '@hotwired/hotwire-native-bridge'

export default class extends BridgeComponent {
  static component = 'bluetooth'

  connect() {
    super.connect()
    this.notifyBridgeOfConnect()
  }

  notifyBridgeOfConnect() {
    // 通知原生层蓝牙组件已连接
    this.send("connect", {}, () => {
      console.log("蓝牙组件已就绪")
    })
  }

  // 搜索蓝牙设备
  search() {
    this.send("search", {}, (devices) => {
      // 原生层返回设备列表后，渲染到页面
      this.renderDevices(devices)
    })
  }

  // 连接指定设备
  connectDevice(event) {
    const address = event.target.dataset.address
    this.send("connect_device", { address }, (success) => {
      if (success) {
        this.connectedAddress = address
        this.updateStatus("已连接")
      }
    })
  }

  // 发送数据
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
    const list = this.element.querySelector("#device-list")
    list.innerHTML = devices.map(d => `
      <div class="device-item">
        <span>${d.name || "未知设备"}</span>
        <span>${d.address}</span>
        <button data-action="click->bridge--bluetooth#connectDevice" 
                data-address="${d.address}">
          连接
        </button>
      </div>
    `).join("")
  }

  updateStatus(text) {
    this.element.querySelector("#status").textContent = text
  }
}
