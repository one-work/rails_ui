import { Controller } from '@hotwired/stimulus'
import { Chart } from '@antv/g2'

export default class extends Controller {
  static values = {
    url: String,
    options: { type: Object, default: {} },
    data: { type: Array, default: [] }
  }

  connect() {
    this.chart = new Chart({
      container: this.element,
      autoFit: true
    })
    this.chart.options({
      type: 'interval',
      ...this.optionsValue
    })

    // 获取数据
    if (this.hasUrlValue) {
      const url = new URL(this.urlValue, location.origin)
      url.pathname = `${url.pathname}.json`
      this.chart.options({
        title: false,
        data: {
          type: 'fetch',
          value: url,
          format: 'json'
        }
      })
    } else if (this.hasDataValue) {
      this.chart.options({
        data: this.dataValue
      })
    }
  }

  disconnect() {
    this.chart.destroy()
  }
}