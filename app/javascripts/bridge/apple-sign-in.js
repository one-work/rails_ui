import { BridgeComponent } from '@hotwired/hotwire-native-bridge'
import { post } from '@rails/request.js'

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

      post(
        'auth/apple',
        {
          body: JSON.stringify(data),
          responseKind: 'turbo-stream'
        }
      )
    })
  }
}
