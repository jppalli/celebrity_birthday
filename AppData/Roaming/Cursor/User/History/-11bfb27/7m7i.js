// Check if Three.js is loaded
if (typeof THREE === 'undefined') {
    console.error('Three.js not loaded!');
    alert('Please make sure Three.js is loaded correctly.');
}

let scene, camera, renderer, road, car;
let speed = 0;
let position = 0;
let playerX = 0;

// Game settings
const ROAD_LENGTH = 2000;  // Made longer
const ROAD_WIDTH = 20;
const MAX_SPEED = 5;
const SEGMENT_LENGTH = 100;  // Added segment length
const TOTAL_SEGMENTS = Math.ceil(ROAD_LENGTH / SEGMENT_LENGTH) * 2;  // Double segments to prevent flickering

function init() {
    // Initialize scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Sky blue

    // Initialize camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 5, -10);
    camera.lookAt(0, 0, 0);

    // Initialize renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 0);
    scene.add(directionalLight);

    // Create basic road
    createRoad();

    // Create basic car
    createCar();

    // Add event listeners
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // Start animation
    animate();
}

function createRoad() {
    // Create a simple road plane
    const roadGeometry = new THREE.PlaneGeometry(20, 1000);
    const roadMaterial = new THREE.MeshPhongMaterial({
        color: 0x404040,
        side: THREE.DoubleSide
    });
    road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.rotation.x = -Math.PI / 2;
    road.position.z = 500;
    scene.add(road);

    // Add ground plane
    const groundGeometry = new THREE.PlaneGeometry(100, 1000);
    const groundMaterial = new THREE.MeshPhongMaterial({
        color: 0x1ab82c,
        side: THREE.DoubleSide
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    ground.position.z = 500;
    scene.add(ground);
}

function createCar() {
    // Create a simple car cube
    const carGeometry = new THREE.BoxGeometry(2, 1, 4);
    const carMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    car = new THREE.Mesh(carGeometry, carMaterial);
    car.position.set(0, 0.5, 0);
    scene.add(car);
}

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

function onKeyDown(event) {
    if (keys.hasOwnProperty(event.code)) {
        keys[event.code] = true;
    }
}

function onKeyUp(event) {
    if (keys.hasOwnProperty(event.code)) {
        keys[event.code] = false;
    }
}

function updateGame() {
    // Update speed
    if (keys.ArrowUp) speed = Math.min(speed + 0.1, 5);
    if (keys.ArrowDown) speed = Math.max(speed - 0.1, 0);
    if (!keys.ArrowUp && !keys.ArrowDown) speed *= 0.95;

    // Update steering
    if (keys.ArrowLeft) playerX = Math.max(playerX - 0.3, -8);
    if (keys.ArrowRight) playerX = Math.min(playerX + 0.3, 8);

    // Update positions
    car.position.x = playerX;
    position += speed;
    road.position.z = -position % 1000;

    // Update camera
    camera.position.x = playerX * 0.5;
    camera.position.z = car.position.z - 10;
    camera.lookAt(playerX, 0, car.position.z + 20);

    // Update speed display
    const speedDisplay = document.getElementById('speed');
    if (speedDisplay) {
        speedDisplay.textContent = `Speed: ${Math.round(speed * 50)} km/h`;
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    updateGame();
    renderer.render(scene, camera);
}

// Make sure the DOM is loaded before initializing
document.addEventListener('DOMContentLoaded', () => {
    console.log('Starting game...');
    init();
});