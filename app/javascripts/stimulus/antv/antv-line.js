import AntvBaseController from './antv-base'

export default class extends AntvBaseController {

  connect() {
    super.connect()
    this.chart.options({
      encode: {
        x: 'title',
        y: 'value'
      },
      axis: {
        y: {
          title: false,
          labelFormatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)
        }
      },
      children: [
        {
          type: 'line',
          encode: { shape: 'smooth' },
          labels: [
            {
              text: "value",
              style: { dx: -10, dy: -12 }
            }
          ]
        },
        {
          type: 'point',
          encode: { shape: 'point' },
          tooltip: false
        }
      ]
    })

    this.chart.render()
  }

}
