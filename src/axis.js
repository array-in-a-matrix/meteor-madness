import * as THREE from 'three';

const xaxis = [new THREE.Vector3( 1, 0, 0 ), new THREE.Vector3( -1, 0, 0 )];
const yaxis = [new THREE.Vector3( 0, 1, 0 ), new THREE.Vector3( 0, -1, 0 )];
const zaxis = [new THREE.Vector3( 0, 0, 1 ), new THREE.Vector3( 0, 0, -1 )];

const xaxisgeometry = new THREE.BufferGeometry().setFromPoints( xaxis );
const yaxisgeometry = new THREE.BufferGeometry().setFromPoints( yaxis );
const zaxisgeometry = new THREE.BufferGeometry().setFromPoints( zaxis );

const xaxismaterial = new THREE.LineBasicMaterial( { color: 0xfefefe } );
const yaxismaterial = new THREE.LineBasicMaterial( { color: 0xfefefe } );
const zaxismaterial = new THREE.LineBasicMaterial( { color: 0xfefefe } );

const xline = new THREE.Line( xaxisgeometry, xaxismaterial );
const yline = new THREE.Line( yaxisgeometry, yaxismaterial );
const zline = new THREE.Line( zaxisgeometry, zaxismaterial );

const axis = {
	"x": xline,
	"y": yline,
	"z": zline
	}

export default axis;