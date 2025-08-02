class FaceWarpXRendererProperty {
  constructor() {}

  setProperty(objects, property, value) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }

    //fixed rule, index is after #
    let index = Number(property.split("#")[1]);
    if (index < 0) {
      return null;
    }

    if(value === undefined || value === null || typeof value !== 'number')
    {
      return null;
    }

    const organWarpInfos = objects[0].organWarpInfos;
    const boundaryWarpInfos = objects[0].boundaryWarpInfos;
    if (index < organWarpInfos.size() && index < boundaryWarpInfos.size()) {
      const organSliderName = organWarpInfos.get(index).type;
      const boundarySliderName = boundaryWarpInfos.get(index).type;

      let sliders = objects[0].sliders;
      if(sliders.has(organSliderName) && sliders.has(boundarySliderName))
      {
        sliders.set(organSliderName, Math.min(Math.max(value, 0), 100) * 0.01);
        sliders.set(boundarySliderName, Math.min(Math.max(value, 0), 100) * 0.01);

        objects[0].sliders = sliders;
      }
    }
  }

  getProperty(objects, property) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }

    //fixed rule, index is after #
    let index = Number(property.split("#")[1]);
    if (index < 0) {
      return null;
    }

    const organWarpInfos = objects[0].organWarpInfos;
    if (index < organWarpInfos.size()) {
      const organSliderName = organWarpInfos.get(index).type;
      let sliders = objects[0].sliders;
      if(sliders.has(organSliderName))
      {
        return sliders.get(organSliderName) * 100.0;
      }
    }

    return null;
  }
}

exports.FaceWarpXRendererProperty = FaceWarpXRendererProperty;
