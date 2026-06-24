import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    url: String, // url must begin with /pages
    data: { type: Object, default: {} },
    direct: Boolean,
    launch: Boolean,
    nav: Boolean,
    debug: Boolean
  }

  connect() {
    if (window.__wxjs_environment === 'miniprogram') {
      if (this.directValue) {
        if (typeof wx === 'undefined') {
          const weixin_script = document.getElementById('weixin_script')
          weixin_script.addEventListener('load', () => {
            this.navTo()
          })
        } else {
          this.navTo()
        }
      }
    }
  }

  link() {
    wx.miniProgram.getEnv(res => {
      console.debug('mini program env:', res)
      if (res.miniprogram) {
        this.navTo()
      }
    })
  }

  navTo() {
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

    if (this.launchValue) {
      wx.miniProgram.reLaunch({ url: url })
    } else if (this.navValue) {
      wx.miniProgram.navigateTo({ url: url })
    } else {
      wx.miniProgram.redirectTo({ url: url })
    }
  }

}
