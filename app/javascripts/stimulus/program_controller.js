import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    url: String, // url must begin with /pages
    data: { type: Object, default: {} },
    direct: Boolean,
    launch: Boolean
  }

  xx() {
    let url = this.urlValue

    let query = new URLSearchParams(this.dataValue).toString()
    if (query.length > 0) {
      query = query.replace(/\+/g, '%20') // 将 + 转为 %20 方便 decodeURLParams 解析
      if (this.urlValue.includes('?')) {
        url = this.urlValue.concat('&').concat(query)
      } else {
        url = this.urlValue.concat('?').concat(query)
      }
    }
    console.debug('mini program nav url:', url)
    return url
  }

}