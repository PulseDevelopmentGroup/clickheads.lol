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

const crosshairMat = new THREE.LineBasicMaterial({ color: "#ff5555" });

const crosshairSize = 0.01;

const crosshairGeo = new THREE.Geometry();

crosshairGeo.vertices.push(new THREE.Vector3(0, crosshairSize, 0));
crosshairGeo.vertices.push(new THREE.Vector3(0, -crosshairSize, 0));
crosshairGeo.vertices.push(new THREE.Vector3(0, 0, 0));
crosshairGeo.vertices.push(new THREE.Vector3(crosshairSize, 0, 0));
crosshairGeo.vertices.push(new THREE.Vector3(-crosshairSize, 0, 0));

const crosshair = new THREE.Line(crosshairGeo, crosshairMat);

crosshair.position.z = -0.3;

camera.add(crosshair);
scene.add(camera);

const gridXZ = new THREE.GridHelper(100, 10);
scene.add(gridXZ);

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
