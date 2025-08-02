import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000); // Set background color to black
document.body.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Create multiple cubes
const cubes = [];
const cubeCount = 5;
const spacing = 2;

for (let i = 0; i < cubeCount; i++) {
    for (let j = 0; j < cubeCount; j++) {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(i * spacing, j * spacing, 0);
        scene.add(cube);
        cubes.push(cube);
    }
}

camera.position.z = 10;

// Handle mouse clicks
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(cubes);

    if (intersects.length > 0) {
        // Change the color of the first intersected cube
        intersects[0].object.material.color.set(Math.random() * 0xffffff);
    }
}

window.addEventListener('click', onMouseClick, false);

function animate() {
    requestAnimationFrame(animate);
    // Rotate all cubes
    cubes.forEach(cube => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    });
    renderer.render(scene, camera);
}

animate();
