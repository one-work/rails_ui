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
  }
}
