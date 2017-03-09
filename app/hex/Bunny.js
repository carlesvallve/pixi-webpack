import pubsub from 'pubsub-js'

const Bunny = (stage) => {

  const texture = PIXI.Texture.fromImage('assets/img/bunny.png');
  const sprite = new PIXI.Sprite(texture);
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
  sprite.position.x = 0;
  sprite.position.y = 0;
  sprite.scale.x = 1;
  sprite.scale.y = 1;
  stage.addChild(sprite);

  pubsub.subscribe('render', () => {
    sprite.rotation += 0.01;
  });
}

export default Bunny

// export default class Bunny {
//   constructor(stage) {
//     var texture = PIXI.Texture.fromImage('assets/img/bunny.png');
//     this.sprite = new PIXI.Sprite(texture);
//     this.sprite.anchor.x = 0.5;
//     this.sprite.anchor.y = 0.5;
//     this.sprite.position.x = 400;
//     this.sprite.position.y = 300;
//     this.sprite.scale.x = 2;
//     this.sprite.scale.y = 2;
//     stage.addChild(this.sprite);
//
//     PubSub.subscribe('render', this.render.bind(this));
//   }
//
//   render(params) {
//     this.sprite.rotation += 0.01;
//   }
// }
