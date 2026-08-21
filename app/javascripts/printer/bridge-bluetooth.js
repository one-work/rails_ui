import { BridgeComponent } from '@hotwired/hotwire-native-bridge'
import { PrintCommand } from 'xcprinter'

export default class extends BridgeComponent {
  static component = 'bluetooth'
  static targets = ['list', 'filter']
  static values = {
    template: { type: String, default: 'bluetooth-item' },
    init: { type: Boolean, default: false },
    list: { type: Array, default: [] },
    filter: { type: Boolean, default: true }
  }

  connect() {
    super.connect()
    this.notifyBridgeOfConnect()
  }

  notifyBridgeOfConnect() {
    this.send('connect', {}, (message) => {
      console.debug('蓝牙组件就绪', message)
      const data = message.data

      if (data.address) {
        if (this.hasListTarget) {
          const item = this.listTarget.querySelector(`:scope > [data-address='${data.address}']`)
          if (item) {
          } else {
            this.renderDevice(data.device)
          }
        } else if (this.hasInitValue && data.state !== 'connected') {
          console.debug('发起初始连接！')
          this.send('connect_device', { address: data.address, name: data.name }, (msg) => {
            console.debug('初始连接结果：', msg)
            const conData = msg.data
            if (conData.success) {
              this.#enableButton()
            }
          })
        } else {
          if (data.state === 'connected') {
            this.#enableButton()
          }
        }
      }
    })
  }

  filter(e) {
    const item = e.currentTarget
    item.dataset.action = 'click->bridge-bluetooth#unfilter'
    const svg = item.querySelector('use')
    svg.setAttribute('href', svg.href.baseVal.replace('#square', '#square-check'))
    this.filterValue = true

    Array.from(this.listTarget.children).forEach(el => {
      this.#doFilter(el)
    })
  }

  unfilter(e) {
    const item = e.currentTarget
    item.dataset.action = 'click->bridge-bluetooth#filter'
    const svg = item.querySelector('use')
    svg.setAttribute('href', svg.href.baseVal.replace('#square-check', '#square'))
    this.filterValue = false

    this.listTarget.querySelectorAll(':scope > .display-none').forEach(el => {
      el.classList.remove('display-none')
    })
  }

  // 搜索蓝牙设备
  search(e) {
    console.debug('do search')
    const item = e.currentTarget
    this.listTarget.classList.add('bluetooth-list')
    item.dataset.action = 'click->bridge-bluetooth#hide'
    const svg = item.querySelector('use')
    svg.setAttribute('href', svg.href.baseVal.replace('down', 'up'))
    if (this.hasFilterTarget) {
      if (!this.filterTarget.dataset.action) {
        this.filterTarget.dataset.action = 'click->bridge-bluetooth#unfilter'
      }
      this.filterTarget.classList.remove('display-none')
    }

    this.send('search', {}, (msg) => {
      console.debug(msg)
      const data = msg.data
      if (this.listTarget.classList.contains('bluetooth-list')) {
        const item = this.listTarget.querySelector(`:scope > [data-address='${data.device.address}']`)
        if (item) {
        } else {
          this.renderDevice(data.device)
        }
      }
    })
  }

  hide(e) {
    const item = e.currentTarget
    item.dataset.action = 'click->bridge-bluetooth#search'
    const svg = item.querySelector('use')
    svg.setAttribute('href', svg.href.baseVal.replace('up', 'down'))
    if (this.hasFilterTarget) {
      this.filterTarget.classList.add('display-none')
    }

    this.listTarget.classList.remove('bluetooth-list')
    this.listTarget.querySelectorAll('[data-action="click->bridge-bluetooth#connectDevice"]').forEach(el => {
      el.remove()
    })
  }

  connectDevice(event) {
    const item = event.currentTarget
    this.#disconnectOther()
    this.#doConnect(item)
  }

  #doFilter(el) {
    if (this.listValue.some(e => el.dataset.name.includes(e)) || el.dataset.action.includes('disconnectDevice')) {
    } else {
      el.classList.add('display-none')
    }
  }

  #doConnect(item) {
    console.debug('发起主动连接！')
    item.querySelector('.media-right').innerText = '开始连接'
    this.send('connect_device', { address: item.dataset.address, name: item.dataset.name }, (msg) => {
      console.debug('主动连接结果：', msg)
      const data = msg.data

      if (data.success) {
        this.#activeItem(item, 'connected')
      } else {
        item.querySelector('.media-right').innerText = '连接失败'
      }
    })
  }

  #disconnectOther() {
    this.listTarget.querySelectorAll('.background-light').forEach(el => {
      this.#doDisconnect(el)
    })
  }

  disconnectDevice(event) {
    const item = event.currentTarget
    this.#doDisconnect(item)
  }

  #doDisconnect(item) {
    this.send('disconnect_device', { address: item.dataset.address }, (msg) => {
      console.debug('断开连接', msg)
      if (msg.data.success) {
        this.#inactiveItem(item)
      }
    })
  }

  // 打印
  print(arr) {
    this.send('send_data', { data: arr }, (result) => {
      console.debug('打印结果：', result)
    })
  }

  printData(e) {
    const item = e.currentTarget
    const arr = item.dataset.content.split(',').map(i => parseInt(i, 16))
    this.print(arr)
  }

  // 打印自测页
  selfTest() {
    this.print([0x12, 0x54])
  }

  setWifi(e) {
    const item = e.currentTarget
    const ssid = item.parentNode.querySelector('[name=ssid]').value
    const password = item.parentNode.querySelector('[name=password]').value

    const pos = new PrintCommand()
    const data = pos.setWifi(ssid, password)
    console.debug('setWifi', data)
    this.print(data)
  }

  setName(e) {
    const item = e.currentTarget
    const name = item.parentNode.querySelector('[name=name]').value

    const pos = new PrintCommand()
    const data = pos.setName(name)
    console.debug('setName', data)
    this.print(data)
  }

  setTime(e) {
    const item = e.currentTarget
    const time = item.parentNode.querySelector('[name=time]').value

    const pos = new PrintCommand()
    const data = pos.setTime(time)
    console.debug('setTime', data)
    this.print(data)
  }

  renderDevice(device) {
    const template = document.getElementById(this.templateValue)
    if (!template) { return }

    const fragment = template.content.cloneNode(true)
    const item = fragment.querySelector('.media')
    item.dataset.address = device.address
    item.dataset.name = device.name

    if (device.state) {
      this.#activeItem(item, device.state)
    } else if (device.ready) {
      this.#doConnect(item)
    }
    if (this.filterValue) {
      this.#doFilter(item)
    }

    const content = fragment.querySelector('span')
    content.innerText = device.name

    this.listTarget.appendChild(fragment)
    return item
  }

  #activeItem(item, state) {
    let text
    if (state === 'connecting') {
      text = '连接中'
    } else if (state === 'connected') {
      text = '已连接'
      this.#enableButton()
    } else {
      text = state
    }

    item.dataset.action = 'click->bridge-bluetooth#disconnectDevice'
    item.classList.add('background-light')
    item.querySelector('.media-right').innerText = text
  }

  #inactiveItem(item) {
    item.dataset.action = 'click->bridge-bluetooth#connectDevice'
    item.classList.remove('background-light')
    item.querySelector('.media-right').innerText = ''
  }

  #enableButton() {
    const button = document.getElementById(this.element.dataset.buttonId)
    console.debug('button 找到', button)
    if (button) {
      button.disabled = false
    }
  }
}
