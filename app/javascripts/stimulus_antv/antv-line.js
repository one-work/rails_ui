import AntvBaseController from './antv-base'

export default class extends AntvBaseController {

  connect() {
    super.connect()
    this.chart.options({
      encode: {
        x: 'title',
        y: 'value'
      },
      children: [
        {
          type: 'line',
          labels: [{ text: "value", style: { dx: -10, dy: -12 } }]
        },
        {
          type: 'point',
          style: { fill: "white" },
          tooltip: false
        }
      ]
    })

    //this.chart.axis('y', {title: false, labelFormatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)})
    //this.chart.line().encode('shape', 'smooth')
    //this.chart.point().encode('shape', 'point').tooltip(false)
    this.chart.render()
  }

}
