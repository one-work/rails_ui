import BaseController from '../base_controller'
import { post } from '@rails/request.js'

export default class extends BaseController {
  static values = {
    debug: Boolean,
    params: { type: Object, default: {} },
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
    const url = ele.dataset.reportUrl
    const body = new FormData()
    Object.keys(this.paramsValue).forEach(k => {
      body.append(k, this.paramsValue[k])
    })

    wx.scanQRCode({
      needResult: 1,
      success: async (res) => {
        body.append('result', res.resultStr)
        const response = await post(url, { body: body, responseKind: 'turbo-stream' })
        if (response.statusCode >= 500) {
          alert('error')
        }
      }
    })
  }

  form(e) {
    const form = document.getElementById(this.formValue)
    const body = new FormData(form)
    const url = ele.dataset.reportUrl || form.action

    wx.scanQRCode({
      needResult: 1,
      success: async (res) => {
        body.append('result', res.resultStr)
        const response = await post(url, { body: body, responseKind: 'turbo-stream' })
        if (response.statusCode >= 500) {
          alert('error')
        }
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
