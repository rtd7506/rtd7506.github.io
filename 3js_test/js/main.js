//Tutorial Followed: https://www.youtube.com/watch?v=Q7AOvWpIVHU&list=WL&index=1&t=208s

//import "../style.css"

//import * as THREE from "./three/build/three.js";//'three'
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';
import {OrbitControls} from "https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/controls/OrbitControls.js"; 
import {GLTFLoader} from "https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/GLTFLoader.js";
import {EffectComposer} from 'https://unpkg.com/three@0.117.1/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'https://unpkg.com/three@0.117.1/examples/jsm/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'https://unpkg.com/three@0.117.1/examples/jsm/postprocessing/UnrealBloomPass.js';
import {BokehPass} from 'https://unpkg.com/three@0.117.1/examples/jsm/postprocessing/BokehPass.js';
//import { GUI } from 'https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.9/dat.gui.min.js';


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
renderer.setPixelRatio( window.devicePixelRatio );

renderer.shadowMap.enabled = true;

camera.position.set(15,15,15);

renderer.render(scene,camera);

const geometry = new THREE.BoxGeometry( .5, 1, .5);
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347});
material.emissive = new THREE.Color(0xFF6347);
material.emissiveIntensity = 100;

const cube = new THREE.Mesh(geometry, material);

cube.castShadow = true;

//scene.add(cube);

cube.position.x = 0;
cube.position.y = 7;
cube.position.z = 0;

//IMPORTING MODELS TEST
const loader = new GLTFLoader();

loader.frustumCulled = false;


let mixer;
let model;
let boatAction, waterAction, squidAction;

loader.load( 'models/lighthouse_site1.5.glb', function ( gltf ) {
  gltf.scene.traverse( function ( child ) {
    if ( child.isMesh && child.name != "lighthouse_glass") {
      child.castShadow = true;
      child.receiveShadow = true;
      console.log(child.name)
      //child.material.emissive = new THREE.Color(0xF0F);
    }
    
    if (child.name  == "ship1"){
      child.castShadow = true;
    }
    
  } );
  scene.add( gltf.scene );
  
  model = gltf.scene;
  mixer = new THREE.AnimationMixer(model)
  const clips = gltf.animations;
  const boatClip = THREE.AnimationClip.findByName(clips, "boat_move");
  boatAction = mixer.clipAction(boatClip);
  boatAction.setLoop(THREE.LoopOnce)

  const waterClip = THREE.AnimationClip.findByName(clips, "water_line");
  waterAction = mixer.clipAction(waterClip);
  waterAction.play();

  const squidClip = THREE.AnimationClip.findByName(clips, "squid_action1");
  squidAction = mixer.clipAction(squidClip);
  squidAction.setLoop(THREE.LoopOnce)
  //squidAction.play();
  
  //action.play();

}, undefined, function ( error ) {

	console.error( error );

} );



//const action = mixer.clipAction()


//==============================

const pointLight = new THREE.PointLight(0x9C942D); //0x9C942D
pointLight.position.set(0,7.25,0);
pointLight.power = 3;

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


//ocean color

//Sky Lighting from: https://stackoverflow.com/questions/15478093/realistic-lighting-sunlight-with-three-js
const hemiLight = new THREE.HemisphereLight( 0x0000ff, 0x00ff00, 0.75 );  //sky_color ground_color intensity 
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 50, 0 );



const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
dirLight.color.setHSL( 0.1, 1, 0.95 );
dirLight.position.set( 0.25, 0.75, -1 ); //1
dirLight.position.multiplyScalar( 30 );

dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

dirLight.shadow.camera.left = -50;
dirLight.shadow.camera.right = 50;
dirLight.shadow.camera.top = 50;
dirLight.shadow.camera.bottom = -50;

dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 50;
dirLight.shadow.bias = -0.005;



const squidLight = new THREE.PointLight(0x9C942D);
squidLight.position.set(0,-9,5);
squidLight.strength = 20;
squidLight.distance = 10;

squidLight.castShadow = true;

squidLight.shadow.mapSize.width = 2048;
squidLight.shadow.mapSize.height = 2048;

squidLight.shadow.camera.left = -100;
squidLight.shadow.camera.right = 100;
squidLight.shadow.camera.top = 100;
squidLight.shadow.camera.bottom = -100;

squidLight.shadow.camera.near = 0.1;
squidLight.shadow.camera.far = 50;
squidLight.shadow.bias = -0.005;

const squidHelper = new THREE.PointLightHelper(squidLight);



scene.background = new THREE.Color(0xBF4B8B); //0x87ceeb //https://discourse.threejs.org/t/is-it-possible-to-change-the-background-color-of-the-scene-from-the-gui-controls/27307/2
//0x87ceeb
//0x0077ff
//0xC2B3B3
//006994

