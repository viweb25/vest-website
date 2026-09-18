'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  Phone body – a rounded box with a glowing screen face             */
/* ------------------------------------------------------------------ */
function PhoneBody() {
  const groupRef = useRef<THREE.Group>(null);

  /* Procedural screen gradient texture */
  const screenTex = useMemo(() => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, '#0e7c86');
    grad.addColorStop(0.5, '#1e56a0');
    grad.addColorStop(1, '#0e7c86');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    /* Faux UI elements */
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.beginPath();
    ctx.roundRect(30, 30, 196, 28, 6);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.beginPath();
    ctx.roundRect(30, 75, 120, 14, 4);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(30, 100, 170, 14, 4);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(30, 125, 90, 14, 4);
    ctx.fill();
    /* Faux cards */
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.beginPath();
    ctx.roundRect(25, 155, 206, 40, 8);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(25, 205, 206, 40, 8);
    ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  /* Gentle idle bob */
  useFrame((_, dt) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += dt * 0.12;
  });

  const w = 1.7;
  const h = 3.2;
  const d = 0.18;

  return (
    <group ref={groupRef}>
      {/* Phone body */}
      <RoundedBox args={[w, h, d]} radius={0.16} smoothness={6} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#1a1a2e"
          metalness={0.7}
          roughness={0.25}
          clearcoat={0.6}
          clearcoatRoughness={0.15}
        />
      </RoundedBox>

      {/* Screen face */}
      <mesh position={[0, 0, d / 2 + 0.002]}>
        <planeGeometry args={[w * 0.88, h * 0.9]} />
        <meshStandardMaterial
          map={screenTex}
          emissive="#0e7c86"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.1}
        />
      </mesh>

      {/* Bezel glow ring */}
      <mesh position={[0, 0, d / 2 + 0.001]}>
        <planeGeometry args={[w * 0.94, h * 0.96]} />
        <meshBasicMaterial color="#0e7c86" transparent opacity={0.06} />
      </mesh>

      {/* Notch */}
      <mesh position={[0, h * 0.42, d / 2 + 0.003]}>
        <planeGeometry args={[0.55, 0.08]} />
        <meshBasicMaterial color="#000" />
      </mesh>

      {/* Side accent line */}
      <mesh position={[w / 2 + 0.002, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[d * 0.6, h * 0.4]} />
        <meshBasicMaterial color="#0e7c86" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene – assembles phone + lighting + particles                    */
/* ------------------------------------------------------------------ */
function Scene() {
  return (
    <>
      <Float speed={1.6} rotationIntensity={0.06} floatIntensity={0.4} floatingRange={[-0.1, 0.1]}>
        <PhoneBody />
      </Float>

      <Sparkles
        count={35}
        scale={[5, 5, 3]}
        size={1.8}
        speed={0.15}
        opacity={0.35}
        color="#0e7c86"
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported canvas (dynamically imported by Contact.tsx)             */
/* ------------------------------------------------------------------ */
export default function ContactCanvas() {
  return (
    <Canvas
      className="absolute inset-0"
      style={{ position: 'absolute', inset: 0 }}
      camera={{ position: [0, 0, 6.5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 5, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-3, -2, 3]} intensity={0.5} color="#0e7c86" />
      <pointLight position={[0, 2, 4]} intensity={0.5} color="#1e56a0" />

      <Scene />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.6}
      />
    </Canvas>
  );
}
