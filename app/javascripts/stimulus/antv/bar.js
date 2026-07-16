import AntvBaseController from './base'

export default class extends AntvBaseController {

  connect() {
    super.connect()
    this.chart.render()
  }

}
