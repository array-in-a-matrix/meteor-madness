import * as THREE from 'three';
import {scene, camera, renderer} from './src/scene.js';
import axis from './src/axis.js';

// camera vector
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);

// world axis
scene.add(axis.x, axis.y, axis.z);

// create simple unit cube centered at the origin
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );


/* TODO:
- fetch data from NASA APIs then map them
to different objects in the scene.

- draw orbit path of comets?
https://data.nasa.gov/dataset/near-earth-comets-orbital-elements-api/resource/6d556122-8052-431d-b8ef-add27e182536

- remove stinky green cube
*/


let y = 0;
function animate() {

  // rotate cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;

  cube.position.set(0,Math.sin(y),0)
  y=y+0.02

  // render one frame
  renderer.render( scene, camera );
}

// render new scene every time the screen is refreshed, ~60Hz
renderer.setAnimationLoop( animate );
