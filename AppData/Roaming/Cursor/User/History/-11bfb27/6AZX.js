// Check if Three.js is loaded
if (typeof THREE === 'undefined') {
    console.error('Three.js not loaded!');
    alert('Please make sure Three.js is loaded correctly.');
}

let scene, camera, renderer, road, car;
let marioGroup, peachGroup, hair;
let speed = 0;
let position = 0;
let playerX = 0;

const ROAD = {
    LENGTH: 2000,
    WIDTH: 20,
    SEGMENTS: 3,
    CURVES: [
        { start: 0, length: 500, curve: 0 },      // Straight
        { start: 500, length: 500, curve: 3 },    // Right curve
        { start: 1000, length: 500, curve: -2 },  // Left curve
        { start: 1500, length: 500, curve: 0 }    // Straight
    ]
};

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);
    scene.fog = new THREE.Fog(0x87CEEB, 100, 1000);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 5, -10);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(100, 100, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;
    scene.add(directionalLight);

    createRoad();
    createCar();

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
}

function createRoad() {
    road = new THREE.Group();
    
    for (let i = 0; i < ROAD.SEGMENTS; i++) {
        const segment = createRoadSegment();
        segment.position.z = i * ROAD.LENGTH;
        road.add(segment);
    }
    
    scene.add(road);
}

function getRoadCurve(position) {
    const segmentPosition = position % ROAD.LENGTH;
    for (const curve of ROAD.CURVES) {
        if (segmentPosition >= curve.start && segmentPosition < curve.start + curve.length) {
            return curve.curve;
        }
    }
    return 0;
}

function createRoadSegment() {
    const segment = new THREE.Group();
    const segments = 50; // Number of subdivisions for smooth curves

    // Create curved road geometry
    const roadShape = new THREE.Shape();
    roadShape.moveTo(-ROAD.WIDTH/2, 0);
    roadShape.lineTo(ROAD.WIDTH/2, 0);

    const extrudeSettings = {
        steps: segments,
        depth: ROAD.LENGTH,
        bevelEnabled: false
    };

    const roadGeometry = new THREE.ExtrudeGeometry(roadShape, extrudeSettings);
    
    // Modify vertices to create curve
    const vertices = roadGeometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
        const z = vertices[i + 2];
        const curveOffset = getRoadCurve(z) * (z / ROAD.LENGTH);
        vertices[i] += curveOffset;
    }
    roadGeometry.attributes.position.needsUpdate = true;

    const roadMaterial = new THREE.MeshPhongMaterial({
        color: 0x404040,
        side: THREE.DoubleSide
    });
    
    const roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);
    roadMesh.rotation.x = -Math.PI / 2;
    roadMesh.receiveShadow = true;
    segment.add(roadMesh);

    // Add road lines following the curve
    for(let i = 0; i < ROAD.LENGTH; i += 20) {
        const curveOffset = getRoadCurve(i) * (i / ROAD.LENGTH);
        
        const lineGeometry = new THREE.BoxGeometry(0.3, 0.1, 5);
        const lineMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        
        line.position.set(curveOffset, 0.05, i);
        segment.add(line);
    }

    // Add curved ground/grass
    const groundGeometry = new THREE.PlaneGeometry(200, ROAD.LENGTH, 50, 1);
    const groundMaterial = new THREE.MeshPhongMaterial({
        color: 0x1ab82c,
        side: THREE.DoubleSide
    });

    // Modify ground vertices to follow road curve
    const groundVerts = groundGeometry.attributes.position.array;
    for (let i = 0; i < groundVerts.length; i += 3) {
        const z = groundVerts[i + 1]; // Y is Z when rotated
        const curveOffset = getRoadCurve(z) * (z / ROAD.LENGTH);
        groundVerts[i] += curveOffset;
    }
    groundGeometry.attributes.position.needsUpdate = true;

    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    ground.receiveShadow = true;
    segment.add(ground);

    return segment;
}

