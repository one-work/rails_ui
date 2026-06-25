function weixin_fetch(configUrl, { url = location.href } = {}) {
  fetch(configUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: url })
  }).then(response => {
    return response.json()
  }).then(body => {
    let config = {
      debug: body['debug'],
      appId: body['appid'],
      timestamp: body['timestamp'],
      nonceStr: body['noncestr'],
      signature: body['signature'],
      jsApiList: body['apis'],
      openTagList: body['open_tags']
    }
    if (body['beta']) {
      Object.assign(config, { beta: true })
    }
    if (body['debug']) {
      alert('body is:' + JSON.stringify(config))
    }
    wx.config(config)

    wx.ready(() => {
      if (body['debug']) {
        alert('wx.config ready')
      } else {
        console.debug('ready, ok')
      }
    })

    wx.error(res => {
      if (body['debug']) {
        alert('wx.config: ' + JSON.stringify(res) + '\n' + `location: ${location.href}`)
      } else {
        console.debug('wx.config:', res)
      }
    })
  })
}

(() => {
  const weixin_script = document.createElement('script')
  weixin_script.src = 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js'
  weixin_script.async = true
  document.head.appendChild(weixin_script)

  weixin_script.addEventListener('load', () => {
    weixin_fetch('/wechat/js')
  })
})();
