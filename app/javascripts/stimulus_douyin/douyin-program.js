import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    url: String, // url must begin with /pages
    direct: Boolean
  }

  connect() {
    if (this.directValue) {
      this.noticeUrl()
    }
  }

  noticeUrl() {
    tt.miniProgram.postMessage({
      data: {
        url: this.urlValue
      }
    })
  }
}
