'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* ── Edge: a cylinder connecting two nodes ───────────────────────────── */
function Edge({
  start, end,
  radius = 0.02,
  color = '#0e7c86',
  opacity = 0.4,
}: {
  start: [number, number, number];
  end: [number, number, number];
  radius?: number;
  color?: string;
  opacity?: number;
}) {
  const sV = useMemo(() => new THREE.Vector3(...start), [start[0], start[1], start[2]]);
  const eV = useMemo(() => new THREE.Vector3(...end),   [end[0],   end[1],   end[2]]);
  const dir  = useMemo(() => new THREE.Vector3().subVectors(eV, sV), [sV, eV]);
  const len  = useMemo(() => dir.length(), [dir]);
  const mid  = useMemo(() => new THREE.Vector3().addVectors(sV, eV).multiplyScalar(0.5), [sV, eV]);
  const quat = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    return q;
  }, [dir]);

  return (
    <mesh position={mid} quaternion={quat}>
      <cylinderGeometry args={[radius, radius, len, 6, 1]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} transparent={opacity < 1} opacity={opacity} />
    </mesh>
  );
}

/* ── Node: a sphere representing a system component ──────────────────── */
function Node({ pos, r = 0.1, color = '#0b2027' }: { pos: [number,number,number]; r?: number; color?: string }) {
  return (
    <mesh position={pos}>
      <sphereGeometry args={[r, 16, 16]} />
      <meshStandardMaterial color={color} roughness={0.15} metalness={0.8} />
    </mesh>
  );
}

/* ── The Network ─────────────────────────────────────────────────────── */
function SystemsNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x += (mouse.current.y * 0.12 - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.z += (mouse.current.x * 0.08 - groupRef.current.rotation.z) * 0.05;
  });

  // A geometric data network layout (Icosahedron-like or layered)
  const nodes: [number, number, number][] = [
    [0, 1.5, 0], // Top
    [-1, 0.5, -1], [1, 0.5, -1], [1, 0.5, 1], [-1, 0.5, 1], // Upper ring
    [-1.5, -0.5, -1], [1.5, -0.5, -1], [1.5, -0.5, 1], [-1.5, -0.5, 1], // Lower ring
    [0, -1.5, 0] // Bottom
  ];

  const edges: [number, number][] = [
    // Top to upper ring
    [0,1], [0,2], [0,3], [0,4],
    // Upper ring connections
    [1,2], [2,3], [3,4], [4,1],
    // Cross connections upper to lower
    [1,5], [2,6], [3,7], [4,8],
    [1,8], [2,5], [3,6], [4,7],
    // Lower ring connections
    [5,6], [6,7], [7,8], [8,5],
    // Lower ring to bottom
    [5,9], [6,9], [7,9], [8,9]
  ];

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((pos, i) => (
        <Node key={`node-${i}`} pos={pos} color={i === 0 || i === 9 ? '#0e7c86' : '#0b2027'} r={i === 0 || i === 9 ? 0.12 : 0.08} />
      ))}

      {/* Edges */}
      {edges.map(([a,b], i) => (
        <Edge key={`edge-${i}`} start={nodes[a]} end={nodes[b]} />
      ))}
    </group>
  );
}

import React, { Component, ReactNode } from 'react';

class CanvasErrorBoundary extends Component<{children: ReactNode, fallback: ReactNode}, {hasError: boolean}> {
  constructor(props: {children: ReactNode, fallback: ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.error("Canvas WebGL Context Error:", error);
  }
  render() {
    if (this.state.hasError) {
      return <>{this.props.fallback}</>;
    }
    return <>{this.props.children}</>;
  }
}

/* ── Canvas export ────────────────────────────────────────────────────── */
export default function SystemsHeroCanvas() {
  return (
    <CanvasErrorBoundary fallback={<div className="flex items-center justify-center h-full w-full bg-[#fafcfc]/50 text-[#0e7c86]/50 text-sm font-mono border border-[#0e7c86]/10 rounded-2xl">WebGL 3D Context not available</div>}>
      <Canvas
        fallback={<div className="flex items-center justify-center h-full w-full bg-[#fafcfc]/50 text-[#0e7c86]/50 text-sm font-mono border border-[#0e7c86]/10 rounded-2xl">WebGL 3D Context not available</div>}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.8]}
        onCreated={({ gl }) => {
          const canvasEl = gl.domElement;
          const handleContextLost = (e: Event) => {
            e.preventDefault();
          };
          canvasEl.addEventListener('webglcontextlost', handleContextLost, false);
        }}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[5, 5, 5]}  intensity={1.2} color="#ffffff" />
        <directionalLight position={[-4,-2, 3]} intensity={0.6} color="#0e7c86" />
        <pointLight        position={[0, -2, 4]} intensity={0.5} color="#1e56a0" />

        <Float speed={1.2} rotationIntensity={0.06} floatIntensity={0.3} floatingRange={[-0.15, 0.15]}>
          <SystemsNetwork />
        </Float>
      </Canvas>
    </CanvasErrorBoundary>
  );
}
