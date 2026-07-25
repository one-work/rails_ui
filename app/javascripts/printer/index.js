import './base'
import '../core/utils'

import PrintPosController from './print-pos'
application.register('print-pos', PrintPosController)

import BridgeBluetoothController from './bridge-bluetooth'
application.register('bridge-bluetooth', BridgeBluetoothController)
