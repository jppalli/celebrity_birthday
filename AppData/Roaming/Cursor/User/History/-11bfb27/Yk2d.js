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

// Add this after your other constants
const FERRARI_RED = 0xFF0000;

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
    car = new THREE.Group();

    // Main car body (Ferrari Testarossa shape)
    const bodyGeometry = new THREE.BoxGeometry(2.4, 0.5, 4.8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: FERRARI_RED,
        specular: 0x555555,
        shininess: 30 
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    car.add(body);

    // Car cabin/windshield
    const cabinGeometry = new THREE.BoxGeometry(2, 0.4, 1.8);
    const cabinMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x222222,
        opacity: 0.7,
        transparent: true 
    });
    const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
    cabin.position.y = 1;
    cabin.position.z = -0.3;
    car.add(cabin);

    // Front hood
    const hoodGeometry = new THREE.BoxGeometry(2.2, 0.1, 1.5);
    const hood = new THREE.Mesh(hoodGeometry, bodyMaterial);
    hood.position.y = 0.75;
    hood.position.z = 1.5;
    car.add(hood);

    // Side strakes (Testarossa's distinctive side vents)
    const strakeGeometry = new THREE.BoxGeometry(0.1, 0.3, 2);
    const strakeMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    
    const leftStrake = new THREE.Mesh(strakeGeometry, strakeMaterial);
    leftStrake.position.set(-1.2, 0.6, 0);
    car.add(leftStrake);
    
    const rightStrake = new THREE.Mesh(strakeGeometry, strakeMaterial);
    rightStrake.position.set(1.2, 0.6, 0);
    car.add(rightStrake);

    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 16);
    const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x111111 });
    
    const wheels = [
        { x: -1.2, z: 1.5 },  // Front left
        { x: 1.2, z: 1.5 },   // Front right
        { x: -1.2, z: -1.5 }, // Rear left
        { x: 1.2, z: -1.5 }   // Rear right
    ];

    wheels.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(pos.x, 0.4, pos.z);
        car.add(wheel);
    });

    // Driver character
    const driverGeometry = new THREE.BoxGeometry(0.4, 0.6, 0.4);
    const driverMaterial = new THREE.MeshPhongMaterial({ color: 0x3366CC }); // Blue shirt
    const driver = new THREE.Mesh(driverGeometry, driverMaterial);
    driver.position.set(-0.4, 1.3, 0);
    car.add(driver);

    // Driver's head
    const headGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const skinMaterial = new THREE.MeshPhongMaterial({ color: 0xFFDBAC });
    const head = new THREE.Mesh(headGeometry, skinMaterial);
    head.position.set(-0.4, 1.7, 0);
    car.add(head);

    // Passenger (blonde girl)
    const passengerGeometry = new THREE.BoxGeometry(0.4, 0.6, 0.4);
    const passengerMaterial = new THREE.MeshPhongMaterial({ color: 0xFF69B4 }); // Pink dress
    const passenger = new THREE.Mesh(passengerGeometry, passengerMaterial);
    passenger.position.set(0.4, 1.3, 0);
    car.add(passenger);

    // Passenger's head with blonde hair
    const passengerHead = new THREE.Mesh(headGeometry, skinMaterial);
    passengerHead.position.set(0.4, 1.7, 0);
    car.add(passengerHead);

    // Blonde hair
    const hairGeometry = new THREE.BoxGeometry(0.4, 0.2, 0.4);
    const hairMaterial = new THREE.MeshPhongMaterial({ color: 0xFFD700 }); // Blonde
    const hair = new THREE.Mesh(hairGeometry, hairMaterial);
    hair.position.set(0.4, 1.8, 0);
    car.add(hair);

    // Add rear spoiler
    const spoilerGeometry = new THREE.BoxGeometry(2.4, 0.1, 0.3);
    const spoiler = new THREE.Mesh(spoilerGeometry, bodyMaterial);
    spoiler.position.set(0, 1, -2.2);
    car.add(spoiler);

    // Add spoiler supports
    const supportGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.1);
    const leftSupport = new THREE.Mesh(supportGeometry, bodyMaterial);
    leftSupport.position.set(-1, 0.85, -2.2);
    car.add(leftSupport);

    const rightSupport = new THREE.Mesh(supportGeometry, bodyMaterial);
    rightSupport.position.set(1, 0.85, -2.2);
    car.add(rightSupport);

    // Position the entire car group
    car.position.set(0, 0, 0);
    scene.add(car);

    // Add car shadow
    const shadowGeometry = new THREE.PlaneGeometry(4, 8);
    const shadowMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.3
    });
    const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.01;
    car.add(shadow);
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