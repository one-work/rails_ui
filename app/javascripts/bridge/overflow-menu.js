import { BridgeComponent } from '@hotwired/hotwire-native-bridge'

export default class extends BridgeComponent {
  static component = 'overflow-menu'

  connect() {
    super.connect()
    this.notifyBridgeOfConnect()
  }

  notifyBridgeOfConnect() {
    const label = ''
    this.send('connect', { label }, (msg) => {
      console.debug('浮动菜单连接', msg)
      window.xx = this
    })
  }
}
