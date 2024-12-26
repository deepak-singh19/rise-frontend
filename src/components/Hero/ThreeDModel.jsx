import React, { useEffect } from 'react';
import * as THREE from 'three';

const Icosahedral = () => {
  useEffect(() => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth / 2, window.innerHeight);
    const container = document.getElementById('threejs');
    container.appendChild(renderer.domElement);


    const geometry = new THREE.ConeGeometry(2.5, 4, 3); 
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff, 
      wireframe: true, 
      transparent: true,
      opacity: 0.8,
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);


    camera.position.z = 5;


    const animate = function () {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.005; 
      renderer.render(scene, camera);
    };

    animate();


    const handleResize = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      camera.aspect = aspectRatio;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth / 2, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);


    return () => {
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div id="threejs" className="w-full h-full"></div>;
};

export default Icosahedral;
