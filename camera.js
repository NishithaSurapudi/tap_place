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
                    const randomYRotation = Math.random() * 360
                    newElement.setAttribute('rotation', '0 ' + randomYRotation + ' 0')
                    newElement.setAttribute('visible', 'false')
                    newElement.setAttribute('scale', '0.05 0.05 0.05')
                    newElement.setAttribute('gltf-model', '#Catapult')
                    this.el.sceneEl.appendChild(newElement)
                    newElement.addEventListener('model-loaded', () => {
                        newElement.setAttribute('visible', 'true')
                        //console.log('hi');
                       newElement.setAttribute('animation', {
                           // property: 'position',
                            //to: '20 20 20',
                          property:'rotation',
                           to:'45 45 45',
                            property: 'scale',
                            to: '0.5 0.5 0.5',
                            easing: 'easeOutElastic',
                            dur: 2800,
                        })
                    })
                })
            }
        })
