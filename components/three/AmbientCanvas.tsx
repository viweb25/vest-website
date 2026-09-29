'use client';

import * as THREE from 'three';
import { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sparkles, shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';


const NoiseMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uScroll: 0,
    uColorA: new THREE.Color('#0e7c86'),
    uColorB: new THREE.Color('#1e56a0'),
    uColorC: new THREE.Color('#f1f5f5'),
  },
  // vertex
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment — light, low-contrast animated gradient noise
  /* glsl */ `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uScroll;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;

    // 2D simplex-ish hash noise
    vec2 hash22(vec2 p){
      p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
      return -1.0 + 2.0*fract(sin(p)*43758.5453123);
    }
    float noise(vec2 p){
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f*f*(3.0-2.0*f);
      return mix(
        mix(dot(hash22(i+vec2(0.0,0.0)), f-vec2(0.0,0.0)),
            dot(hash22(i+vec2(1.0,0.0)), f-vec2(1.0,0.0)), u.x),
        mix(dot(hash22(i+vec2(0.0,1.0)), f-vec2(0.0,1.0)),
            dot(hash22(i+vec2(1.0,1.0)), f-vec2(1.0,1.0)), u.x),
        u.y);
    }
    float fbm(vec2 p){
      float v = 0.0; float a = 0.5;
      for(int i=0;i<4;i++){
        v += a*noise(p);
        p *= 2.0;
        a *= 0.5;
      }
      return v;
    }

    void main(){
      vec2 uv = vUv;
      vec2 q = uv * 2.0 - 1.0;
      q.x *= 1.4;
      float t = uTime * 0.04;
      float scroll = uScroll * 0.6;

      float n = fbm(q * 1.4 + vec2(t, scroll));
      float n2 = fbm(q * 0.7 - vec2(t*0.6, -scroll*0.5));
      float g = smoothstep(-0.3, 0.6, n*0.5 + n2*0.5 + 0.2 + uMouse.x*0.06);

      // gentle accent gradient that shifts with scroll
      vec3 base = mix(uColorC, uColorC, 1.0);
      vec3 accent = mix(uColorA, uColorB, smoothstep(0.2, 0.85, uv.y + scroll*0.3 + uMouse.y*0.08));
      vec3 col = mix(base, accent, g * 0.10);
      // very subtle light wash
      col += vec3(0.02, 0.05, 0.06) * (1.0 - g) * 0.4;
      gl_FragColor = vec4(col, 1.0);
    }
  `
);

extend({ NoiseMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    noiseMaterial: any;
  }
}

function NoisePlane({
  scrollRef,
  mouseRef,
  isDark,
}: {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  isDark: boolean;
}) {
  const matRef = useRef<any>(null);

  // Update noise material colors on theme change
  useEffect(() => {
    if (!matRef.current) return;
    matRef.current.uColorC = new THREE.Color(isDark ? '#0a0a0a' : '#f1f5f5');
  }, [isDark]);
  useFrame((_, delta) => {
    if (!matRef.current) return;
    matRef.current.uTime += delta;
    matRef.current.uScroll = THREE.MathUtils.lerp(
      matRef.current.uScroll,
      scrollRef.current,
      0.06
    );
    matRef.current.uMouse.x = THREE.MathUtils.lerp(
      matRef.current.uMouse.x,
      mouseRef.current.x,
      0.05
    );
    matRef.current.uMouse.y = THREE.MathUtils.lerp(
      matRef.current.uMouse.y,
      mouseRef.current.y,
      0.05
    );
  });
  return (
    <mesh position={[0, 0, -6]} scale={[18, 12, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <noiseMaterial ref={matRef} transparent={false} />
    </mesh>
  );
}

function CameraRig({
  scrollRef,
  mouseRef,
}: {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const { camera } = useThree();
  useFrame(() => {
    const s = scrollRef.current;
    // slow cinematic drift through space
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouseRef.current.x * 0.8 + Math.sin(s * Math.PI * 2) * 1.2,
      0.04
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      mouseRef.current.y * 0.6 + Math.sin(s * Math.PI) * 0.4,
      0.04
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      8 - s * 1.2,
      0.03
    );
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      mouseRef.current.x * 0.08,
      0.04
    );
    camera.rotation.x = THREE.MathUtils.lerp(
      camera.rotation.x,
      -mouseRef.current.y * 0.06,
      0.04
    );
  });
  return null;
}

export default function AmbientCanvas({
  scrollRef,
  mouseRef,
  reduced = false,
}: {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  reduced?: boolean;
}) {
  const [isDark, setIsDark] = useState(false);
  const glRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const bgColor = isDark ? '#000000' : '#fafbfb';

  const sparkles = useMemo(
    () => (reduced ? 40 : 120),
    [reduced]
  );

  return (
    <Canvas
      className="fixed inset-0 -z-10"
      style={{ position: 'fixed', inset: 0, zIndex: -10 }}
      camera={{ position: [0, 0, 8], fov: 55, near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.8]}
      onCreated={({ gl }) => {
        glRef.current = gl;
        const canvasEl = gl.domElement;

        // CRITICAL: browser oda default behavior context ah permanent ah
        // "lost" ah vechukum, preventDefault() illama. Idhu than andha
        // black screen stuck aagurathukku reason.
        const handleContextLost = (e: Event) => {
          e.preventDefault();
          console.warn('[AmbientCanvas] WebGL context lost — recovering...');
        };

        const handleContextRestored = () => {
          console.warn('[AmbientCanvas] WebGL context restored');
        };

        canvasEl.addEventListener('webglcontextlost', handleContextLost, false);
        canvasEl.addEventListener('webglcontextrestored', handleContextRestored, false);
      }}
      onPointerMissed={() => { }}
    >
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" args={[bgColor, 10, 26]} />

      <ambientLight intensity={0.85} />
      <directionalLight position={[5, 8, 6]} intensity={isDark ? 0.8 : 1.1} />
      <directionalLight position={[-6, -3, 2]} intensity={isDark ? 0.5 : 0.3} color="#1e56a0" />

      <Sparkles
        count={sparkles}
        scale={[16, 10, 8]}
        size={reduced ? 2 : 3.2}
        speed={reduced ? 0.05 : 0.18}
        opacity={0.5}
        color="#0e7c86"
      />
      <Sparkles
        count={Math.floor(sparkles / 2)}
        scale={[14, 9, 6]}
        size={reduced ? 1.5 : 2.4}
        speed={reduced ? 0.03 : 0.12}
        opacity={0.35}
        color="#ffffff"
      />

      <CameraRig scrollRef={scrollRef} mouseRef={mouseRef} />
    </Canvas>
  );
}