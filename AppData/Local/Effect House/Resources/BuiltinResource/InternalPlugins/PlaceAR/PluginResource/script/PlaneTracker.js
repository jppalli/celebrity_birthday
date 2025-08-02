// Amaz
const Amaz = effect.Amaz;

class PlaneTracker {
  constructor() {
    this.name = 'PlaceTracker';
  }

  onEnable() {
    console.log('[OnEnable]', this.name);
  }

  onStart() {
    console.log('running:InteractableObject:onStart');
  }

  onUpdate(deltaTime) {}

  onLateUpdate(deltaTime) {}

  onEvent(event) {}

  onDestroy(sys) {}
}

exports.PlaneTracker = PlaneTracker;
