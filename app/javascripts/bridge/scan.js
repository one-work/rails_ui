import { BridgeComponent } from '@hotwired/hotwire-native-bridge'

export default class extends BridgeComponent {
  static component = 'scan'
  static values = {
    form: String,
    params: Object
  }

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
        let url = this.element.dataset.reportUrl
        let body
        const formValue = this.element.dataset.scanFormValue
        if (formValue) {
          const form = document.getElementById(formValue)
          body = new FormData(form)
          url = form.action
        } else {
          body = new FormData()
        }
        if (this.hasParamsValue) {
          Object.keys(this.paramsValue).forEach(k => {
            body.append(k, this.paramsValue[k])
          })
        }
        body.append('result', value)

        fetch(url, {
          method: 'POST',
          body: body,
          headers: {
            Accept: 'text/vnd.turbo-stream.html',
            'X-CSRF-Token': utils.metaContent('csrf-token')
          }
        }).then(response => response.text()).then(body => Turbo.renderStreamMessage(body))
      }
    })
  }
}
