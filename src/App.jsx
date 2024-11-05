import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './App.css'

const App = () => {
  const mountRef = useRef(null);
  const [showScene, setShowScene] = useState(false);

  const [cubeColor, setCubeColor] = useState(0x00ff00);
  const [cylinderColor, setCylinderColor] = useState(0xff0000);
  const [triangleColor, setTriangleColor] = useState(0x0000ff);

  useEffect(() => {
    if (!showScene) return;

    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMount.appendChild(renderer.domElement);

    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: cubeColor });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);

    const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    const cylinderMaterial = new THREE.MeshBasicMaterial({ color: cylinderColor });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.x = 2;
    scene.add(cylinder);

    const triangleGeometry = new THREE.TetrahedronGeometry(0.7);
    const triangleMaterial = new THREE.MeshBasicMaterial({ color: triangleColor });
    const triangle = new THREE.Mesh(triangleGeometry, triangleMaterial);
    triangle.position.x = -2;
    scene.add(triangle);

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cylinder.rotation.x += 0.01;
      cylinder.rotation.y += 0.01;
      triangle.rotation.x += 0.01;
      triangle.rotation.z += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, [showScene, cubeColor, cylinderColor, triangleColor]);

  return (
    <div className="App">
      {showScene ? (
        <>
          <div ref={mountRef} style={{ display: 'block', width: '100%', height: '70vh' }}></div>
          <div className="button-container">
            <button className="button" onClick={() => setTriangleColor(Math.random() * 0xffffff)}>
              Cambiar color de la Pirámide
            </button>
            <button className="button" onClick={() => setCubeColor(Math.random() * 0xffffff)}>
              Cambiar color del Cubo
            </button>
            <button className="button" onClick={() => setCylinderColor(Math.random() * 0xffffff)}>
              Cambiar color del Cilindro
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="button close-button" onClick={() => setShowScene(false)}>
              Cerrar escena
            </button>
          </div>
        </>
      ) : (
        <div className="start-container">
          <h1 className="title">Bienvenido a la Escena 3D</h1>
          <p className="text">Presiona "Start" para ver la escena y cambiar los colores de las figuras</p>
          <button onClick={() => setShowScene(true)} className="start-button">
            Start
          </button>
        </div>
      )}
    </div>

  );
};

export default App;
