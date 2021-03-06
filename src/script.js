import "./style.css";
import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//import imgSrc from "./textures/door/color.jpg";

//Dat Ui instance
const ui = new dat.GUI();

//CURSOR
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = -(e.clientY / sizes.height - 0.5);
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//Loading manager
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("Start");
};
loadingManager.onProgress = () => {
  console.log("Progress");
};
loadingManager.onLoad = () => {
  console.log("Load");
};

//Texture
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("/textures/door/color.jpg");
// colorTexture.repeat.x = 3;
// colorTexture.repeat.y = 2;
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;
colorTexture.rotation = Math.PI / 4;
colorTexture.center.x = 0.5;
colorTexture.center.y = 0.5;

// Object
const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
//const geometry = new THREE.SphereBufferGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
//DEBUG
ui.add(mesh.position, "x", -3, 3, 0.001);
ui.add(mesh.position, "y", -3, 3, 0.001);
ui.add(mesh.position, "z", -3, 3, 0.001);

ui.add(material, "wireframe");
const perameters = {
  color: 0xff0000,
  spin: () => {},
};
ui.addColor(perameters, "color").onChange(() => {
  material.color.set(perameters.color);
});

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

//Orbit control
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const animation = () => {
  //   camera.position.x = cursor.x * 3;
  //   camera.position.y = cursor.y * 3;
  //   camera.lookAt(new THREE.Vector3());

  //UPDATE DAMPING FOR ORBIT CONTROL
  orbitControls.update();
  //Render
  renderer.render(scene, camera);

  //Request animationframe
  window.requestAnimationFrame(animation);
};
animation();
