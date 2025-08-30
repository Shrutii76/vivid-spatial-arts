import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WireframeSphere = ({ position, scale = 1, rotationSpeed = 0.01 }: {
  position: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed * 1.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial 
        wireframe 
        color="#ffffff" 
        transparent 
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const FloatingRings = ({ position, count = 3 }: {
  position: [number, number, number];
  count?: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.005;
      groupRef.current.rotation.x += 0.003;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / count]}>
          <torusGeometry args={[1.5 + i * 0.3, 0.02, 16, 100]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.4 - i * 0.1}
          />
        </mesh>
      ))}
    </group>
  );
};

const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        color="#ffffff" 
        size={0.02} 
        transparent 
        opacity={0.6}
      />
    </points>
  );
};

export const GeometricScene = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Single central sphere */}
        <WireframeSphere position={[0, 0, 0]} scale={4} rotationSpeed={0.002} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};