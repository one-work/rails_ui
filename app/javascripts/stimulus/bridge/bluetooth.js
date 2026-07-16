import { BridgeComponent, BridgeElement } from '@hotwired/hotwire-native-bridge'

export default class extends BridgeComponent {
  static component = 'bluetooth'

  startScan() {
    const payload = {}

    // 向原生端发送消息，要求开始扫描
    this.send('scan', payload, message => {
      const selectedIndex = message.data.selectedIndex
    })
  }

}
