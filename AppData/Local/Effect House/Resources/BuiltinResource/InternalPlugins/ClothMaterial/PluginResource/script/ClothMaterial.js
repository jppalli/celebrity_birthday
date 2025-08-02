// Amaz
const Amaz = effect.Amaz;

class ClothMaterial
{
    constructor()
    {
        this.name = "ClothMaterial";
        this.initialized = false;
        this.pinConstraints = new Amaz.Int32Vector();
        this.attachedBodyId = -1;
        this.isAttached = false;
        this.colorThreshold = 0.1;
    }

    onInit()
    {
        const jsscripts = this.entity.getComponents("JSScriptComponent");
        for (let i = 0; i < jsscripts.size(); i++) {
            let jsscript = jsscripts.get(i);
            if (jsscript && jsscript.path && jsscript.path.endsWith("ClothActor.js") && jsscript.enabled) {
                this.clothActor = jsscript.getScript().ref;
            }
        }
        this.initialize();
    }

    onDisable()
    {
        if(this.clothActor)
            this.clothActor.detachVertex(this);
    }


    initialize()
    {
        if (this.initialized)
        {
            return;
        }

        this.renderer = this.entity.getComponent("Renderer");
        if (!this.renderer)
        {
            this.renderer = this.entity.getComponent("SkinMeshRenderer");
        }
        this.mesh = this.renderer.mesh;
        if (!this.mesh)
        {
            console.error("no mesh in current renderer");
            return;
        }
        this.indices =
            this.mesh.getIndicesByColor(this.vertexColor, this.colorThreshold);
        this.pinConstraints.resize(this.indices.size());
        if (!this.attachedObjectTrans)
        {
            console.warn("default transform set to itself");
            this.attachedObjectTrans = this.entity.getComponent("Transform");;
        }
        this.initialized = true;
    }

    onDestroy(sys)
    {
    }
    
}

exports.ClothMaterial = ClothMaterial;
