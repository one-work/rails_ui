import AntvBaseController from './antv-base'

export default class extends AntvBaseController {
  static values = {
    data: { type: Array, default: [] }
  }

  connect() {
    super.connect()
    this.chart.options({
      theme: 'classic',
      data: this.dataValue,
      type: 'interval',
      transform: [{ type: 'stackY' }],
      coordinate: { type: 'theta' },
      encode: {
        y: 'value',
        color: 'category'
      },
      legend: {
        color: {
          position: 'bottom',
          layout: {
            justifyContent: 'center'
          }
        }
      },
      labels: [
        {
          position: 'outside',
          text: (data) => `${data.category}: ${data.value}`
        }
      ],
      tooltip: {
        items: [
          (data) => ({
            name: data.category,
            value: data.value
          }),
        ]
      }
    })
    this.chart.render()
  }

}
