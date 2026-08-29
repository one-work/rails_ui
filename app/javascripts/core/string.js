String.prototype.camelize = function() {
  return this.replace(/(?:[_-])([a-z0-9])/g, (_, char) => char.toUpperCase())
}
