// Check if Three.js is loaded
if (typeof THREE === 'undefined') {
    console.error('Three.js not loaded!');
    alert('Please make sure Three.js is loaded correctly.');
}

let scene, camera, renderer, road, car;
let speed = 0;
let position = 0;
let playerX = 0;

let currentCurve = 0;
let targetCurve = 0;
let currentTime = 0;

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

    // Create curved road geometry
    const roadGeometry = new THREE.PlaneGeometry(
        ROAD_SETTINGS.WIDTH, 
        ROAD_SETTINGS.LENGTH,
        20,  // More segments for smooth curves
        50   // More segments for smooth bending
    );
    
    // Apply curve to road vertices
    const vertices = roadGeometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
        const z = vertices[i + 2];
        const curveOffset = Math.sin(z * 0.01) * 20;  // Adjust curve intensity
        vertices[i] += curveOffset;
    }
    roadGeometry.attributes.position.needsUpdate = true;

    const roadMaterial = new THREE.MeshPhongMaterial({
        color: 0x404040,
        side: THREE.DoubleSide
    });
    const roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);
    roadMesh.rotation.x = -Math.PI / 2;
    roadMesh.position.z = ROAD_SETTINGS.LENGTH / 2;
    segment.add(roadMesh);

    // Create curved ground
    const groundGeometry = new THREE.PlaneGeometry(200, ROAD_SETTINGS.LENGTH, 20, 50);
    // Apply same curve to ground
    const groundVertices = groundGeometry.attributes.position.array;
    for (let i = 0; i < groundVertices.length; i += 3) {
        const z = groundVertices[i + 2];
        const curveOffset = Math.sin(z * 0.01) * 20;
        groundVertices[i] += curveOffset;
    }
    groundGeometry.attributes.position.needsUpdate = true;

    const groundMaterial = new THREE.MeshPhongMaterial({
        color: 0x1ab82c,
        side: THREE.DoubleSide
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    ground.position.z = ROAD_SETTINGS.LENGTH / 2;
    segment.add(ground);

    // Add road lines following the curve
    const lineGeometry = new THREE.BoxGeometry(0.3, 0.1, 5);
    const lineMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    
    for(let i = 0; i < ROAD_SETTINGS.LENGTH; i += 20) {
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.position.z = i;
        line.position.x = Math.sin(i * 0.01) * 20;  // Match road curve
        segment.add(line);
    }

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

    // Update curve
    currentTime += speed * 0.01;
    currentCurve = Math.sin(currentTime) * 20;

    // Steering with curve compensation
    const steeringSensitivity = 0.3 * (speed / ROAD_SETTINGS.MAX_SPEED);
    const curveForce = (currentCurve * speed * 0.02);  // Car follows curve naturally

    if (keys.ArrowLeft) {
        playerX = Math.max(playerX - steeringSensitivity, -ROAD_SETTINGS.WIDTH/2);
    }
    if (keys.ArrowRight) {
        playerX = Math.min(playerX + steeringSensitivity, ROAD_SETTINGS.WIDTH/2);
    }

    // Apply curve force to player position
    playerX += curveForce;
    playerX = Math.max(Math.min(playerX, ROAD_SETTINGS.WIDTH/2), -ROAD_SETTINGS.WIDTH/2);

    // Update car position and rotation
    car.position.x = playerX;
    car.rotation.y = (curveForce * 0.5) + (keys.ArrowLeft ? 0.2 : keys.ArrowRight ? -0.2 : 0);

    position += speed;

    // Infinite road effect with curve offset
    road.position.z = -(position % ROAD_SETTINGS.LENGTH);
    
    road.children.forEach((segment, index) => {
        if (segment.position.z + road.position.z < -ROAD_SETTINGS.LENGTH) {
            segment.position.z += ROAD_SETTINGS.LENGTH * ROAD_SETTINGS.SEGMENTS;
        }
    });

    // Camera follows with curve
    const idealCameraX = playerX * 0.5 + currentCurve * 0.5;
    camera.position.x += (idealCameraX - camera.position.x) * 0.1;
    camera.position.z = car.position.z - 10;
    camera.lookAt(playerX + currentCurve * 0.5, 0, car.position.z + 20);

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

// Add this function to generate new curves
function generateNewCurve() {
    targetCurve = (Math.random() - 0.5) * 40;  // Random curve intensity
}

// Call this periodically to change curves
setInterval(generateNewCurve, 5000);  // New curve every 5 seconds