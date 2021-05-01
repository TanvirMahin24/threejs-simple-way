import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

//Animation
//let time = Date.now();

//Clock from three js
//const clock = new THREE.Clock();

//GSAP
gsap.to(mesh.position, { x: 2, duration: 3, delay: 1 });

const animation = () => {
  //Time
  //Using vanilla js
  //   const currentTime = Date.now();
  //   const diffTime = currentTime - time;
  //   time = currentTime;

  //THREE clock
  //const elapsedTime = clock.getElapsedTime();

  //console.log(diffTime);

  //Update the object
  //Using vanilla js
  //   mesh.rotation.x += 0.0005 * diffTime;
  //   mesh.rotation.y += 0.0005 * diffTime;

  //using clock from three js
  //   camera.position.x = Math.cos(elapsedTime);
  //   camera.position.y = Math.sin(elapsedTime);
  camera.lookAt(mesh.position);

  //Render
  renderer.render(scene, camera);

  //Request animationframe
  window.requestAnimationFrame(animation);
};
animation();
