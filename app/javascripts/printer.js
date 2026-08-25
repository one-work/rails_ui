import './stimulus/base'
import './core/dataset'

import PrintPosController from './printer/print-pos'
application.register('print-pos', PrintPosController)

import BridgeBluetoothController from './printer/bridge-bluetooth'
application.register('bridge-bluetooth', BridgeBluetoothController)

import PicturePrintController from './printer/picture-print'
application.register('picture-print', PicturePrintController)