scene.add( hemiLight );
scene.add( dirLight );
scene.add(pointLight, ambientLight);
scene.add(squidLight)//, squidHelper)


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

//SCROLL SYSTEM
let scroll = 0;
let amp = 10;

window.addEventListener("wheel", event => { //https://stackoverflow.com/questions/14926366/mousewheel-event-in-modern-browsers
  const delta = Math.sign(event.deltaY);
  //console.log(delta);
  scroll+=delta;
  if (scroll<0)
  {
    scroll=0;
  }
  if (scroll > 197){
    scroll=197;
  }
  //console.log(scroll);
  /*
  if (delta == 1){
    if (scroll>75){
      amp += 0.25;
    }
  }
  if (delta == -1){
    if (scroll>75){
      amp -= 0.25;
    }
  }
  */
  bokehPass.focus = scroll;

});

//FANCY RENDERING
const composer = new EffectComposer(renderer);
composer.setSize(window.innerWidth,window.innerHeight);

const renderPass = new RenderPass(scene, camera);

composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass( //https://r105.threejsfundamentals.org/threejs/lessons/threejs-post-processing.html
new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85
);
bloomPass.threshold = 0;
bloomPass.strength = 0.2;
bloomPass.radius = 0;

composer.addPass(bloomPass);

const bokehPass = new BokehPass(scene,camera,{
  focus: 0.0005,
	aperture: 3,//.025, //3
	maxblur: 0.01,

	width: window.innerWidth,
	height: window.innerHeight
});
bokehPass.renderToScreen = true;
renderer.logarithmicDepthBuffer = false;

//composer.addPass(bokehPass)


/*
const bloomComposer = new EffectComposer(renderer);
bloomComposer.setSize(window.innerWidth,window.innerHeight);

bloomComposer.addPass(renderPass);
//bloomComposer.addPass(bloomPass);
*/
//bloomPass.renderToScreen = true;
//renderPass.renderToScreen = true;


composer.renderToScreen = true;




//bloomPass.renderToScreen = true;

//

//Controls
//const controls = new OrbitControls(camera, renderer.domElement);

//CLICK EVENTS
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2()

function onMouseMove(event){ //https://www.youtube.com/watch?v=6oFvqLfRnsU&t=564s
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth)*2-1;
  mouse.y = -(event.clientY / window.innerHeight)*2+1;

  raycaster.setFromCamera(mouse, camera);

  let intersects = raycaster.intersectObjects(scene.children, true);
  //console.log(intersects)
  //console.log(intersects[0].object.name)
  if (intersects[0].object.name == "ship1") //SHIP ANIM
  {
    console.log("Bye bye Boat!")
    if (boatAction.isRunning() == false){
      boatAction.play().reset();
    }
  }
  if (intersects[0].object.name == "lighthouse_glass") //SHIP ANIM
  {
    if (pointLight.power == 3){
      console.log("Lights off!")
      pointLight.power = 0;
    }else if (pointLight.power == 0){
      console.log("Lights on!")
      pointLight.power = 3;
    }
  }
  if (scroll > 120) //Squid ANIM
  {
    console.log("Squid poke!")
    if (squidAction.isRunning() == false){
      squidAction.play().reset();
    }
  }

  /*
  for (let i = 0; i < intersects.length; i++){
    console.log(intersects[0].object.name)
  }
  */
}

