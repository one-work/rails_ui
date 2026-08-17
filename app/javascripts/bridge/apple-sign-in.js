import { BridgeComponent } from '@hotwired/hotwire-native-bridge'

export default class extends BridgeComponent {
  static component = 'apple-sign-in'
  static targets = ['login']

  connect() {
    super.connect()
  }

  disconnect() {
    super.disconnect()
  }

  signIn() {
    this.send('signIn', {}, (message) => {
      console.debug(message)
      const data = message.data || {}
      if (!data.success) {
        if (!data.cancelled) alert(data.error || "登录失败，请重试")
        return
      }

      const csrfToken = utils.metaContent('csrf-token')
      fetch('auth/apple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify(data)
      }).then(response => response.text()).then(body => Turbo.renderStreamMessage(body))
    })
  }
}
