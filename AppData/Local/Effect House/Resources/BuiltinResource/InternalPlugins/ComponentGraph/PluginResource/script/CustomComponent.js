const {ComponentGraph} = require('./ComponentGraph');
class CustomComponent extends ComponentGraph {
  constructor() {
    super();
  }

  onInit() {
    this.sysInit();
    super.onInit();
  }
}

exports.CustomComponent = CustomComponent;