window.addEventListener('click', onMouseMove)

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  if (typeof mixer !== 'undefined'){
    mixer.update(clock.getDelta());
  }
  //cube.position.x = 7*(Math.cos(scroll/1));
  //cube.position.y = 7-scroll;
  //cube.position.z = 7*(Math.sin(scroll/1));
  //camera.rotation.x = Math.PI;
  //cube.rotation.y = Math.PI/4;
  //cube.lookAt( 0,cube.position.y-5,0)
  //console.log(cube.getWorldDirection());
  /*
  camX = [10,2,4.8829,-4.9499,-10,-12.0172]
  camY = [7,8,7,3.5,2,0]
  camZ = [10,2,-1.0755,-0.7056,-5,-8.9771]
  camRX = [0,1,0,0,-6,0]
  camRY = [3,7,6,2.5,-1,-1]
  camRZ = [0,0,0,0,0,-2,0]
  */


  if (scroll < 0){
    camera.position.x = 10;
    camera.position.y = 7;
    camera.position.z = 10;
    camera.lookAt(0,3,0);
  }else if (scroll < 30){ //Formula:  (INITAL POSITION)+((POSITION_OFFSET)*(scroll-(INITIAL_SCROLL))/(TOTAL_SCROLL))
    camera.position.x = 10+(-8*(scroll-0)/30); //END VALUE 2
    camera.position.y = 7+(1*(scroll-0)/30);; //END VALUE 8
    camera.position.z = 10+(-8*(scroll-0)/30); //END VALUE 2
    camera.lookAt(1*(scroll-0)/30,3+(4*(scroll-0)/30),0); //END VALUE 1, 7, 0
  }else if (scroll < 40){
    camera.position.x = 2+(+2.8829*(scroll-30)/10); //START: 2 END: 4.8829 DIFF: -2.8829
    camera.position.y = 8+(-1*(scroll-30)/10); //START: 8 END: 7
    camera.position.z = 2+(-3.0755*(scroll-30)/10); //START: 2 END: -1.0755
    camera.lookAt(1+(-1*(scroll-30)/10),7+(-1*(scroll-30)/10),0); //X{START: 1 END:0} Y{START: 7 END:6}
  }else if (scroll < 75){
    camera.position.x = 5*(Math.cos((scroll-105)/10));
    camera.position.y = 0.5-(scroll-105)/10;
    camera.position.z = 5*(Math.sin((scroll-105)/10));
    camera.lookAt( 0,camera.position.y-1,0)
  }else if (scroll < 90){
    /* START VALUES
    camera.position.x = -4.9499
    camera.position.y = 3.5
    camera.position.z = -0.7056
    camera.lookAt(0,2.5,0);
    */
    /* END VALUES
    camera.position.x = -10
    camera.position.y = 2
    camera.position.z = -5
    camera.lookAt(-6,-1,-2);
    */
    camera.position.x = -4.9499+(-5.0501*(scroll-75)/15);
    camera.position.y = 3.5+(-1.5*(scroll-75)/15);
    camera.position.z = -0.7056+(-5.7056*(scroll-75)/15);
    camera.lookAt(0+(-6*(scroll-75)/15),2.5+(-3.5*(scroll-75)/15),0+(-2*(scroll-75)/15));
  }else if(scroll < 100){
    /* START VALUES
    camera.position.x = -10
    camera.position.y = 2
    camera.position.z = -5
    camera.lookAt(-6,-1,-2);
    */
    /* END VALUES
    camera.position.x = -12.0172
    camera.position.y = 0
    camera.position.z = -8.9771
    camera.lookAt(0,-1,0);
    */
    camera.position.x = -10+(-2.0172*(scroll-90)/10);
    camera.position.y = 2+(-2*(scroll-90)/10);
    camera.position.z = -5+(-3.9771*(scroll-90)/10);
    camera.lookAt(-6+(6*(scroll-90)/10),-1,-2+(2*(scroll-90)/10));
  }else{
    camera.position.x = 15*(Math.cos((scroll-125)/10));
    camera.position.y = -2.5-(scroll-125)/10;
    camera.position.z = 15*(Math.sin((scroll-125)/10));
    camera.lookAt( 0,camera.position.y-1,0)
  }
  
  
  /*
  camera.position.x = 15*(Math.cos((scroll-25)/10));
  camera.position.y = -2.5-(scroll-25)/10;
  camera.position.z = 15*(Math.sin((scroll-25)/10));
  camera.lookAt( 0,camera.position.y-1,0)
  */
  

  //camera.rotation.y = Math.PI/4;
  //cube.rotation.z += 0.01;
  //controls.update();

  //TINT
  if (camera.position.y<-2){ //#1B3669 //0x366CCF
    ambientLight.color = new THREE.Color(0x1B3669)
    pointLight.color = new THREE.Color(0x1B3669)
    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    scene.background = new THREE.Color(0x0D131A); //0D131A
    scene.fog = new THREE.FogExp2(0x0D131A,0.05); //0x1B3669 //1C262B
    bloomPass.strength = 0.75;
    hemiLight.intensity = 0.01;
    dirLight.intensity = 0;
    ambientLight.intensity = 0.25;
    
  }else{
    ambientLight.color = new THREE.Color(0xF0A066) //0xFFFFFF
    scene.background = new THREE.Color(0xF0A066); //0xBF4B8B //0x87ceeb
    scene.fog = new THREE.FogExp2(0xF0A066,0.01); //0x87ceeb //0xE7C095
    bloomPass.strength = 0.2;
    dirLight.color = new THREE.Color(0xF0A066); //0xFFFFFF
    hemiLight.color = new THREE.Color(0xF0A066);
    dirLight.intensity = 1;
    hemiLight.intensity = 0.75;
    ambientLight.intensity = 0.25;
    pointLight.color = new THREE.Color(0x9C942D);
  }
  //renderer.render( scene, camera);
  composer.render();
}

animate()

