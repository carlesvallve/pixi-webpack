//import extraFilters from 'pixi-extra-filters'

const Effects = {

  // pixi filters

  blur: (element, ammount = 0.5) => {
    const filter = new PIXI.filters.BlurFilter()
    filter.blur = ammount
    element.filters = [filter]
    return filter
  },

  // extra filters

  glow: (element, distance = 10, outer = 1, inner = 1, color = 0xFFFFFF, quality = 1) => {
    // distance, outerStrength, innerStrength, color, quality
    const filter = new PIXI.filters.GlowFilter(distance, outer, inner, color, quality)
    element.filters = [filter]
    return filter
  },

  outline: (element, thickness = 1, color = 0xFFFFFF) => {
    const filter = new PIXI.filters.GlowFilter(thickness, color)
    element.filters = [filter]
    return filter
  }
}

export default Effects
