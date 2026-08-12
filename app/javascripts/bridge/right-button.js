import { BridgeComponent } from '@hotwired/hotwire-native-bridge'

export default class extends BridgeComponent {
  static component = 'right-button'
  static targets = ['submit']

  connect() {
    super.connect()
    this.notifyBridgeOfConnect()
  }

  notifyBridgeOfConnect() {
    const title = this.element.dataset.title

    this.send('connect', { title }, () => {
      this.element.click()
    })
  }
}
