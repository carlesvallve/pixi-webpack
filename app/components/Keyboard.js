import { Directions }     from './enums'

export class Keyboard {
  constructor() {
    // 37: left 38: up 39: right 40: down
    this.keys = {
      up: false, down: false, left: false, right: false
    }
  }

  getDirection() {
    keyboard(37).press = () => { this.keys.left = true }
    keyboard(38).press = () => { this.keys.up = true }
    keyboard(39).press = () => { this.keys.right = true }
    keyboard(40).press = () => { this.keys.down = true }

    keyboard(37).release = () => { this.keys.left = false }
    keyboard(38).release = () => { this.keys.up = false }
    keyboard(39).release = () => { this.keys.right = false }
    keyboard(40).release = () => { this.keys.down = false }

    let dir = null

    if (this.keys.up === true && this.keys.left === false && this.keys.right === false) { dir = Directions.N }
    if (this.keys.down === true && this.keys.left === false && this.keys.right === false) { dir = Directions.S }
    if (this.keys.left === true && this.keys.up === false && this.keys.down === false) { dir = Directions.W }
    if (this.keys.right === true && this.keys.up === false && this.keys.down === false) { dir = Directions.E }

    if (this.keys.up === true && this.keys.left === true) { dir = Directions.NW }
    if (this.keys.up === true && this.keys.right === true) { dir = Directions.NE }
    if (this.keys.down === true && this.keys.left === true) { dir = Directions.SW }
    if (this.keys.down === true && this.keys.right === true) { dir = Directions.SE }

    return dir
  }

}

export default Keyboard


export const keyboard = (keyCode) => {
  var key = {}
  key.code = keyCode
  key.isDown = false
  key.isUp = true
  key.press = undefined
  key.release = undefined

  //The `downHandler`
  key.downHandler = (event) => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press()
      key.isDown = true
      key.isUp = false
    }
    event.preventDefault()
  };

  //The `upHandler`
  key.upHandler = (event) => {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release()
      key.isDown = false
      key.isUp = true
    }
    event.preventDefault()
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  )

  return key
}
