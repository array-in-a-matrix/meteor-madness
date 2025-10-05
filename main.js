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
*/

const startDate = '2025-10-04';
const endDate = '2025-10-11';
const asteroidID = '3542519';

const NEOFeedURL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${KEYS.NEO}`;
const NEOLookupURL = `https://api.nasa.gov/neo/rest/v1/neo/${asteroidID}?api_key=${KEYS.NEO}`;
const NEOBrowseURL = `https://api.nasa.gov/neo/rest/v1/neo/browse/?api_key=${KEYS.NEO}`;



fetch(NEOFeedURL).then(resp => resp.json()).then(resp => {
	//using the NEO feed API endpoint
	//print to the console the name of the first object from today's list of NEO
	console.log(resp.near_earth_objects[startDate][0].name)

	//TODO:
	// create an object in the scene for each element fetched from the API
})


function animate() {



  // render one frame
  renderer.render( scene, camera );
}

// render new scene every time the screen is refreshed, ~60Hz
renderer.setAnimationLoop( animate );
