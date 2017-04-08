import pubsub from 'pubsub-js'


export class Tile extends PIXI.Container {
  constructor(props) {
    super()
    this.props = props

    // subscribe to game events
    pubsub.subscribe('render', this.render.bind(this))
    pubsub.subscribe('collision', this.onCollision.bind(this))

    const { x, y, w, h } = this.props
    this.setTriangle(w, h)
    this.setSprite(w, h)
    this.position.set(x, y)
  }

  setSprite(w, h) {
    // Draw a rectangle with rounded corners
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(0x000000); // Purple
    this.graphics.drawRoundedRect(-w/2, -h/2, w, h, 10); // drawRoundedRect(x, y, width, height, radius)
    this.graphics.endFill();

    var texture = this.graphics.generateTexture();
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.anchor.set(0.5, 0)

    this.addChild(this.sprite)
  }

  setTriangle(w, h) {
    // Draw a triangle
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0x000000); // Purple
    graphics.moveTo(400, -60);
    graphics.lineTo(440, -30);
    graphics.lineTo(360, -30);
    graphics.endFill();

    var texture = graphics.generateTexture();
    this.triangle = new PIXI.Sprite(texture);
    this.triangle.anchor.set(0.5, 0.5)
    this.triangle.visible = false

    this.addChild(this.triangle)
  }

  onCollision(e, params) {
    //console.log('!', e, params)
    //this.sprite.tint = 0x000000;
    //this.triangle.visible = false
  }

  setSpikes() {
    //console.log('setSpikes!', this.props.num)
    this.sprite.tint = 0xFF0000;
    this.triangle.visible = true
  }

  render() {

  }
}

export default Tile
