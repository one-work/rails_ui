import { Controller } from '@hotwired/stimulus'
import { DateTime } from 'luxon'
window.DateTime = DateTime
const FORMAT = {
  human: 'yyyy-MM-dd HH:mm:ss'
}

// data-controller="time"
export default class extends Controller {
  static values = {
    localized: Boolean,
    locale: String
  }

  connect() {
    this.parse()
  }

  parse() {
    if (this.localizedValue) {
      return
    }

    if (this.str) {
      const time = DateTime.fromISO(this.str)
      if (this.hasLocaleValue) {
        this.element.innerText = time.toLocaleString(DateTime[this.localeValue])
      } else {
        this.element.innerText = time.toFormat(this.format)
      }
      this.localizedValue = true
    }
  }

  get str() {
    const value = this.element.dataset['value']
    if (value) {
      return value
    } else if (this.element.innerText.length > 0) {
      return this.element.innerText
    }
  }

  // xx => 'yyyy-MM-dd HH:mm:ss'
  get format() {
    let fmt = this.element.dataset['format']
    if (fmt === 'human') {
      return 'yyyy-MM-dd HH:mm:ss'
    } else {
      return fmt || 'yyyy-MM-dd HH:mm'
    }
  }

}
