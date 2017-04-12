import pubsub from 'pubsub-js'

export class Keyboard {
  constructor() {
    // 37: left 38: up 39: right 40: down
    // 88(X): shoot, 90(Z):

    this.keys = {
      up: false, down: false, left: false, right: false,
      shoot: false
    }

    //Attach event listeners
    window.addEventListener('keydown', this.downHandler.bind(this), false)
    window.addEventListener('keyup', this.upHandler.bind(this), false)
  }


  downHandler (e) {
    pubsub.publish('keyDown', e.keyCode )

    if (e.keyCode === 37) { this.keys.left = true; }
    if (e.keyCode === 38) { this.keys.up = true }
    if (e.keyCode === 39) { this.keys.right = true }
    if (e.keyCode === 40) { this.keys.down = true }

    if (e.keyCode === 88) { this.keys.kick = true }
    e.preventDefault()
  }


  upHandler (e) {
    pubsub.publish('keyUp', e.keyCode )

    // 37: left 38: up 39: right 40: down
    if (e.keyCode === 37) { this.keys.left = false }
    if (e.keyCode === 38) { this.keys.up = false }
    if (e.keyCode === 39) { this.keys.right = false }
    if (e.keyCode === 40) { this.keys.down = false }

    if (e.keyCode === 88) { this.keys.kick = false }
    e.preventDefault()
  }
}

export default Keyboard
