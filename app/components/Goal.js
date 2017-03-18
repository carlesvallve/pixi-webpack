export class Goal extends PIXI.Container {

  constructor(props) {
    super()

    this.side = props.side


    const texture = PIXI.Texture.fromImage('goal' + this.side);
    const sprite = new PIXI.Sprite(texture);

    this.position.x = props.x //set(props.x, props.y)
    this.position.y = this.side === 'N' ? props.y : props.y + 34
    sprite.anchor.set(0.52, this.side === 'N' ? 0.95 : 0.95)
    sprite.scale.set(0.5);
    this.addChild(sprite);
  }

  render() {

  }
}

export default Goal
