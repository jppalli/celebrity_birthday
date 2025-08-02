let scene, camera, renderer, road, car;
let speed = 0;
let position = 0;
let playerX = 0;

// Game settings
const ROAD_LENGTH = 1000;
const ROAD_WIDTH = 20;
const MAX_SPEED = 5;

function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x87CEEB, 1, 300);
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 3, 0);
    camera.lookAt(0, 0, 100);

    // Create renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x87CEEB); // Sky blue
    document.body.appendChild(renderer.domElement);

    // Create road
    createRoad();
    
    // Create car
    createCar();
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 100, 0);
    scene.add(directionalLight);

    // Add event listeners
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // Start animation
    animate();
}

function createRoad() {
    // Create road segments
    road = new THREE.Group();
    
    // Road surface
    const roadGeometry = new THREE.PlaneGeometry(ROAD_WIDTH, ROAD_LENGTH);
    const roadMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x404040,
        side: THREE.DoubleSide
    });
    const roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);
    roadMesh.rotation.x = -Math.PI / 2;
    roadMesh.position.z = ROAD_LENGTH / 2;
    road.add(roadMesh);

    // Road lines
    const lineGeometry = new THREE.BoxGeometry(0.3, 0.1, 3);
    const lineMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    
    for(let i = 0; i < ROAD_LENGTH; i += 10) {
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.position.z = i;
        road.add(line);
    }

    // Add grass on sides
    const grassGeometry = new THREE.PlaneGeometry(100, ROAD_LENGTH);
    const grassMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x1AB82C,
        side: THREE.DoubleSide
    });
    
    const leftGrass = new THREE.Mesh(grassGeometry, grassMaterial);
    leftGrass.rotation.x = -Math.PI / 2;
    leftGrass.position.set(-ROAD_WIDTH * 2.5, 0, ROAD_LENGTH / 2);
    road.add(leftGrass);
    
    const rightGrass = new THREE.Mesh(grassGeometry, grassMaterial);
    rightGrass.rotation.x = -Math.PI / 2;
    rightGrass.position.set(ROAD_WIDTH * 2.5, 0, ROAD_LENGTH / 2);
    road.add(rightGrass);

    scene.add(road);
}

function createCar() {
    // Simple car body
    const carGeometry = new THREE.BoxGeometry(2, 1, 4);
    const carMaterial = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
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
    if (keys.ArrowUp) {
        speed = Math.min(speed + 0.1, MAX_SPEED);
    } else if (keys.ArrowDown) {
        speed = Math.max(speed - 0.1, 0);
    } else {
        speed *= 0.95; // Natural deceleration
    }

    // Update steering
    if (keys.ArrowLeft) {
        playerX = Math.max(playerX - 0.3, -ROAD_WIDTH/2);
    }
    if (keys.ArrowRight) {
        playerX = Math.min(playerX + 0.3, ROAD_WIDTH/2);
    }

    // Update car position
    car.position.x = playerX;
    
    // Update camera position
    camera.position.x = playerX * 0.5;
    camera.position.z = car.position.z - 7;
    camera.lookAt(playerX, 0, car.position.z + 20);

    // Move road
    position += speed;
    road.position.z = -position % ROAD_LENGTH;

    // Update speed display
    document.getElementById('speed').textContent = 
        `Speed: ${Math.round(speed * 50)} km/h`;
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

// Start the game
init();