function wxwork_fetch({ url = location.href } = {}) {
  fetch('/wechat/agent_js', {
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
  })
}
