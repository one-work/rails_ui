import AntvBaseController from './base'

export default class extends AntvBaseController {

  connect() {
    super.connect()
    this.chart.options({
      theme: 'classic',
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
