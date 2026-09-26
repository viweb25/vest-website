'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* ── Beam: a cylinder between two 3-D points ─────────────────────────── */
function Beam({
  start, end,
  radius = 0.036,
  color = '#0b2027',
  opacity = 1,
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
      <cylinderGeometry args={[radius, radius, len, 8, 1]} />
      <meshStandardMaterial color={color} roughness={0.25} metalness={0.72} transparent={opacity < 1} opacity={opacity} />
    </mesh>
  );
}

/* ── Node: connection sphere ──────────────────────────────────────────── */
function Node({ pos, r = 0.07, color = '#0e7c86' }: { pos: [number,number,number]; r?: number; color?: string }) {
  return (
    <mesh position={pos}>
      <sphereGeometry args={[r, 12, 12]} />
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.85} />
    </mesh>
  );
}

/* ── The structural frame ─────────────────────────────────────────────── */
function StructureFrame() {
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
    groupRef.current.rotation.y += delta * 0.14;
    groupRef.current.rotation.x += (mouse.current.y * 0.09 - groupRef.current.rotation.x) * 0.05;
  });

  // 4 corner columns in XZ, 3 floor levels in Y
  const CX = 1.15, CZ = 0.68;
  const corners: [number, number][] = [[-CX,-CZ],[CX,-CZ],[CX,CZ],[-CX,CZ]];
  const levels = [-1.05, 0.0, 1.05];

  return (
    <group ref={groupRef}>
      {/* Columns */}
      {corners.map(([x,z], ci) =>
        levels.slice(0,-1).map((y,li) => (
          <Beam key={`col-${ci}-${li}`}
            start={[x, y, z]} end={[x, levels[li+1], z]}
            radius={0.048} color="#0b2027" />
        ))
      )}

      {/* Horizontal beams at each level */}
      {levels.map((y, li) =>
        [[0,1],[1,2],[2,3],[3,0]].map(([a,b], bi) => (
          <Beam key={`beam-${li}-${bi}`}
            start={[corners[a][0], y, corners[a][1]]}
            end={[corners[b][0],   y, corners[b][1]]}
            radius={0.030} color="#1a3a48" />
        ))
      )}

      {/* X-bracing on front & back faces */}
      {[[-CX,-CZ],[CX,-CZ]].map((_,fi) => {
        const [ax, az] = corners[fi === 0 ? 0 : 2];
        const [bx, bz] = corners[fi === 0 ? 1 : 3];
        return levels.slice(0,-1).map((y, li) => [
          <Beam key={`bra-${fi}-${li}-a`}
            start={[ax, y, az]} end={[bx, levels[li+1], bz]}
            radius={0.016} color="#0e7c86" opacity={0.65} />,
          <Beam key={`bra-${fi}-${li}-b`}
            start={[bx, y, bz]} end={[ax, levels[li+1], az]}
            radius={0.016} color="#0e7c86" opacity={0.65} />,
        ]);
      })}

      {/* Connection nodes */}
      {corners.map(([x,z], ci) =>
        levels.map((y, li) => (
          <Node key={`node-${ci}-${li}`}
            pos={[x, y, z]}
            color={li === 1 ? '#0e7c86' : '#1e56a0'}
            r={li === 1 ? 0.075 : 0.055} />
        ))
      )}
    </group>
  );
}

/* ── Canvas export ────────────────────────────────────────────────────── */
export default function StructureCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.8], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.8]}
      onCreated={({ gl }) => {
        const canvasEl = gl.domElement;
        const handleContextLost = (e: Event) => {
          e.preventDefault();
          console.warn('[StructureCanvas] WebGL context lost — recovering...');
        };
        const handleContextRestored = () => {
          console.warn('[StructureCanvas] WebGL context restored');
        };
        canvasEl.addEventListener('webglcontextlost', handleContextLost, false);
        canvasEl.addEventListener('webglcontextrestored', handleContextRestored, false);
      }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 7, 5]}  intensity={1.3} color="#ffffff" />
      <directionalLight position={[-4,-2, 3]} intensity={0.5} color="#0e7c86" />
      <pointLight        position={[0, 2, 4]}  intensity={0.7} color="#1e56a0" />

      <Float speed={1.1} rotationIntensity={0.04} floatIntensity={0.28} floatingRange={[-0.1, 0.1]}>
        <StructureFrame />
      </Float>
    </Canvas>
  );
}
