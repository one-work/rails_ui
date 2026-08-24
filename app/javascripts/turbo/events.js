document.addEventListener('turbo:before-fetch-request', event => {
  const xhr = event.detail.fetchOptions
  xhr.headers['Timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone

  // 识别为弹出的 Modal 层
  if (event.target.tagName === 'FORM' && event.target.classList.contains('modal-card')) {
    xhr.headers['x'] = 'x'
  }
})

document.addEventListener('turbo:before-frame-render', event => {
  if (event.detail.newFrame.title) {
    document.title = event.detail.newFrame.title
  }
})

document.addEventListener('turbo:load', event => {
  document.documentElement.classList.add('no-hover')
  setTimeout(() => {
    document.documentElement.classList.remove('no-hover')
  }, 50)
})

document.addEventListener('turbo:load', (e) => console.log(e.type, e.detail))
document.addEventListener('turbo:before-cache', (e) => console.log(e.type, e.detail))
