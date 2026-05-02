import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import logoUrl from '@/assets/wukala-logo.png';

/**
 * Spinning logo plane with floating + subtle distortion ring behind it.
 * Used as a "thinking" indicator while waiting for the AI response.
 */

function LogoPlane() {
  const texture = useLoader(TextureLoader, logoUrl);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(t * 0.8) * 0.6;
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.15;
    const s = 1 + Math.sin(t * 2) * 0.03;
    meshRef.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2.4, 2.4]} />
      <meshStandardMaterial
        map={texture}
        transparent
        roughness={0.25}
        metalness={0.6}
        emissive={new THREE.Color('#d4a84b')}
        emissiveIntensity={0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function GlowRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ringRef.current) return;
    const t = state.clock.getElapsedTime();
    ringRef.current.rotation.z = t * 0.4;
    ringRef.current.rotation.x = Math.sin(t * 0.6) * 0.3;
  });
  return (
    <mesh ref={ringRef} position={[0, 0, -0.6]}>
      <torusGeometry args={[1.6, 0.04, 32, 128]} />
      <MeshDistortMaterial
        color="#d4a84b"
        emissive="#d4a84b"
        emissiveIntensity={0.8}
        roughness={0.2}
        metalness={0.9}
        distort={0.35}
        speed={2}
      />
    </mesh>
  );
}

function Particles({ count = 60 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.8 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#d4a84b" size={0.04} sizeAttenuation transparent opacity={0.85} />
    </points>
  );
}

interface ChatLogoLoader3DProps {
  label?: string;
  size?: number;
}

export default function ChatLogoLoader3D({
  label = 'Wukala-GPT is thinking…',
  size = 220,
}: ChatLogoLoader3DProps) {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ width: size, height: size + 32 }}
    >
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          width: size,
          height: size,
          background:
            'radial-gradient(circle at 50% 50%, hsl(220 60% 12%) 0%, hsl(222 70% 6%) 100%)',
          boxShadow: '0 10px 40px -10px hsl(43 60% 45% / 0.45)',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 5]} intensity={1.2} color="#ffe6a8" />
          <pointLight position={[-3, -2, 2]} intensity={0.6} color="#d4a84b" />
          <Suspense fallback={null}>
            <Float speed={1.6} rotationIntensity={0.6} floatIntensity={0.8}>
              <LogoPlane />
            </Float>
            <GlowRing />
            <Particles count={70} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>
      <p className="mt-3 text-xs lg:text-sm text-muted-foreground tracking-wide animate-pulse">
        {label}
      </p>
    </div>
  );
}
