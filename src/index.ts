import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1_000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#c5e5ff");

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial({ color: "#ffff94" });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

const hemLight = new THREE.HemisphereLight("#fff", "#bbb", 1);
scene.add(hemLight);

const reticle = new THREE.Mesh(
  new THREE.RingBufferGeometry(0.015, 0.02, 32),
  new THREE.MeshBasicMaterial({
    color: "#cc2222",
    // blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  })
);
scene.add(reticle);

reticle.position.z = -0.3;

camera.add(reticle);
camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.005;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();

function onMouseMove(e: MouseEvent) {
  if (document.pointerLockElement !== renderer.domElement) {
    return;
  }

  // TODO: add sensitivity adjustments here
  camera.rotateY((e.movementX / 500) * -1);
  camera.rotateX((e.movementY / 500) * -1);
}

renderer.domElement.addEventListener("click", () => {
  renderer.domElement.requestPointerLock();
});

window.addEventListener("mousemove", onMouseMove);
