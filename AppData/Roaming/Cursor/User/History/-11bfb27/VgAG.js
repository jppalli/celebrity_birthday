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

function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 5, -10);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    createRoad();
    createCar();

    // Event listeners
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
}

function createRoad() {
    const roadGeometry = new THREE.PlaneGeometry(20, 1000);
    const roadMaterial = new THREE.MeshPhongMaterial({
        color: 0x404040,
        side: THREE.DoubleSide
    });
    road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.rotation.x = -Math.PI / 2;
    road.position.z = 500;
    road.receiveShadow = true;
    scene.add(road);

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(100, 1000);
    const groundMaterial = new THREE.MeshPhongMaterial({
        color: 0x1ab82c,
        side: THREE.DoubleSide
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    ground.position.z = 500;
    ground.receiveShadow = true;
    scene.add(ground);
}

function createCar() {
    // Create main car group
    car = new THREE.Group();

    // Car body (Ferrari)
    const bodyGeometry = new THREE.BoxGeometry(2, 1, 4);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    body.castShadow = true;
    car.add(body);

    // Mario
    marioGroup = new THREE.Group();
    
    // Mario's body
    const marioBody = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.6, 0.4),
        new THREE.MeshPhongMaterial({ color: 0x0000ff }) // Blue overalls
    );
    marioGroup.add(marioBody);

    // Mario's head
    const marioHead = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.4, 0.4),
        new THREE.MeshPhongMaterial({ color: 0xffd700 }) // Skin color
    );
    marioHead.position.y = 0.5;
    marioGroup.add(marioHead);

    // Mario's cap
    const marioCap = new THREE.Mesh(
        new THREE.BoxGeometry(0.45, 0.15, 0.45),
        new THREE.MeshPhongMaterial({ color: 0xff0000 }) // Red cap
    );
    marioCap.position.y = 0.7;
    marioGroup.add(marioCap);

    // Position Mario
    marioGroup.position.set(-0.5, 1.0, -0.5);
    car.add(marioGroup);

    // Peach
    peachGroup = new THREE.Group();

    // Peach's dress
    const peachDress = new THREE.Mesh(
        new THREE.ConeGeometry(0.3, 0.8, 8),
        new THREE.MeshPhongMaterial({ color: 0xffb6c1 }) // Pink
    );
    peachGroup.add(peachDress);

    // Peach's head
    const peachHead = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.3, 0.3),
        new THREE.MeshPhongMaterial({ color: 0xffd700 }) // Blonde
    );
    peachHead.position.y = 0.6;
    peachGroup.add(peachHead);

    // Position Peach
    peachGroup.position.set(0.5, 1.0, -0.5);
    car.add(peachGroup);

    // Add car to scene
    car.position.set(0, 0, 0);
    scene.add(car);
}

function animateCharacters() {
    if (marioGroup && peachGroup) {
        const time = Date.now() * 0.001;
        marioGroup.position.y = 1.0 + Math.sin(time * 2) * 0.05;
        peachGroup.position.y = 1.0 + Math.cos(time * 2) * 0.05;
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
    // Speed control
    if (keys.ArrowUp) speed = Math.min(speed + 0.1, 5);
    if (keys.ArrowDown) speed = Math.max(speed - 0.1, 0);
    if (!keys.ArrowUp && !keys.ArrowDown) speed *= 0.95;

    // Steering
    if (keys.ArrowLeft) playerX = Math.max(playerX - 0.3, -8);
    if (keys.ArrowRight) playerX = Math.min(playerX + 0.3, 8);

    // Update positions
    if (car) {
        car.position.x = playerX;
        position += speed;
        road.position.z = -position % 1000;
    }

    // Animate characters
    animateCharacters();

    // Update camera
    camera.position.x = playerX * 0.5;
    camera.position.z = -10;
    camera.lookAt(playerX, 0, 20);

    // Update speed display
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