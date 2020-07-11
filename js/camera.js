// Component that places model where the ground is clicked
var isplaced = false;
AFRAME.registerComponent('tap-place', {
    init: function () {
        const ground = document.getElementById('ground')
        if (!isplaced) {
            ispalced = true;
            ground.addEventListener('click', event => {
                // Create new entity for the new object
                const newElement = document.createElement('a-entity')
                const touchPoint = event.detail.intersection.point
                newElement.setAttribute('position', touchPoint)
                newElement.setAttribute('visible', 'false')
                newElement.setAttribute('scale', '0.3 0.3 0.3')
                newElement.setAttribute('id', 'MOdelID')
                newElement.setAttribute('gltf-model', '#Catapult')
                this.el.sceneEl.appendChild(newElement)
                newElement.addEventListener('model-loaded', () => {
                    newElement.setAttribute('visible', 'true')
                })
            })
        }
    }
})

AFRAME.registerComponent('pinch-scale', {
    schema: {
        min: { default: 0.3 },
        max: { default: 8 }
    },
    init: function () {
        this.initialScale = this.el.object3D.scale.clone()
        this.scaleFactor = 1
        this.handleEvent = this.handleEvent.bind(this)
        this.el.sceneEl.addEventListener('twofingermove', this.handleEvent)
    },
    remove: function () {
        this.el.sceneEl.removeEventListener('twofingermove', this.handleEvent)
    },
    handleEvent: function (event) {
        this.scaleFactor *= 1 + event.detail.spreadChange / event.detail.startSpread
        this.scaleFactor = Math.min(Math.max(this.scaleFactor, this.data.min), this.data.max)
        var gltfModel;
        if (isplaced) {
            gltfModel = document.getElementById('modelID');
        }

        gltfModel.object3D.scale.x = this.scaleFactor * this.initialScale.x
        gltfModel.object3D.scale.y = this.scaleFactor * this.initialScale.y
        gltfModel.object3D.scale.z = this.scaleFactor * this.initialScale.z
    }
})
