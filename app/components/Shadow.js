import pubsub from 'pubsub-js'


export class Shadow extends PIXI.Container {

  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this));


    this.element = props.element
    this.id = props.id
    this.offset = props.offset

    this.scale = this.element.scale

    this.sprite = this.addChild(this.setAnimation(props.id, props.offset));
    //this.shadow = this.app.world.addChild(new Shadow({ element: this, id: 'ballShadow' }))
    //this.sprite = this.addChild(this.setAnimation('ball'));

    // this.position = this.element.position
    // if (this.element.currentAnimation) {
    //   this.sprite.gotoAndStop(this.element.currentAnimation.currentFrame)
    // }

    this.position.set(0, 0)

    //console.log(this.position, this.element.position)
    //console.log(this.element.currentAnimation)
    //console.log(this.sprite, this.element.currentAnimation)
    //this.sprite.setFrame(this.element.currentAnimation.currentFrame)
    //this.sprite.gotoAndStop(this.element.currentAnimation.currentFrame)

    console.log(this)
  }

  // setAnimation(id, offset = { x: 0.5, y: 0.5 }) {
  //   const texture = PIXI.Texture.fromFrame(id + '_1.png')
  //   const anim = new PIXI.extras.AnimatedSprite([texture])
  //   anim.scale.set(this.element.scale)
  //   anim.anchor.set(offset.x, offset.y)
  //   anim.position.set(0, 0)
  //   anim.animationSpeed = 0
  //   anim.loop = true
  //
  //   console.log(anim.anchor)
  //
  //   return anim
  // }



  setAnimation(id, offset = { x: 0.5, y: 0.5 }) {
    const texture = PIXI.Texture.fromFrame(id + '_1.png')
    const anim = new PIXI.extras.AnimatedSprite([texture])
    //anim.scale.set(this.element.currentAnimation.scale)
    anim.anchor.set(offset.x, offset.y)
    // anim.position.set(0, 0)
    anim.animationSpeed = 0
    anim.loop = true

    this.currentAnimation = anim
    return anim
  }

  render() {
    this.position = this.element.position
    console.log(this.element.currentAnimation.currentFrame)
    if (this.element.currentAnimation) {
      this.sprite.gotoAndStop(this.element.currentAnimation.currentFrame)
    }
  }

}

export default Shadow
