window.utils = {
  timeFormat: (date) => {
    const format = new Intl.DateTimeFormat(
      'zh-Hans-CN',
      {
        calendar: 'gregory',
        timeZone: 'Asia/Shanghai',
        dateStyle: 'full',
        timeStyle: 'full'
      }
    )
    return format.format(date)
  },

  metaContent: (name) => {
    const element = document.head.querySelector(`meta[name="${name}"]`)
    return element && element.content
  }
}
