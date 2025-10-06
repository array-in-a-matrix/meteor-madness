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

//Asteroids - NeoWs
const NEOFeedURL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${KEYS.NEO}`;
const NEOLookupURL = `https://api.nasa.gov/neo/rest/v1/neo/${asteroidID}?api_key=${KEYS.NEO}`;
const NEOBrowseURL = `https://api.nasa.gov/neo/rest/v1/neo/browse/?api_key=${KEYS.NEO}`;

const scalingFactor = {
 "diameter": 10_000,
 "radius": 1_000
}

fetch(NEOFeedURL).then(resp => resp.json()).then(resp => {
	//using the NEO feed API endpoint
	//print to the console the name of the first object from today's list of NEO
	console.log("There are " + resp.element_count + " near Earth objects!")
	
	const listOfNEOToday = resp.near_earth_objects[startDate]

	console.table(listOfNEOToday)

	// for every NEO in today's list, make a corresponding object in the scene
	for(const spaceObject of listOfNEOToday){
		const estimated_diameter_avg = ( spaceObject.estimated_diameter["kilometers"]["estimated_diameter_max"] - spaceObject.estimated_diameter["kilometers"]["estimated_diameter_min"] ) / 2 * scalingFactor.diameter
		console.log("d= " + estimated_diameter_avg)
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
		
		const acceleration_et = 0;
		const acceleration_en = 0;
		const acceleration = Math.sqrt(Math.pow(acceleration_et, 2) + Math.pow(acceleration_en, 2));

		const velocity_x = 0;
		const velocity_z = 0;

		console.log(radius);
		var displacement_x = radius;
		var displacement_z = 0;

		NEObject.position.set(displacement_x, 0, displacement_z)
		scene.add(NEObject)
		
	}
});



function animate() {



  // render one frame
  renderer.render( scene, camera );
}

// render new scene every time the screen is refreshed, ~60Hz
renderer.setAnimationLoop( animate );
