import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function SpinningCD() {
  const cdRef = useRef();
  const ringRef = useRef();

  useFrame(() => {
    cdRef.current.rotation.y += 0.005;
    ringRef.current.rotation.y += 0.005;
  });

  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {/* CD */}
      <mesh ref={cdRef}>
        <cylinderGeometry args={[5, 5, 0.3, 64]} />
        <meshStandardMaterial
          color="silver"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Neon Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[5.5, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={2}
          roughness={0.1}
          metalness={1}
        />
      </mesh>
    </group>
  );
}

const ThreeCDBackground = () => {
  return (
    <Canvas style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} />
      <SpinningCD />
    </Canvas>
  );
};

export default ThreeCDBackground;
