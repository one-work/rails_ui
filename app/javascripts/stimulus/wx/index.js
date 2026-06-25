import '../base'

import MiniProgramController from './mini-program'
application.register('mini-program', MiniProgramController)

import MpMessageController from './mp-message'
application.register('mp-message', MpMessageController)

import ScanController from './scan'
application.register('scan', ScanController)

import WechatController from './wechat'
application.register('wechat', WechatController)

import WxMenuController from './wx-menu'
application.register('wx-menu', WxMenuController)

import WxShareController from './wx-share'
application.register('wx-share', WxShareController)

import WxpayController from './wxpay'
application.register('wxpay', WxpayController)
