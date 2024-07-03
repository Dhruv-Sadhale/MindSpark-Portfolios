import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Background = () => {
  const mountRef = useRef(null); // Ref to the component mount point
  const canvasRef = useRef(null); // Ref to store the canvas element

  useEffect(() => {
    if (!mountRef.current || !canvasRef.current) return;

    let scene, camera, renderer, stars;

    function init() {
      scene = new THREE.Scene();
    
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / 3500, 1, 1000);
      camera.position.z = 100;
    
      renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.current });
      renderer.setSize(window.innerWidth, 3500);
    
      // Create stars
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      const aspectRatio = window.innerWidth / 3500; // Aspect ratio adjustment
    
      for (let i = 0; i < 35000; i++) { // Increased number of stars
        const x = Math.random() * 800 * aspectRatio - (600 * aspectRatio); // Adjusted range for x position
        const y = Math.random() * 800 - 1000; // Adjusted range for y position
        const z = Math.random() * 1000 ; // Adjusted range for z position
        vertices.push(x, y, z);
      }
    
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    
      const material = new THREE.PointsMaterial({ size: 0.2, color: 0xffffff }); // Adjusted size of stars
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
      stars.position.y = (3500 / 2 - window.mouseY) * 0.1; // Adjusted for 3500px height

      renderer.render(scene, camera);
    }

    // Handle window resize
    function handleResize() {
      camera.aspect = window.innerWidth / 3500; // Adjusted for 3500px height
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 3500); // Adjusted for 3500px height
    }

    // Mouse move handler
    function handleMouseMove(event) {
      window.mouseX = event.clientX - window.innerWidth / 2;
      window.mouseY = event.clientY - 3500 / 2; // Adjusted for 3500px height
    }

    // Check if refs are initialized before calling init
    if (mountRef.current && canvasRef.current) {
      init();
      window.addEventListener('resize', handleResize);
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Clean up Three.js scene and event listeners on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (scene && stars) {
        scene.remove(stars);
      }
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div ref={mountRef} style={{ position: 'relative', height: '100%' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }} />
    </div>
  );
};

export default Background;
