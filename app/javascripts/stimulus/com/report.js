import BaseController from '../base_controller'

export default class extends BaseController {

  report(e) {
    const el = e.currentTarget
    this.post(this.urlValue)
  }

}
