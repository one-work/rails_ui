import { Controller } from '@hotwired/stimulus'
import dayjs from 'dayjs'
window.dayjs = dayjs
const FORMAT = {
  human: 'YYYY-MM-DD HH:mm:ss'
}
const PRESETS = {
  DATE_SHORT: { dateStyle: 'short' },
  DATE_MED: { dateStyle: 'medium' },
  DATE_MED_WITH_WEEKDAY: { dateStyle: 'full' },
  DATE_FULL: { dateStyle: 'full' },
  DATE_HUGE: { dateStyle: 'full' },
  TIME_SIMPLE: { timeStyle: 'short' },
  TIME_WITH_SECONDS: { timeStyle: 'medium' },
  TIME_WITH_SHORT_OFFSET: { timeStyle: 'long' },
  DATETIME_SHORT: { dateStyle: 'short', timeStyle: 'short' },
  DATETIME_MED: { dateStyle: 'medium', timeStyle: 'short' },
  DATETIME_FULL: { dateStyle: 'full', timeStyle: 'long' },
  DATETIME_HUGE: { dateStyle: 'full', timeStyle: 'long' },
  xx: {
    timeZone: 'Asia/Shanghai',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }
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
      const time = dayjs(this.str)
      if (this.hasLocaleValue) {
        const options = PRESETS[this.localeValue] || { dateStyle: 'medium', timeStyle: 'short' }
        this.element.innerText = new Intl.DateTimeFormat(undefined, options).format(time.toDate())
      } else {
        this.element.innerText = time.format(this.format)
      }
      this.localizedValue = true
      this.element.dataset.remove('controller', 'time') // 非常重要，解决 morph 更新问题
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

  // human => 'YYYY-MM-DD HH:mm:ss'
  get format() {
    let fmt = this.element.dataset['format']
    if (fmt === 'human') {
      return FORMAT.human
    } else {
      return fmt || 'YYYY-MM-DD HH:mm'
    }
  }
}