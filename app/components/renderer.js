
const width = window.innerWidth
const height = window.innerHeight
const center = { x: width / 2, y: height / 2 }

// 0x1099bb

export const setRenderer = () => {
  let renderer = PIXI.autoDetectRenderer(320, 240,
    {backgroundColor: 0x666666, transparent: false, antialias: false, resolution: 1}
  )

  renderer.view.style.position = "absolute"
  renderer.view.style.display = "block"
  renderer.autoResize = true
  renderer.resize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.view)
  return renderer
}

export const setStage = () => {
  const stage = new PIXI.Container()
  return stage
}

export const setBunny = (stage) => {
  var texture = PIXI.Texture.fromImage('assets/img/bunny.png')
  var bunny = new PIXI.Sprite(texture)
  bunny.anchor.set(0.5, 0.5)
  bunny.position.set(center.x, center.y)
  bunny.scale.set(1, 1)
  stage.addChild(bunny)

  // use this to change the sprite texture to a given image
  //anySprite.texture = PIXI.utils.TextureCache["anyTexture.png"];

  return bunny
}


export const setGrid = (stage) => {

}
