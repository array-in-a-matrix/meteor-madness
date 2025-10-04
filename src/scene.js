import * as THREE from 'three';

// create a scene, a camera and a way to render them
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

// set width & hight of canvas and add it to the HTML file
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

export {scene, camera, renderer};