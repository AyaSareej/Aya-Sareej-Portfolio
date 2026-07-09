import { useRef, useState } from 'react';
import { AdditiveBlending, Group, MathUtils, Mesh } from 'three';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { Float, Html, Text } from '@react-three/drei';
import { sceneRuntime } from './sceneRuntime';

type NeuralArtifactProps = {
  reducedMotion?: boolean;
};

const nodes = [
  { label: 'CV', position: [-1.32, 0.62, 0.42] as const },
  { label: 'ASR', position: [1.18, 0.5, -0.18] as const },
  { label: 'OCR', position: [-0.82, -0.78, -0.28] as const },
  { label: 'UX', position: [0.9, -0.72, 0.32] as const },
  { label: 'ML', position: [0.12, 1.02, -0.42] as const },
];

export function NeuralArtifact({ reducedMotion = false }: NeuralArtifactProps) {
  const groupRef = useRef<Group>(null);
  const orbRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useFrame(({ clock }, delta) => {
    const group = groupRef.current;
    const orb = orbRef.current;
    const scroll = reducedMotion ? 0.3 : sceneRuntime.scroll;

    if (group) {
      group.rotation.y = MathUtils.damp(group.rotation.y, scroll * Math.PI * 1.15 + sceneRuntime.pointerX * 0.3, 1.8, delta);
      group.rotation.x = MathUtils.damp(group.rotation.x, -0.2 + sceneRuntime.pointerY * 0.15, 1.7, delta);
      group.position.x = MathUtils.damp(group.position.x, 1.52 - scroll * 2.9, 1.25, delta);
      group.position.y = MathUtils.damp(group.position.y, -0.32 + Math.sin(clock.elapsedTime * 0.5) * 0.04, 1.5, delta);
    }

    if (orb && !reducedMotion) {
      orb.rotation.x += delta * 0.08;
      orb.rotation.z -= delta * 0.05;
    }
  });

  const handlePointerOver = (event: ThreeEvent<PointerEvent>, label: string) => {
    event.stopPropagation();
    setHovered(label);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(null);
    document.body.style.cursor = 'auto';
  };

  return (
    <group ref={groupRef} position={[1.52, -0.32, 0.38]}>
      <Float speed={reducedMotion ? 0 : 1.8} floatIntensity={0.16} rotationIntensity={0.08}>
        <mesh ref={orbRef}>
          <icosahedronGeometry args={[1.05, 3]} />
          <meshStandardMaterial color="#2a0508" roughness={0.52} metalness={0.6} emissive="#4c0508" emissiveIntensity={0.32} />
        </mesh>
        <mesh scale={1.08}>
          <icosahedronGeometry args={[1.05, 2]} />
          <meshBasicMaterial color="#f3be54" transparent opacity={0.12} wireframe blending={AdditiveBlending} />
        </mesh>
        <mesh scale={1.38}>
          <torusKnotGeometry args={[0.94, 0.008, 180, 8, 2, 5]} />
          <meshBasicMaterial color="#d7a142" transparent opacity={0.52} blending={AdditiveBlending} toneMapped={false} />
        </mesh>
        <mesh scale={1.02} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.22, 0.004, 12, 180]} />
          <meshBasicMaterial color="#6f0f16" transparent opacity={0.58} blending={AdditiveBlending} />
        </mesh>

        {nodes.map((node) => (
          <group key={node.label} position={node.position}>
            <mesh
              onPointerOver={(event) => handlePointerOver(event, node.label)}
              onPointerOut={handlePointerOut}
              scale={hovered === node.label ? 1.32 : 1}
            >
              <sphereGeometry args={[0.075, 18, 18]} />
              <meshStandardMaterial color="#f7cd75" emissive="#f7aa34" emissiveIntensity={hovered === node.label ? 1.1 : 0.56} />
            </mesh>
            <Text
              fontSize={0.105}
              anchorX="center"
              anchorY="middle"
              color="#f9d990"
              position={[0, 0.17, 0]}
              outlineWidth={0.004}
              outlineColor="#120406"
            >
              {node.label}
            </Text>
          </group>
        ))}
      </Float>

      <Html position={[0, -1.62, 0]} center transform distanceFactor={6} occlude={false}>
        <div className="scene-badge" aria-hidden="true">
          {hovered ? `${hovered} signal active` : 'AI × UX neural core'}
        </div>
      </Html>
    </group>
  );
}
