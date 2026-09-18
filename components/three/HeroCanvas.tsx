'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function ImagePlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/hero-image.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setTexture(tex);
    });

    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    // Smooth mouse-driven tilt
    meshRef.current.rotation.y += (mouse.current.x * 0.25 - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.x += (-mouse.current.y * 0.15 - meshRef.current.rotation.x) * 0.05;
  });

  if (!texture) return null;

  // Aspect ratio of the image
  const aspect = 1280 / 960;
  const width = 4.2;
  const height = width / aspect;

  return (
    <group>
      {/* Glow plane behind */}
      <mesh position={[0, 0, -0.15]}>
        <planeGeometry args={[width * 1.05, height * 1.05]} />
        <meshBasicMaterial color="#1e56a0" transparent opacity={0.12} />
      </mesh>

      {/* Main image plane */}
      <mesh ref={meshRef} castShadow>
        <planeGeometry args={[width, height, 1, 1]} />
        <meshStandardMaterial
          map={texture}
          transparent
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Subtle reflection plane */}
      <mesh position={[0, -height / 2 - 0.15, -0.3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width * 0.9, 0.5]} />
        <meshBasicMaterial color="#0e7c86" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <Float
      speed={1.4}
      rotationIntensity={0.08}
      floatIntensity={0.35}
      floatingRange={[-0.12, 0.12]}
    >
      <ImagePlane />
    </Float>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      className="absolute inset-0"
      style={{ position: 'absolute', inset: 0 }}
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-4, -2, 3]} intensity={0.5} color="#0e7c86" />
      <pointLight position={[0, 3, 4]} intensity={0.6} color="#1e56a0" />

      <Scene />

      <Sparkles
        count={40}
        scale={[6, 5, 3]}
        size={2.0}
        speed={0.15}
        opacity={0.4}
        color="#0e7c86"
      />
    </Canvas>
  );
}
