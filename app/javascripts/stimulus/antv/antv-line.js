import AntvBaseController from './antv-base'

export default class extends AntvBaseController {

  connect() {
    super.connect()
    this.chart.options({
      type: 'line',
      encode: {
        x: 'title',
        y: 'value',
        shape: 'smooth'
      },
      axis: {
        y: {
          title: false,
          labelFormatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)
        }
      },
      labels: [
        {
          text: 'value',
          style: { dx: -10, dy: -12 }
        }
      ]
    })

    this.chart.render()
  }

}
