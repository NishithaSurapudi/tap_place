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
                    //const randomYRotation = Math.random() * 360
                    //newElement.setAttribute('rotation', '0 ' + randomYRotation + ' 0')
                    newElement.setAttribute('visible', 'false')
                    newElement.setAttribute('scale', '0.3 0.3 0.3')
                    newElement.setAttribute('gltf-model', '#Catapult')
                    this.el.sceneEl.appendChild(newElement)
                    newElement.addEventListener('model-loaded', () => {
                        newElement.setAttribute('visible', 'true')
                        //console.log('hi');
                        newElement.setAttribute('animation', {
                           property: 'scale',
                            to: '0.6 0.6 0.6',
                            easing: 'easeOutElastic',
                           dur: 800,
                            property:'rotation',
                            from:'alternate',
                            to:'reverse',
                            loop:'true',
                         dur:'29000'
                          })
                    })
                })
            }
        })
