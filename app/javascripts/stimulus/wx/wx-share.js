import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['preview', 'media']
  static values = {
    title: String,
    desc: String,
    link: String,
    image: String
  }

  connect() {
    this.updateTimeline()
    this.updateShare()
    this.showMenu()
  }

  updateTimeline() {
    wx.updateTimelineShareData({
      title: this.titleValue,
      link: this.linkValue,
      imgUrl: this.imageValue,
      fail: (res) => {
        alert('分享到朋友圈')
      }
    })
  }

  updateShare() {
    wx.updateAppMessageShareData({
      title: this.titleValue,
      desc: this.descValue,
      link: this.linkValue,
      imgUrl: this.imageValue,
      fail: (res) => {
        alert('转发给朋友')
      }
    })
  }

  // 实际测试不能正常工作，文档未说明
  showMenu() {
    wx.hideAllNonBaseMenuItem()
    wx.hideMenuItems({
      menuList: [
        'share:appMessage',
        'share:timeline',
        'profile'
      ]
    })
    wx.showOptionMenu()
  }

}
