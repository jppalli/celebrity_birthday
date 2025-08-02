import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OutRun-style colors
const COLORS = {
    SKY: new THREE.Color(0xFF6B6B),
    ROAD_DARK: new THREE.Color(0x2D2D2D),
    ROAD_LIGHT: new THREE.Color(0x3C3C3C),
    GRASS: new THREE.Color(0x1A4D1A),
    RUMBLE: new THREE.Color(0xFFD700)
};

// Camera setup
camera.position.set(0, 5, 15);
camera.lookAt(0, 2, 0);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 50, 0);
scene.add(directionalLight);

// Road parameters
const ROAD_LENGTH = 1000;
const ROAD_WIDTH = 8;
const SEGMENT_LENGTH = 20;
let roadPosition = 0;
let playerSpeed = 0;
let playerX = 0;

// Create road geometry
const roadGeometry = new THREE.PlaneGeometry(ROAD_WIDTH, ROAD_LENGTH, 20, ROAD_LENGTH/SEGMENT_LENGTH);
const roadMaterial = new THREE.MeshPhongMaterial({
    vertexColors: true,
    side: THREE.DoubleSide
});
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.rotation.x = -Math.PI / 2;
scene.add(road);

// Generate road geometry with curves and hills
const positionAttribute = roadGeometry.getAttribute('position');
const colorAttribute = new THREE.BufferAttribute(new Float32Array(positionAttribute.count * 3), 3);

for (let i = 0; i < positionAttribute.count; i++) {
    const x = positionAttribute.getX(i);
    const z = positionAttribute.getY(i); // Because plane is rotated
    
    // Add curves and hills
    const curve = Math.sin(z * 0.02) * 10;
    const hill = Math.sin(z * 0.01) * 5;
    
    positionAttribute.setXYZ(i, x + curve, hill, z);
    
    // Color stripes
    const isRumble = Math.abs(x) > ROAD_WIDTH/2 - 0.5;
    const isLane = Math.abs(x % 2) < 0.2;
    const color = isRumble ? COLORS.RUMBLE : 
                 (Math.floor(z/SEGMENT_LENGTH) % 2 ? COLORS.ROAD_DARK : COLORS.ROAD_LIGHT);
    
    colorAttribute.setXYZ(i, color.r, color.g, color.b);
}
roadGeometry.setAttribute('color', colorAttribute);
roadGeometry.computeVertexNormals();

// Player car
const carGeometry = new THREE.BoxGeometry(2, 1, 3);
const carMaterial = new THREE.MeshPhongMaterial({ color: 0xFF3300 });
const car = new THREE.Mesh(carGeometry, carMaterial);
car.position.y = 0.5;
scene.add(car);

// Environment
const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
const skyMaterial = new THREE.MeshBasicMaterial({ 
    color: COLORS.SKY,
    side: THREE.BackSide
});
const sky = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(sky);

// Palm trees
const createPalmTree = () => {
    const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.4, 5),
        new THREE.MeshPhongMaterial({ color: 0x4A3728 })
    );
    const leaves = new THREE.Mesh(
        new THREE.SphereGeometry(3),
        new THREE.MeshPhongMaterial({ color: 0x2D5A27 })
    );
    leaves.position.y = 3;
    
    const palm = new THREE.Group();
    palm.add(trunk);
    palm.add(leaves);
    return palm;
};

// Add palm trees
for (let z = -ROAD_LENGTH/2; z < ROAD_LENGTH/2; z += 50) {
    const palm = createPalmTree();
    palm.position.z = z;
    palm.position.x = Math.random() > 0.5 ? ROAD_WIDTH/2 + 5 : -ROAD_WIDTH/2 -5;
    scene.add(palm);
}

// Controls
const keys = {};
document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

// Game loop
function animate() {
    requestAnimationFrame(animate);

    // Controls
    const MAX_SPEED = 0.5;
    const ACCEL = 0.005;
    const TURN = 0.05;
    
    if (keys.ArrowUp) playerSpeed = Math.min(playerSpeed + ACCEL, MAX_SPEED);
    if (keys.ArrowDown) playerSpeed = Math.max(playerSpeed - ACCEL, -MAX_SPEED/2);
    
    if (keys.ArrowLeft) playerX = THREE.MathUtils.clamp(playerX - TURN, -ROAD_WIDTH/2 + 1, ROAD_WIDTH/2 - 1);
    if (keys.ArrowRight) playerX = THREE.MathUtils.clamp(playerX + TURN, -ROAD_WIDTH/2 + 1, ROAD_WIDTH/2 - 1);

    // Update positions
    roadPosition += playerSpeed;
    road.position.z = roadPosition % ROAD_LENGTH;
    car.position.x = playerX;
    
    // Camera follow
    camera.position.z = car.position.z + 15;
    camera.position.x = car.position.x * 0.5;
    camera.lookAt(car.position.x, 2, car.position.z + 10);

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});