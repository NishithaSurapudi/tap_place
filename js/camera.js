var isplaced = false;
//the component for placing the 3d model
AFRAME.registerComponent('tap-place', {
    init: function () {
        const ground = document.getElementById('ground')
        ground.addEventListener('click', event => {
            // Create new entity for the new object
            if (!isplaced) {
                isplaced = true;
                const newElement = document.createElement('a-entity')
                // The raycaster gives a location of the touch in the scene
                const touchPoint = event.detail.intersection.point
                newElement.setAttribute('position', touchPoint)
                newElement.setAttribute('visible', 'false')
                newElement.setAttribute('scale', '0.3 0.3 0.3')
                newElement.setAttribute('id', 'modelID1')
                newElement.setAttribute('gltf-model', '#Catapult')
                //const xrweb = document.getElementsByTagName('a-scene')
                console.log(document.getElementsByTagName('a-scene')[0].attributes)
                this.el.sceneEl.appendChild(newElement)
                newElement.addEventListener('model-loaded', () => {
                    newElement.setAttribute('visible', 'true')
                });
            }
        })
    }
});

//the component for scaling the 3d model

AFRAME.registerComponent('pinch-scale', {
    schema: {
        min: { default: 0.5 },
        max: { default: 2 }
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
        this.scaleFactor *= 1 + event.detail.spreadChange / event.detail.startSpread;
        this.scaleFactor = Math.min(Math.max(this.scaleFactor, this.data.min), this.data.max);
        var gltfModel;
        if (isplaced) {
            gltfModel = document.getElementById('modelID1');
        }
        if (gltfModel.object3D.scale.x < 1.5) {
            gltfModel.object3D.scale.x = this.scaleFactor * this.initialScale.x;
            gltfModel.object3D.scale.y = this.scaleFactor * this.initialScale.y;
            gltfModel.object3D.scale.z = this.scaleFactor * this.initialScale.z;
        }
        if (gltfModel.object3D.scale.y < 1.5) {
            gltfModel.object3D.scale.x = this.scaleFactor * this.initialScale.x;
            gltfModel.object3D.scale.y = this.scaleFactor * this.initialScale.y;
            gltfModel.object3D.scale.z = this.scaleFactor * this.initialScale.z;
        }

        if (gltfModel.object3D.scale.z < 1.5) {
            gltfModel.object3D.scale.x = this.scaleFactor * this.initialScale.x;
            gltfModel.object3D.scale.y = this.scaleFactor * this.initialScale.y;
            gltfModel.object3D.scale.z = this.scaleFactor * this.initialScale.z;
        }
       else
         {
            gltfModel.object3D.scale.x = this.data.min * this.data.min *this.data.min ;
            gltfModel.object3D.scale.y = this.data.min * this.data.min *this.data.min ;
            gltfModel.object3D.scale.z = this.data.min * this.data.min *this.data.min ;       
         }
    }
});
