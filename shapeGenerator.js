
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let shape, material;

function generateRandomCoefficients(numCoeffs) {
    const coeffs = [];
    for (let i = 0; i < numCoeffs; i++) {
        coeffs.push(Math.random() * 2 - 1); 
    }
    return coeffs;
}

function calculateRadius(angle1, angle2, coeffs) {
    let radius = 0;
    const numCoeffs = coeffs.length;
    for (let i = 0; i < numCoeffs; i++) {
        const amplitude = Math.random() * 5 + 1; 
        radius += amplitude * (coeffs[i] * Math.sin((i + 1) * angle1) * Math.cos((i + 1) * angle2));
    }
    return Math.abs(radius) * 10;
}

function generateShape() {
    const numPoints = 100;
    const numCoeffs = Math.floor(Math.random() * 5) + 5; 
    const coeffs = generateRandomCoefficients(numCoeffs);
    
    let vertices = [];
    
    for (let i = 0; i < numPoints; i++) {
        const theta = (i / numPoints) * Math.PI * 2;
        for (let j = 0; j < numPoints; j++) {
            const phi = (j / numPoints) * Math.PI * 2;
            const radius = calculateRadius(theta, phi, coeffs);
            const x = Math.sin(theta) * Math.cos(phi) * radius;
            const y = Math.sin(theta) * Math.sin(phi) * radius;
            const z = Math.cos(theta) * radius;
            vertices.push(x, y, z);
        }
    }
    
    const positions = new Float32Array(vertices);
    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    if (shape) {
        scene.remove(shape);
    }
    
  
    const hue = Math.random(); 
    const hslColor = new THREE.Color();
    hslColor.setHSL(hue, 1, 0.5);
    
    material = new THREE.PointsMaterial({ size: 0.1, color: hslColor });
    shape = new THREE.Points(bufferGeometry, material);
    scene.add(shape);
}

function animate() {
    requestAnimationFrame(animate);
    
    if (shape) {
        shape.rotation.x += 0.01;
        shape.rotation.y += 0.01;

        // Update the color using HSL
        const hue = (Date.now() % 1000) / 1000; 
        const hslColor = new THREE.Color();
        hslColor.setHSL(hue, 1, 0.5); 
        shape.material.color.set(hslColor);
    }
    
    renderer.render(scene, camera);
}

document.getElementById("randomizeButton").addEventListener("click", generateShape);

camera.position.z = 50;

generateShape();
animate();
