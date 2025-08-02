class TheCamino {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        
        // Game state
        this.speed = 0;
        this.gear = 1;
        this.position = 0;
        this.playerX = 0;

        this.init();
    }

    init() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.getElementById('game-container').appendChild(this.renderer.domElement);

        // Setup scene
        this.scene.background = new THREE.Color(0x87CEEB);  // Sky blue
        this.scene.fog = new THREE.Fog(0x87CEEB, 100, 1000);

        // Setup camera
        this.camera.position.set(0, 3, -6);
        this.camera.lookAt(0, 0, 10);

        // Add lights
        this.setupLights();

        // Add event listeners
        this.setupControls();
        window.addEventListener('resize', () => this.onWindowResize(), false);

        // Create initial scene
        this.createScene();

        // Start game loop
        this.animate();
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(100, 100, 50);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
    }

    setupControls() {
        this.keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false,
            Shift: false
        };

        document.addEventListener('keydown', (e) => {
            if (this.keys.hasOwnProperty(e.code)) {
                this.keys[e.code] = true;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (this.keys.hasOwnProperty(e.code)) {
                this.keys[e.code] = false;
            }
        });
    }

    createScene() {
        // Add basic ground
        const groundGeometry = new THREE.PlaneGeometry(100, 1000);
        const groundMaterial = new THREE.MeshPhongMaterial({
            color: 0x1a472a,
            side: THREE.DoubleSide
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.5;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Add placeholder car (will be replaced with El Camino model)
        const carGeometry = new THREE.BoxGeometry(2, 1, 4);
        const carMaterial = new THREE.MeshPhongMaterial({ color: 0x990000 });
        this.car = new THREE.Mesh(carGeometry, carMaterial);
        this.car.position.y = 0.5;
        this.car.castShadow = true;
        this.scene.add(this.car);
    }

    updateGame() {
        // Handle acceleration
        if (this.keys.ArrowUp) {
            this.speed = Math.min(this.speed + 0.1, 5);
        } else if (this.keys.ArrowDown) {
            this.speed = Math.max(this.speed - 0.2, 0);
        } else {
            this.speed *= 0.95; // Natural deceleration
        }

        // Handle steering
        if (this.keys.ArrowLeft) {
            this.playerX = Math.max(this.playerX - 0.3, -8);
        }
        if (this.keys.ArrowRight) {
            this.playerX = Math.min(this.playerX + 0.3, 8);
        }

        // Update car position
        if (this.car) {
            this.car.position.x = this.playerX;
            this.position += this.speed;
            
            // Tilt car during turning
            this.car.rotation.z = -this.playerX * 0.05;
        }

        // Update camera
        this.camera.position.x = this.playerX * 0.5;
        this.camera.lookAt(this.playerX, 0, 10);

        // Update HUD
        document.getElementById('speed').textContent = `Speed: ${Math.round(this.speed * 20)} mph`;
        document.getElementById('gear').textContent = `Gear: ${this.gear}`;
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.updateGame();
        this.renderer.render(this.scene, this.camera);
    }
}

// Start the game when the page loads
window.addEventListener('DOMContentLoaded', () => {
    const game = new TheCamino();
}); 