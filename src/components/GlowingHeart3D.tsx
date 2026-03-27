import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const Heart = () => {
  const ref = useRef<THREE.Mesh>(null);

  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.5);
    s.bezierCurveTo(0, 0.5, -0.1, 0.35, -0.5, 0.35);
    s.bezierCurveTo(-1, 0.35, -1, 0.75, -1, 0.75);
    s.bezierCurveTo(-1, 1.1, -0.7, 1.4, 0, 1.8);
    s.bezierCurveTo(0.7, 1.4, 1, 1.1, 1, 0.75);
    s.bezierCurveTo(1, 0.75, 1, 0.35, 0.5, 0.35);
    s.bezierCurveTo(0.1, 0.35, 0, 0.5, 0, 0.5);
    return s;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.4;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.12;
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.3) * 0.04;
    ref.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={ref} rotation={[Math.PI, 0, 0]} scale={0.7}>
      <extrudeGeometry args={[shape, { depth: 0.35, bevelEnabled: true, bevelSegments: 10, steps: 2, bevelSize: 0.08, bevelThickness: 0.08 }]} />
      <meshStandardMaterial color="#ff4d6d" emissive="#ff4d6d" emissiveIntensity={0.7} roughness={0.25} metalness={0.45} />
    </mesh>
  );
};

const GlowingHeart3D = ({ className = "" }: { className?: string }) => (
  <div className={`w-44 h-44 md:w-56 md:h-56 ${className}`}>
    <Canvas camera={{ position: [0, 1, 3.2], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.25} />
      <pointLight position={[2, 3, 4]} intensity={1.2} color="#ff85a1" />
      <pointLight position={[-2, -1, 3]} intensity={0.6} color="#ff4d6d" />
      <pointLight position={[0, 0, -2]} intensity={0.3} color="#ffd6e0" />
      <Heart />
    </Canvas>
  </div>
);

export default GlowingHeart3D;
