//Tutorial Followed: https://www.youtube.com/watch?v=Q7AOvWpIVHU&list=WL&index=1&t=208s

//import "../style.css"

//import * as THREE from "./three/build/three.js";//'three'
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';
import {OrbitControls} from "https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/controls/OrbitControls.js"; 
import {GLTFLoader} from "https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/GLTFLoader.js";


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer(
  {
  canvas: document.querySelector("canvas.bg"),
  antialias: true
  });

//document.body.appendChild(renderer.domElement)
//renderer.pixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );

renderer.shadowMap.enabled = true;

camera.position.set(4,12,4);

renderer.render(scene,camera);

const geometry = new THREE.CylinderGeometry( 3, 3, 20, 16);
const material = new THREE.MeshPhongMaterial( { color: 0xFF6347});
const cylinder = new THREE.Mesh(geometry, material);

//scene.add(cylinder);

//IMPORTING MODELS TEST
const loader = new GLTFLoader();

loader.frustumCulled = false;

loader.load( 'models/lighthouse_site_full.glb', function ( gltf ) {
  gltf.scene.traverse( function ( child ) {
    if ( child.isMesh ) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  } );
  scene.add( gltf.scene );

	

}, undefined, function ( error ) {

	console.error( error );

} );



//==============================

const pointLight = new THREE.PointLight(0x9C942D);
pointLight.position.set(0,7.25,0);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);

const spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI/15);
spotLight.position.set(1,7.25,0);


//spotLight tests
const targetObject = new THREE.Object3D();
targetObject.position.set(10,0,0)
scene.add(targetObject);
//
spotLight.target = targetObject;
spotLight.castShadow = true;
scene.add(spotLight);
scene.add(pointLight, ambientLight);

//Sky Lighting from: https://stackoverflow.com/questions/15478093/realistic-lighting-sunlight-with-three-js
const hemiLight = new THREE.HemisphereLight( 0x0000ff, 0x00ff00, 0.75 );  //sky_color ground_color intensity 
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 50, 0 );
scene.add( hemiLight );


const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
dirLight.color.setHSL( 0.1, 1, 0.95 );
dirLight.position.set( - 1, 1.75, 1 );
dirLight.position.multiplyScalar( 30 );

dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

dirLight.shadow.camera.left = -100;
dirLight.shadow.camera.right = 100;
dirLight.shadow.camera.top = 100;
dirLight.shadow.camera.bottom = -100;

dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 500;
dirLight.shadow.bias = -0.005;

scene.add( dirLight );



scene.background = new THREE.Color(0x87ceeb); //https://discourse.threejs.org/t/is-it-possible-to-change-the-background-color-of-the-scene-from-the-gui-controls/27307/2
//0x87ceeb
//0x0077ff
//0xC2B3B3
//006994
//scene.fog = new THREE.Fog(0x87ceeb,15,100);

//

//Debug Tools
const lightHelper = new THREE.SpotLightHelper(spotLight);
const boxHelper = new THREE.BoxHelper(targetObject);
const gridHelper = new THREE.GridHelper(200,50);
//scene.add(lightHelper, gridHelper, boxHelper);

//WINDOW RESIZING from: https://www.youtube.com/watch?v=r4bepZ2PEUw
window.addEventListener('resize', function( )
{
  let rw = window.innerWidth;
  let rh = window.innerHeight
  renderer.setSize(rw,rh);
  camera.aspect = rw/rh;
  camera.updateProjectionMatrix();

})

//Controls
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  cylinder.rotation.x += 0.01;
  cylinder.rotation.y += 0.005;
  cylinder.rotation.z += 0.01;
  controls.update();
  renderer.render( scene, camera);
}

animate()

