const amg = require('./amg');

class Main
{
    constructor()
    {
        this.name = 'Main';
    }

    onInit()
    {
        amg.Engine.init(this.scene, this);
    }

    onStart()
    {
        amg.Engine.start();
    }
    onUpdate(dt)
    {
        amg.Engine.update(dt);
    }
    onLateUpdate(dt)
    {
        amg.Engine.lateUpdate(dt);
    }
    onComponentAdded(comp) {}

    onEvent(event)
    {
        amg.Engine.event(event);
    }
    onDestroy()
    {
        amg.Engine.destroy();
    }
}

exports.Main = Main;
