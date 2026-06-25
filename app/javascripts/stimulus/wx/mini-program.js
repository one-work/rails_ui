import ProgramController from '../program_controller'

export default class extends ProgramController {

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
    let url = this.xx()

    if (this.launchValue) {
      wx.miniProgram.reLaunch({ url: url })
    } else if (this.navValue) {
      wx.miniProgram.navigateTo({ url: url })
    } else {
      wx.miniProgram.redirectTo({ url: url })
    }
  }

}
