import ProgramController from '../program_controller'

export default class extends ProgramController {

  connect() {
    if (window.__wxjs_environment === 'miniprogram') {
      if (this.directValue) {
        this.navTo()
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
    } else {
      wx.miniProgram.navigateTo({ url: url })
    }
  }

}
