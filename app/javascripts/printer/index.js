import './base'
import '../core/dataset'

import PrintPosController from './print-pos'
application.register('print-pos', PrintPosController)

import BridgeBluetoothController from './bridge-bluetooth'
application.register('bridge-bluetooth', BridgeBluetoothController)
