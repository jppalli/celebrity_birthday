// Check if Three.js is loaded
if (typeof THREE === 'undefined') {
    console.error('Three.js not loaded!');
    alert('Please make sure Three.js is loaded correctly.');
}

let scene, camera, renderer, road, car;
let speed = 0;
let position = 0;
let playerX = 0;

// Increased road settings
const ROAD_SETTINGS = {
    LENGTH: 2000,          // Longer road segment
    WIDTH: 20,
    SEGMENTS: 3,          // Number of road segments to create infinite effect
    MAX_SPEED: 5
};

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);
    scene.fog = new THREE.Fog(0x87CEEB, 100, 1000); // Add fog for better distance effect

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000 // Increased camera far plane
    );
    camera.position.set(0, 5, -10);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 100, 0);
    scene.add(directionalLight);

    createRoad();
    createCar();

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    animate();
}

function createRoad() {
    road = new THREE.Group();
    
    // Create multiple road segments for infinite effect
    for (let i = 0; i < ROAD_SETTINGS.SEGMENTS; i++) {
        const segment = createRoadSegment();
        segment.position.z = i * ROAD_SETTINGS.LENGTH;
        road.add(segment);
    }
    
    scene.add(road);
}

function createRoadSegment() {
    const segment = new THREE.Group();

    // Main road
    const roadGeometry = new THREE.PlaneGeometry(ROAD_SETTINGS.WIDTH, ROAD_SETTINGS.LENGTH);
    const roadMaterial = new THREE.MeshPhongMaterial({
        color: 0x404040,
        side: THREE.DoubleSide
    });
    const roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);
    roadMesh.rotation.x = -Math.PI / 2;
    roadMesh.position.z = ROAD_SETTINGS.LENGTH / 2;
    segment.add(roadMesh);

    // Road lines
    const lineGeometry = new THREE.BoxGeometry(0.3, 0.1, 5);
    const lineMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    
    // Add more road lines
    for(let i = 0; i < ROAD_SETTINGS.LENGTH; i += 20) {
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.position.z = i;
        segment.add(line);
    }

    // Wider ground/grass
    const groundGeometry = new THREE.PlaneGeometry(200, ROAD_SETTINGS.LENGTH);
    const groundMaterial = new THREE.MeshPhongMaterial({
        color: 0x1ab82c,
        side: THREE.DoubleSide
    });
    
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    ground.position.z = ROAD_SETTINGS.LENGTH / 2;
    segment.add(ground);

    return segment;
}

function createCar() {
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
    // Speed control
    if (keys.ArrowUp) {
        speed = Math.min(speed + 0.1, ROAD_SETTINGS.MAX_SPEED);
    } else if (keys.ArrowDown) {
        speed = Math.max(speed - 0.1, 0);
    } else {
        speed *= 0.95;
    }

    // Steering
    const steeringSensitivity = 0.3 * (speed / ROAD_SETTINGS.MAX_SPEED);
    if (keys.ArrowLeft) {
        playerX = Math.max(playerX - steeringSensitivity, -ROAD_SETTINGS.WIDTH/2);
    }
    if (keys.ArrowRight) {
        playerX = Math.min(playerX + steeringSensitivity, ROAD_SETTINGS.WIDTH/2);
    }

    // Update positions
    car.position.x = playerX;
    position += speed;

    // Infinite road effect
    road.position.z = -(position % ROAD_SETTINGS.LENGTH);
    
    // Move road segments for infinite effect
    road.children.forEach((segment, index) => {
        if (segment.position.z + road.position.z < -ROAD_SETTINGS.LENGTH) {
            segment.position.z += ROAD_SETTINGS.LENGTH * ROAD_SETTINGS.SEGMENTS;
        }
    });

    // Camera follow
    const idealCameraX = playerX * 0.5;
    camera.position.x += (idealCameraX - camera.position.x) * 0.1;
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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);