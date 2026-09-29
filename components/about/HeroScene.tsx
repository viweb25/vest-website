"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, Float, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

function AbstractShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={[2, 0, 0]} scale={1.5}>
        <torusKnotGeometry args={[1, 0.4, 128, 64]} />
        <MeshTransmissionMaterial 
          backside
          thickness={0.8}
          roughness={0.05}
          transmission={0.95}
          ior={1.5}
          chromaticAberration={0.08}
          anisotropy={0.3}
          color="#a8e6ef"
          distortion={0.3}
          distortionScale={0.2}
          temporalDistortion={0.08}
          attenuationColor="#14a0ac"
          attenuationDistance={0.5}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]} // Cap DPR for performance
        gl={{ antialias: true, alpha: true }}
        fallback={<div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">3D graphics unavailable</div>}
      >
        {/* Brighter ambient + directional lights so the glass material reflects light */}
        <ambientLight intensity={2.5} color="#e8f4f8" />
        <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" />
        <directionalLight position={[-8, 5, -5]} intensity={1.5} color="#14a0ac" />
        <pointLight position={[0, 5, 3]} intensity={2} color="#e0f7fa" />
        
        <PresentationControls 
          global 
          config={{ mass: 2, tension: 500 }} 
          snap={{ mass: 4, tension: 1500 }} 
          rotation={[0, 0, 0]} 
          polar={[-Math.PI / 4, Math.PI / 4]} 
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <AbstractShape />
        </PresentationControls>

        {/* 'dawn' preset gives warm bright reflections — avoids dark studio look */}
        <Environment preset="dawn" />
      </Canvas>
    </div>
  );
}
