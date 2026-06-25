import BaseController from '../base_controller'

export default class extends BaseController {
  static values = {
    debug: Boolean,
    params: Object,
    form: String,
    regex: String
  }
  static targets = ['input']

  connect() {
    this.element.disabled = false
  }

  input() {
    wx.scanQRCode({
      needResult: 1,
      success: (res) => {
        if (this.hasRegexValue) {
          const regex = new RegExp(this.regexValue, 'gm')
          this.inputTarget.value = res.resultStr.match(regex)
        } else {
          this.inputTarget.value = res.resultStr
        }
      }
    })
  }

  report(event) {
    const ele = event.currentTarget
    let url = ele.dataset.reportUrl
    let body
    if (this.hasFormValue) {
      const form = document.getElementById(this.formValue)
      body = new FormData(form)
      url = form.action
    } else {
      body = new FormData()
    }
    if (this.hasParamsValue) {
      Object.keys(this.paramsValue).forEach(k => {
        body.append(k, this.paramsValue[k])
      })
    }

    wx.scanQRCode({
      needResult: 1,
      success: (res) => {
        body.append('result', res.resultStr)
        this.request(url, 'POST', body, { 'X-CSRF-Token': this.csrfToken() })
      }
    })
  }

  invoke() {
    wx.scanQRCode({
      complete: (res) => {
        if (this.hasDebugValue && this.debugValue) {
          alert(JSON.stringify(res))
        }
      }
    })
  }

}
