import { BridgeComponent } from '@hotwired/hotwire-native-bridge'

export default class extends BridgeComponent {
  static component = 'right-button'
  static targets = ['submit']

  connect() {
    super.connect()
    this.notifyBridgeOfConnect()
  }

  notifyBridgeOfConnect() {
    const element = this.bridgeElement
    const title = element.dataset.title

    this.send('connect', { title }, () => {
      this.element.click()
    })
  }
}
