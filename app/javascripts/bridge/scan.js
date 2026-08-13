import { BridgeComponent } from '@hotwired/hotwire-native-bridge'

export default class extends BridgeComponent {
  static component = 'scan'

  connect() {
    super.connect()
    this.element.disabled = false
    this.startScanning = this.startScanning.bind(this)
    this.element.addEventListener('click', this.startScanning)
  }

  disconnect() {
    this.element.removeEventListener('click', this.startScanning)
    super.disconnect()
  }

  startScanning() {
    this.send('start', {}, (message) => {
      console.debug('', message)
      const value = message.data.value
      if (value) {
      }
    })
  }
}
