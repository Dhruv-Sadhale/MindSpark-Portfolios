import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Background = () => {
  const mountRef = useRef(null);
  const canvasRef = useRef(null); // Ref to store the canvas element

  useEffect(() => {
    let scene, camera, renderer, stars;

    // Initialize Three.js scene
    function init() {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 100;

      renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.current });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Create stars
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      for (let i = 0; i < 1000; i++) {
        const x = Math.random() * 600 - 300;
        const y = Math.random() * 600 - 300;
        const z = Math.random() * 1000 - 500;
        vertices.push(x, y, z);
      }
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

      const material = new THREE.PointsMaterial({ color: 0xffffff });
      stars = new THREE.Points(geometry, material);
      scene.add(stars);

      animate();
    }

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // Rotate stars based on mouse movement
      stars.rotation.x += 0.0005;
      stars.rotation.y += 0.0005;

      // Move stars based on mouse position
      stars.position.x = (window.innerWidth / 2 - window.mouseX) * 0.1;
      stars.position.y = (window.innerHeight / 2 - window.mouseY) * 0.1;

      renderer.render(scene, camera);
    }

    // Handle window resize
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Mouse move handler
    function handleMouseMove(event) {
      window.mouseX = event.clientX - window.innerWidth / 2;
      window.mouseY = event.clientY - window.innerHeight / 2;
    }

    init();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up Three.js scene and event listeners on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      scene.remove(stars);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }} />;
};

export default Background;
