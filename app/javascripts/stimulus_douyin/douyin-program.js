import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    url: String, // url must begin with /pages
    data: { type: Object, default: {} },
    direct: Boolean
  }

  connect() {
    if (this.directValue) {
      this.navTo()
    }
  }

  noticeUrl() {
    tt.miniProgram.postMessage({
      data: {
        url: this.urlValue
      }
    })
  }

  navTo() {


    tt.miniProgram.redirectTo({ url: url })
  }
}
