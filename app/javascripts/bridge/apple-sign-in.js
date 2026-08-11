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
      const data = message.data || {}
      if (!data.success) {
        if (!data.cancelled) alert(data.error || "登录失败，请重试")
        return
      }

      const csrfToken = document.querySelector('meta[name="csrf-token"]').content
      fetch("/apple_sign_ins", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRF-Token": csrfToken },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            Turbo.visit(result.redirect_to || "/", { action: "replace" })
          } else {
            alert(result.error || "登录失败，请重试")
          }
        })
    })
  }
}