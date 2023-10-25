function Cat(name, color) {
  this.name = name
  this.color = color
}
Cat.prototype.action = function () {
  console.log(`${this.name}`)
}

let Alex = new Cat('Alex', 'white')
console.log(Alex.action())
