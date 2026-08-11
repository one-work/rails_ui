import './base'

import MiniProgramController from './wx/mini-program'
application.register('mini-program', MiniProgramController)

import MpMessageController from './wx/mp-message'
application.register('mp-message', MpMessageController)

import ScanController from './wx/scan'
application.register('scan', ScanController)

import WechatController from './wx/wechat'
application.register('wechat', WechatController)

import WxMenuController from './wx/wx-menu'
application.register('wx-menu', WxMenuController)

import WxShareController from './wx/wx-share'
application.register('wx-share', WxShareController)

import WxpayController from './wx/wxpay'
application.register('wxpay', WxpayController)
