import * as THREE from 'three';
import {scene, camera, renderer} from './src/scene.js';
import axis from './src/axis.js';

import KEYS from './api-keys.json';


// camera vector
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

// world axis
scene.add(axis.x, axis.y, axis.z);


// add earth
const geometry = new THREE.SphereGeometry(1); 
const material = new THREE.MeshBasicMaterial( { color: 0x2828B5 } ); 
const earth = new THREE.Mesh( geometry, material );
scene.add( earth );

/* TODO:
- fetch data from NASA APIs then map them
to different objects in the scene.

- draw orbit path of comets?
https://data.nasa.gov/dataset/near-earth-comets-orbital-elements-api/resource/6d556122-8052-431d-b8ef-add27e182536

- remove stinky green cube
*/


function animate() {



  // render one frame
  renderer.render( scene, camera );
}

// render new scene every time the screen is refreshed, ~60Hz
renderer.setAnimationLoop( animate );
