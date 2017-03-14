import pubsub from 'pubsub-js'


export class Camera extends PIXI.Container {

  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this));

    this.world = props.world
    this.target = props.target
    this.x = props.target.x
    this.y = props.target.y

    this.shadow = this.addChild(this.setSprite('ball_shadow', 0.2, 0x000000));
    this.sprite = this.addChild(this.setSprite('ball_shadow', 0.1, 0xff0000));
  }

  setSprite(id, scale = 0.2, color = 0xffffff) {
    const texture = PIXI.Texture.fromFrame(id + '_1.png')
    const sprite = new PIXI.Sprite(texture)
    sprite.anchor.set(0.5, 0.5)
    sprite.scale.set(scale)
    sprite.position.set(0, 0)
    sprite.tint = color
    return sprite
  }

  render() {
    // get increments for this frame
    const dx = this.target.x - this.x
    const dy = this.target.y - this.y

    //this.world.x -= dx
    //this.world.y -= dy
    // update camera position to target
    this.x += dx
    this.y += dy

    //this.x = this.target.x
    //this.y = this.target.y
    console.log(this.world.w)

    if (this.x < -this.world.w / 2) {
      this.x = -(this.world.w / 2)
    }

    if (this.x > this.world.w / 2) {
      this.x = (this.world.w / 2)
    }

    //console.log(this.x)

    //this.world.position.set(this.world.center.x -this.x, this.world.center.y -this.y)


    // update world
    //const limit = this.world.updatePosition(dx, dy)
    // if (this.world.x - this.world.center.x < - this.world.width / 2) {
    //   console.log('<<<')
    //   this.world.x = this.world.center.x - this.world.width / 2
    // }
    //
    // if (this.world.x - this.world.center.x > this.world.width / 2) {
    //   console.log('>>>')
    //   this.world.x = this.world.center.x + this.world.width / 2
    // }



    // update camera position to target
    this.x = this.target.x
    this.y = this.target.y


  }
}

export default Camera
