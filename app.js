//This is the Three.js in the simplest form
const canvasElement = document.querySelector(".webgl");

//Checking if threejs is loaded
//console.log(THREE);

//Creating a Scene we need 4 element -> Scene, Object, Camera and Renderer

//[STEP 1] Create a scene variable
const scene = new THREE.Scene();

//[STEP 2] Create an Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const meterial = new THREE.MeshBasicMaterial({ color: "#c0c0c0" });
const mesh = new THREE.Mesh(geometry, meterial);
scene.add(mesh);

//[STEP 3] Create a Camera
//size of renderer
const size = {
  width: 800,
  height: 600,
};
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 3;
camera.position.x = 1;
camera.position.y = 1;
scene.add(camera);

//[STEP 4] Create a Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvasElement,
});
renderer.setSize(size.width, size.height);

//Render the 3d
renderer.render(scene, camera);
