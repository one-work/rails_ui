import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    list: {
      type: Array,
      default: [
        'menuItem:share:email',
        'menuItem:share:originPage'
      ]
    }
  }

  connect() {
    this.hiddenMenu()
  }

  hiddenMenu() {
    wx.hideMenuItems({
      menuList: this.listValue
    })
  }

  hiddenAll() {
    wx.hideAllNonBaseMenuItem()
  }

  showMenu() {
    wx.showMenuItems({
      menuList: []
    })
  }

  showAll() {
    wx.showAllNonBaseMenuItem()
  }

}
