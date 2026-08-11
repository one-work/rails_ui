import LogChannel from './channels/log_channel'
application.register('log-channel', LogChannel)

import NoticeChannel from './channels/notice_channel'
application.register('notice-channel', NoticeChannel)

import SessionChannel from './channels/session_channel'
application.register('session-channel', SessionChannel)

import SessionInitChannel from './channels/session_init_channel'
application.register('session-init-channel', SessionInitChannel)

import SessionLoginChannel from './channels/session_login_channel'
application.register('session-login-channel', SessionLoginChannel)

import DoneChannel from './channels/done_channel'
application.register('done', DoneChannel)
