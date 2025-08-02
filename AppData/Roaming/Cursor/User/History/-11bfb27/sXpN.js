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

    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        shadowMap: {
            enabled: true,
            type: THREE.PCFSoftShadowMap
        }
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(100, 100, 0);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 500;
    sunLight.shadow.camera.left = -100;
    sunLight.shadow.camera.right = 100;
    sunLight.shadow.camera.top = 100;
    sunLight.shadow.camera.bottom = -100;
    scene.add(sunLight);

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
    roadMesh.receiveShadow = true;
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
    ground.receiveShadow = true;
    segment.add(ground);

    return segment;
}

function createCar() {
    car = new THREE.Group();

    // Helper function to add shadows to mesh
    function createShadowMesh(geometry, material) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        return mesh;
    }

    // Main car body (Ferrari Testarossa shape)
    const bodyGeometry = new THREE.BoxGeometry(2.4, 0.5, 4.8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: FERRARI_RED,
        specular: 0x555555,
        shininess: 30 
    });
    const body = createShadowMesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    car.add(body);

    // Car cabin/windshield
    const cabinGeometry = new THREE.BoxGeometry(2, 0.4, 1.8);
    const cabinMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x222222,
        opacity: 0.7,
        transparent: true 
    });
    const cabin = createShadowMesh(cabinGeometry, cabinMaterial);
    cabin.position.y = 1;
    cabin.position.z = -0.3;
    car.add(cabin);

    // Front hood
    const hoodGeometry = new THREE.BoxGeometry(2.2, 0.1, 1.5);
    const hood = createShadowMesh(hoodGeometry, bodyMaterial);
    hood.position.y = 0.75;
    hood.position.z = 1.5;
    car.add(hood);

    // Side strakes (Testarossa's distinctive side vents)
    const strakeGeometry = new THREE.BoxGeometry(0.1, 0.3, 2);
    const strakeMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    
    const leftStrake = createShadowMesh(strakeGeometry, strakeMaterial);
    leftStrake.position.set(-1.2, 0.6, 0);
    car.add(leftStrake);
    
    const rightStrake = createShadowMesh(strakeGeometry, strakeMaterial);
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
        const wheel = createShadowMesh(wheelGeometry, wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(pos.x, 0.4, pos.z);
        car.add(wheel);
    });

    // Mario (driver)
    const marioGroup = new THREE.Group();
    
    // Mario's body (blue overalls)
    const overallsGeometry = new THREE.BoxGeometry(0.4, 0.5, 0.4);
    const overallsMaterial = new THREE.MeshPhongMaterial({ color: 0x0000FF }); // Blue
    const overalls = createShadowMesh(overallsGeometry, overallsMaterial);
    marioGroup.add(overalls);

    // Mario's shirt (red)
    const shirtGeometry = new THREE.BoxGeometry(0.4, 0.3, 0.4);
    const shirtMaterial = new THREE.MeshPhongMaterial({ color: 0xFF0000 }); // Red
    const shirt = createShadowMesh(shirtGeometry, shirtMaterial);
    shirt.position.y = 0.3;
    marioGroup.add(shirt);

    // Mario's head
    const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const skinMaterial = new THREE.MeshPhongMaterial({ color: 0xFFC896 }); // Skin tone
    const head = createShadowMesh(headGeometry, skinMaterial);
    head.position.y = 0.6;
    marioGroup.add(head);

    // Mario's cap
    const capGeometry = new THREE.BoxGeometry(0.35, 0.12, 0.35);
    const capMaterial = new THREE.MeshPhongMaterial({ color: 0xFF0000 }); // Red
    const cap = createShadowMesh(capGeometry, capMaterial);
    cap.position.y = 0.75;
    marioGroup.add(cap);

    // Mario's mustache
    const mustacheGeometry = new THREE.BoxGeometry(0.3, 0.05, 0.1);
    const mustacheMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const mustache = createShadowMesh(mustacheGeometry, mustacheMaterial);
    mustache.position.set(0, 0.5, 0.2);
    marioGroup.add(mustache);

    // Position Mario in the car
    marioGroup.position.set(-0.4, 1.0, 0);
    car.add(marioGroup);

    // Princess Peach (passenger)
    const peachGroup = new THREE.Group();

    // Peach's dress
    const dressGeometry = new THREE.ConeGeometry(0.3, 0.8, 8);
    const dressMaterial = new THREE.MeshPhongMaterial({ color: 0xFFB6C1 }); // Pink
    const dress = createShadowMesh(dressGeometry, dressMaterial);
    peachGroup.add(dress);

    // Peach's top
    const topGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const topMaterial = new THREE.MeshPhongMaterial({ color: 0xFFB6C1 }); // Pink
    const top = createShadowMesh(topGeometry, topMaterial);
    top.position.y = 0.4;
    peachGroup.add(top);

    // Peach's head
    const peachHeadGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const peachHead = createShadowMesh(peachHeadGeometry, skinMaterial);
    peachHead.position.y = 0.7;
    peachGroup.add(peachHead);

    // Peach's crown
    const crownGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.15, 8);
    const crownMaterial = new THREE.MeshPhongMaterial({ color: 0xFFD700 }); // Gold
    const crown = createShadowMesh(crownGeometry, crownMaterial);
    crown.position.y = 0.9;
    peachGroup.add(crown);

    // Peach's hair
    const hairGeometry = new THREE.BoxGeometry(0.4, 0.6, 0.3);
    const hairMaterial = new THREE.MeshPhongMaterial({ color: 0xFFD700 }); // Blonde
    const hair = createShadowMesh(hairGeometry, hairMaterial);
    hair.position.y = 0.5;
    hair.position.z = -0.1;
    peachGroup.add(hair);

    // Position Peach in the car
    peachGroup.position.set(0.4, 1.0, 0);
    car.add(peachGroup);

    // Add simple animation to characters
    function animateCharacters() {
        // Gentle bobbing motion
        const time = Date.now() * 0.001;
        marioGroup.position.y = 1.0 + Math.sin(time * 2) * 0.05;
        peachGroup.position.y = 1.0 + Math.cos(time * 2) * 0.05;
        
        // Hair movement
        hair.position.z = -0.1 + Math.sin(time * 3) * 0.05;
    }

    // Position the entire car group
    car.position.set(0, 0, 0);
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

    // Update shadow camera to follow car
    const directionalLight = scene.children.find(child => child instanceof THREE.DirectionalLight);
    if (directionalLight) {
        directionalLight.position.set(
            car.position.x + 100,
            100,
            car.position.z
        );
        directionalLight.target = car;
    }

    animateCharacters();
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