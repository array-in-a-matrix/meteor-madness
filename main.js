import * as THREE from 'three';
import {scene, camera, renderer} from './src/scene.js';
import axis from './src/axis.js';

import KEYS from './api-keys.json';

/*
1 unit in threejs is equivalent to 1km
*/

// camera vector
camera.position.set(50_000, 50_000, 50_000);
camera.lookAt(0, 0, 0);

// world axis
scene.add(axis.x, axis.y, axis.z);


// add earth
const earthDiameter = 12_756; //kilometers
const geometry = new THREE.SphereGeometry(earthDiameter); 
const material = new THREE.MeshBasicMaterial( { color: 0x2828B5 } ); 
const earth = new THREE.Mesh( geometry, material );
scene.add( earth );

/* TODO:
- draw orbit path of comets?
https://data.nasa.gov/dataset/near-earth-comets-orbital-elements-api/resource/6d556122-8052-431d-b8ef-add27e182536
*/

const startDate = '2025-10-04';
const endDate = '2025-10-11';
const asteroidID = '3542519';

// Asteroids - NeoWs
const NEOFeedURL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${KEYS.NEO}`;
const NEOLookupURL = `https://api.nasa.gov/neo/rest/v1/neo/${asteroidID}?api_key=${KEYS.NEO}`;
const NEOBrowseURL = `https://api.nasa.gov/neo/rest/v1/neo/browse/?api_key=${KEYS.NEO}`;

// scaling factor is needed cus objects are so small and far away its not really visable
const scalingFactor = {
 "diameter": 10_000,
 "radius": 1_000
}

let asteroidList = [];

fetch(NEOFeedURL).then(resp => resp.json()).then(resp => {
	//using the NEO feed API endpoint
	//print to the console the name of the first object from today's list of NEO
	console.log("There are " + resp.element_count + " near Earth objects!")
	
	const listOfNEOToday = resp.near_earth_objects[startDate]

	// for every NEO in today's list, make a corresponding object in the scene
	for(const spaceObject of listOfNEOToday){
		const estimated_diameter_avg = ( spaceObject.estimated_diameter["kilometers"]["estimated_diameter_max"] - spaceObject.estimated_diameter["kilometers"]["estimated_diameter_min"] ) / 2 * scalingFactor.diameter
		const NEOGeometry = new THREE.SphereGeometry(estimated_diameter_avg);
		const NEObject = new THREE.Mesh(NEOGeometry);
		
		/*
		 We will be assuming a perfect circular orbit in the x-z plane
		 centered at the Earth and with constant velocity.
		 */

		//asteroid's tangential velocity v_et, tangent to the direction of motion
		const velocity = spaceObject.close_approach_data[0].relative_velocity["kilometers_per_hour"]
		// radius of orbit
		const radius = spaceObject.close_approach_data[0].miss_distance["kilometers"] / 2 / scalingFactor.radius
		

		asteroidList[listOfNEOToday.indexOf(spaceObject)] = {NEObject, velocity, radius};
		scene.add(NEObject)
	}
});



var theta = 0;

function animate() {
	try {
		for(const spaceObject of asteroidList ){
			const i = asteroidList.indexOf(spaceObject)
			const object = asteroidList[i]["NEObject"]
			const v = asteroidList[i]["velocity"]
			const r = asteroidList[i]["radius"]


			let x = r * Math.cos(theta)
			let z = r * Math.sin(theta)
			theta = theta + 0.001
			// define new position for each asteroid
			asteroidList[i]["NEObject"].position.set(x, 0, z)
		}
	}
	catch (e){
		console.error(e)
	}

  // render one frame
  renderer.render( scene, camera );
}

// render new scene every time the screen is refreshed, ~60Hz
renderer.setAnimationLoop( animate );

