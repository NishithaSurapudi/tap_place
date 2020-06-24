        // Component that places model where the ground is clicked

        AFRAME.registerComponent('tap-place', {
            init: function() {
                const ground = document.getElementById('ground')
                ground.addEventListener('click', event => {
                    // Create new entity for the new object
                    const newElement = document.createElement('a-entity')
                    // The raycaster gives a location of the touch in the scene
                    const touchPoint = event.detail.intersection.point
                    newElement.setAttribute('position', touchPoint)
                    newElement.setAttribute('visible', 'false')
                    //newElement.setAttribute('scale', '0.7 0.7 0.7')
                    newElement.setAttribute('gltf-model', '#Catapult')
                    this.el.sceneEl.appendChild(newElement)
                    newElement.addEventListener('model-loaded', () => {
                        newElement.setAttribute('visible', 'true')
                        //console.log('hi');
                       newElement.setAttribute('animation', {
                            //property: 'rotation',
                            //from:'0 0 0',
                            //to: '90 60 60',
                            //easing: 'easeOutElastic',
                            //dur: 800,
                            property: 'scale',
                            to: '1 1 1',
                            easing: 'easeOutElastic',
                            dur: 1800,
                        })
                    })
                })
            }
        })
