import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader";

let canvas = document.getElementById("TBvase");

const scene = new THREE.Scene();
// const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper);
const loader = new GLTFLoader();
const dLoader = new DRACOLoader();
dLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
);
dLoader.setDecoderConfig({ type: "js" });
loader.setDRACOLoader(dLoader);
loader.load(
  "img/vaseNe.glb",
  function (glb) {
    console.log(glb);
    const root = glb.scene;

    scene.add(root);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "%loaded");
  },
  function (error) {
    console.error(error);
  }
);
// const light = new THREE.DirectionalLight(0xffffff, 2.8);
// light.position.set(0, 0, 5);
let lightNumber = 2.8;
const light = new THREE.AmbientLight(0xffffff, lightNumber);

scene.add(light);

const sizes = {
  innerWidth: (window.innerWidth / 10) * 5,
  innerHeight: (window.innerWidth / 10) * 5 * (9 / 16),
};
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.innerWidth / sizes.innerHeight,
  0.1,
  100
);

camera.position.set(0, 1, 7);
scene.add(camera);

const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load("./img/nen.png");
document.getElementById("btn1").onclick = function () {
  scene.background = textureLoader.load("./img/nen.png");
};
document.getElementById("btn2").onclick = function () {
  scene.background = textureLoader.load("./img/background-ban-go-04.jpg");
};
document.getElementById("btn3").onclick = function () {
  ++lightNumber;
  light.intensity = lightNumber;
};
document.getElementById("btn4").onclick = function () {
  --lightNumber;
  light.intensity = lightNumber;
};
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
const orbit = new OrbitControls(camera, renderer.domElement);

renderer.setSize(sizes.innerWidth, sizes.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enable = true;
renderer.gammaOutput = true;
orbit.update();
renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