function createCar() {
    car = new THREE.Group();

    // Ferrari body
    const bodyGeometry = new THREE.BoxGeometry(2.4, 0.5, 4.8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFF0000,
        specular: 0x555555,
        shininess: 30 
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    body.castShadow = true;
    car.add(body);

    // Windshield
    const windshieldGeometry = new THREE.BoxGeometry(2, 0.4, 1.8);
    const windshieldMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x222222,
        opacity: 0.7,
        transparent: true 
    });
    const windshield = new THREE.Mesh(windshieldGeometry, windshieldMaterial);
    windshield.position.set(0, 1, -0.3);
    windshield.castShadow = true;
    car.add(windshield);

    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16);
    const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const wheelPositions = [
        [-1.2, 0.4, 1.5],   // Front left
        [1.2, 0.4, 1.5],    // Front right
        [-1.2, 0.4, -1.5],  // Rear left
        [1.2, 0.4, -1.5]    // Rear right
    ];

    wheelPositions.forEach(position => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(...position);
        wheel.castShadow = true;
        car.add(wheel);
    });

    // Mario (driver)
    marioGroup = new THREE.Group();
    
    // Mario's overalls
    const overallsGeometry = new THREE.BoxGeometry(0.4, 0.5, 0.4);
    const overallsMaterial = new THREE.MeshPhongMaterial({ color: 0x0000FF });
    const overalls = new THREE.Mesh(overallsGeometry, overallsMaterial);
    marioGroup.add(overalls);

    // Mario's shirt
    const shirtGeometry = new THREE.BoxGeometry(0.4, 0.3, 0.4);
    const shirtMaterial = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
    const shirt = new THREE.Mesh(shirtGeometry, shirtMaterial);
    shirt.position.y = 0.3;
    marioGroup.add(shirt);

    // Mario's head
    const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const skinMaterial = new THREE.MeshPhongMaterial({ color: 0xFFC896 });
    const head = new THREE.Mesh(headGeometry, skinMaterial);
    head.position.y = 0.6;
    marioGroup.add(head);

    // Mario's cap
    const capGeometry = new THREE.BoxGeometry(0.35, 0.12, 0.35);
    const capMaterial = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
    const cap = new THREE.Mesh(capGeometry, capMaterial);
    cap.position.y = 0.75;
    marioGroup.add(cap);

    marioGroup.position.set(-0.4, 1.0, 0);
    car.add(marioGroup);

    // Princess Peach
    peachGroup = new THREE.Group();

    // Peach's dress
    const dressGeometry = new THREE.ConeGeometry(0.3, 0.8, 8);
    const dressMaterial = new THREE.MeshPhongMaterial({ color: 0xFFB6C1 });
    const dress = new THREE.Mesh(dressGeometry, dressMaterial);
    peachGroup.add(dress);

    // Peach's crown
    const crownGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.15, 8);
    const crownMaterial = new THREE.MeshPhongMaterial({ color: 0xFFD700 });
    const crown = new THREE.Mesh(crownGeometry, crownMaterial);
    crown.position.y = 0.9;
    peachGroup.add(crown);

    // Peach's hair
    const hairGeometry = new THREE.BoxGeometry(0.4, 0.6, 0.3);
    const hairMaterial = new THREE.MeshPhongMaterial({ color: 0xFFD700 });
    hair = new THREE.Mesh(hairGeometry, hairMaterial);
    hair.position.y = 0.5;
    hair.position.z = -0.1;
    peachGroup.add(hair);

    peachGroup.position.set(0.4, 1.0, 0);
    car.add(peachGroup);

    car.position.set(0, 0, 0);
    scene.add(car);
}

function animateCharacters() {
    if (marioGroup && peachGroup && hair) {
        const time = Date.now() * 0.001;
        marioGroup.position.y = 1.0 + Math.sin(time * 2) * 0.05;
        peachGroup.position.y = 1.0 + Math.cos(time * 2) * 0.05;
        hair.position.z = -0.1 + Math.sin(time * 3) * 0.05;
    }
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
    if (keys.ArrowUp) speed = Math.min(speed + 0.1, 5);
    if (keys.ArrowDown) speed = Math.max(speed - 0.1, 0);
    if (!keys.ArrowUp && !keys.ArrowDown) speed *= 0.95;

    const currentCurve = getRoadCurve(position);
    const curveForce = currentCurve * (speed / 5);

    if (keys.ArrowLeft) {
        playerX = Math.max(playerX - 0.3, -8);
    }
    if (keys.ArrowRight) {
        playerX = Math.min(playerX + 0.3, 8);
    }
    
    playerX += curveForce * 0.05;
    playerX = Math.max(Math.min(playerX, 8), -8);

    if (car) {
        car.rotation.z = -curveForce * 0.1;
        car.position.x = playerX;
        position += speed;
        road.position.z = -(position % ROAD.LENGTH);
    }

    camera.position.x = playerX * 0.5 + curveForce;
    camera.position.z = -10;
    camera.lookAt(playerX + curveForce * 2, 0, 20);

    animateCharacters();

    document.getElementById('speed').textContent = `Speed: ${Math.round(speed * 50)} km/h`;
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
animate();