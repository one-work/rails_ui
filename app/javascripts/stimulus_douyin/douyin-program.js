import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    url: String, // url must begin with /pages
    direct: Boolean,
    data: Object
  }

  connect() {
    if (this.directValue) {
      this.navTo()
    }
  }

  noticeUrl() {
    console.debug('dddddddd')
    tt.miniProgram.postMessage({
      data: {
        url: this.urlValue
      }
    })
  }

  navTo() {
    let url = this.urlValue
    tt.miniProgram.redirectTo({ url: url })
  }
}
