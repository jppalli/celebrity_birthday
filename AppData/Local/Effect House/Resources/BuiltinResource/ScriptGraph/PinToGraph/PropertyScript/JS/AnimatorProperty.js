const APJS = require('../amazingpro');

class AnimatorProperty {
  constructor() {
    this.modeMap = {
      Loop: 0,
      PingPong: -1,
      Clamp: -2,
      Once: 1,
    };
    this.reverseModeMap = {
      0: 'Loop',
      '-1': 'PingPong',
      '-2': 'Clamp',
      1: 'Once',
    };
  }

  getRunningClip(animator) {
    const layer = animator.getAnimationLayer(0);
    const clip = layer.currentState.clips.get(0);
    return clip;
  }

  initWrapModes(objects) {
    const animator = objects[0];
    const animations = animator.animations;
    for (let i = 0; i < animations.size(); ++i) {
      const animaz = animations.get(i);
      const clip = animaz.getClip('', animator);
      clip.setWrapMode(animaz.wrapMode);
    }
  }

  setWrapMode(animator, animazName, mode) {
    const animations = animator.animations;
    for (let i = 0; i < animations.size(); ++i) {
      const animaz = animations.get(i);
      if (animaz.name === animazName) {
        const clip = animaz.getClip('', animator);
        clip.setWrapMode(mode);
        return;
      }
    }
  }

  getWrapMode(animator, animazName) {
    const animations = animator.animations;
    for (let i = 0; i < animations.size(); ++i) {
      const animaz = animations.get(i);
      if (animaz.name === animazName) {
        const clip = animaz.getClip('', animator);
        return clip.getWrapMode();
      }
    }
  }

  // to be compatible with legacy nodes that plays animations by name
  playClipByName(animator, animazName) {
    console.log('play animaz', animazName);
    const animations = animator.animations;
    for (let i = 0; i < animations.size(); ++i) {
      const animaz = animations.get(i);
      if (animaz.name === animazName) {
        const clip = animaz.getClip('', animator);
        animator.play(clip.name, clip.getWrapMode(), animaz.speed);
        return;
      }
    }
  }

  playClipByObj(animator, animazObj) {
    if (!(animazObj instanceof APJS.Animaz)) {
      return false;
    }
    const clip = animazObj.getClip('', animator);
    const animations = animator.animations;
    let found = false;
    for (let i = 0; i < animations.size(); ++i) {
      const animaz = animations.get(i);
      if (animaz === animazObj) {
        found = true;
        break;
      }
    }
    if (!found) {
      animations.pushBack(animazObj);
      animator.animations = animations;
    }
    animator.play(clip.name, animazObj.wrapMode, animazObj.speed);
    return true;
  }

  setProperty(objects, property, value, valueType) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }

    if (property === 'playback') {
      const animator = objects[0];
      // fall back to play by name only after play by obj failed
      if (valueType === 'String') {
        this.playClipByName(animator, value);
      } else if (valueType === 'Animaz') {
        this.playClipByObj(animator, value);
      }
    } else if (property.startsWith('playMode ')) {
      const animator = objects[0];
      const animazName = property.substring(property.indexOf(' ') + 1);
      const animations = animator.animations;
      const runningClip = this.getRunningClip(animator);
      for (let i = 0; i < animations.size(); ++i) {
        const animaz = animations.get(i);
        if (animaz.name === animazName) {
          const clip = animaz.getClip('', animator);
          clip.setWrapMode(value);
          if (clip === runningClip) {
            clip.play();
          }
          return;
        }
      }
    }
  }

  getProperty(objects, property, valueType) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }

    if (property === 'playback') {
      // return type: animaz
      const animator = objects[0];
      // runningClip is of type baseClip
      const runningClip = this.getRunningClip(animator);
      const animations = animator.animations;
      for (let i = 0; i < animations.size(); ++i) {
        const animaz = animations.get(i);
        // compare animaz's clip with runningClip
        const clip = animaz.getClip('', animator);
        if (clip === runningClip) {
          const retVal = valueType === 'String' ? animaz.name : animaz;
          return retVal;
        }
      }
      return null;
    } else if (property.startsWith('playMode ')) {
      const animator = objects[0];
      const animazName = property.substring(property.indexOf(' ') + 1);
      const mode = this.getWrapMode(animator, animazName);
      return this.reverseModeMap[`${mode}`];
    }
  }
}

exports.AnimatorProperty = AnimatorProperty;
