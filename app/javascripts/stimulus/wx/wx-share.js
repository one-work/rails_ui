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
      fail: () => {
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
      fail: () => {
        alert('转发给朋友')
      },
      success: (res) => {
        console.debug(res, '设置消息成功')
      }
    })
  }

  // 实际测试不能正常工作，文档未说明
  showMenu() {
    wx.hideAllNonBaseMenuItem()
    wx.showMenuItems({
      menuList: [
        'menuItem:share:appMessage',
        'menuItem:share:timeline',
        'menuItem:profile'
      ]
    })
    wx.showOptionMenu()
  }

}
