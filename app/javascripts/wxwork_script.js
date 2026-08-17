function wxwork_fetch(configUrl, { url = location.href } = {}) {
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
    wx.agentConfig({
      corpid: body['corpid'],
      agentid: body['agentid'],
      timestamp: body['timestamp'],
      nonceStr: body['noncestr'],
      signature: body['signature'],
      jsApiList: body['apis'],
      success: res => {
        if (body['debug']) {
          alert('wx.agentConfig success' + JSON.stringify(res))
        } else {
          console.debug('wx.agentConfig success', JSON.stringify(res))
        }
      },
      fail: res => {
        new Error('wx.agentConfig fail ' + JSON.stringify(res))
      }
    })

    wx.ready()
  })
}

(() => {
  const weixin_script = document.createElement('script')
  weixin_script.src = 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js'
  weixin_script.async = true
  document.head.appendChild(weixin_script)
  weixin_script.addEventListener('load', () => {
    weixin_fetch('/wechat/js')
  })

  const work_script = document.createElement('script')
  work_script.src = 'https://open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js'
  work_script.async = true
  document.head.appendChild(work_script)
  work_script.addEventListener('load', () => {
    wxwork_fetch('/wechat/agent_js')
  })
})()
