import AntvBaseController from './antv-base'

export default class extends AntvBaseController {
  static values = {
    data: { type: Array, default: [] }
  }

  connect() {
    super.connect()
    this.chart.options({
      theme: 'classic',
      data: this.dataValue
    })
    this.chart.type = 'interval'
    this.chart.encode({
      y: 'value',
      color: 'category'
    })
    this.chart.render()
  }

}
