import { Directions } from './enums'

export class Keyboard {
  constructor() {

    this.keys = {
      up: false, down: false, left: false, right: false
    }

    //Attach event listeners
    window.addEventListener('keydown', this.downHandler.bind(this), false)
    window.addEventListener('keyup', this.upHandler.bind(this), false)
  }

  downHandler (e) {
    // 37: left 38: up 39: right 40: down
    if (e.keyCode === 37) { this.keys.left = true }
    if (e.keyCode === 38) { this.keys.up = true }
    if (e.keyCode === 39) { this.keys.right = true }
    if (e.keyCode === 40) { this.keys.down = true }
    e.preventDefault()
  }

  upHandler (e) {
    // 37: left 38: up 39: right 40: down
    if (e.keyCode === 37) { this.keys.left = false }
    if (e.keyCode === 38) { this.keys.up = false }
    if (e.keyCode === 39) { this.keys.right = false }
    if (e.keyCode === 40) { this.keys.down = false }
    e.preventDefault()
  }




  getDirection() {
    if (this.keys.up === true && this.keys.left === true) { return Directions.NW }
    if (this.keys.up === true && this.keys.right === true) { return Directions.NE }
    if (this.keys.down === true && this.keys.left === true) { return Directions.SW }
    if (this.keys.down === true && this.keys.right === true) { return Directions.SE }

    if (this.keys.up === true && this.keys.left === false && this.keys.right === false) { return Directions.N }
    if (this.keys.down === true && this.keys.left === false && this.keys.right === false) { return Directions.S }
    if (this.keys.left === true && this.keys.up === false && this.keys.down === false) { return Directions.W }
    if (this.keys.right === true && this.keys.up === false && this.keys.down === false) { return Directions.E }

    return null
  }

}

export default Keyboard
