import { useMemo, useRef } from 'react';
import { AdditiveBlending, BufferGeometry, Color, Group, PointsMaterial } from 'three';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import { sceneRuntime } from './sceneRuntime';

type PhoenixParticlesProps = {
  reducedMotion?: boolean;
};

type PhoenixBuffer = {
  positions: Float32Array;
  basePositions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
};

const ruby = new Color('#8f111a');
const ember = new Color('#d4471d');
const gold = new Color('#f2c766');
const paleGold = new Color('#fff1a8');

function writePoint(
  positions: number[],
  colors: number[],
  sizes: number[],
  x: number,
  y: number,
  z: number,
  color: Color,
  size = 1,
) {
  positions.push(x, y, z);
  colors.push(color.r, color.g, color.b);
  sizes.push(size);
}

function buildPhoenix(): PhoenixBuffer {
  const positions: number[] = [];
  const colors: number[] = [];
  const sizes: number[] = [];

  // Central body and head.
  for (let i = 0; i < 360; i += 1) {
    const t = i / 359;
    const angle = t * Math.PI * 9;
    const radius = 0.12 + Math.sin(t * Math.PI) * 0.32;
    const x = Math.cos(angle) * radius * 0.55 + (Math.random() - 0.5) * 0.04;
    const y = -1.35 + t * 2.45 + Math.sin(angle * 0.43) * 0.05;
    const z = Math.sin(angle) * radius * 0.7 + (Math.random() - 0.5) * 0.1;
    const color = t > 0.72 ? paleGold : gold.clone().lerp(ember, t * 0.55);
    writePoint(positions, colors, sizes, x, y, z, color, 0.9 + Math.random() * 1.7);
  }

  // Wing feathers built from parametric curves. This creates a phoenix silhouette without loading a model.
  for (const side of [-1, 1]) {
    for (let feather = 0; feather < 13; feather += 1) {
      const featherArc = feather / 12;
      const featherLength = 1.9 + Math.sin(featherArc * Math.PI) * 1.25;
      const featherDrop = featherArc * 0.74;
      const featherLift = Math.cos((featherArc - 0.26) * Math.PI) * 0.45;

      for (let step = 0; step < 66; step += 1) {
        const t = step / 65;
        const flutter = Math.sin(t * Math.PI * 2 + feather) * 0.04;
        const sweep = Math.pow(t, 0.74) * featherLength;
        const x = side * (0.28 + sweep + featherArc * 0.42 + flutter);
        const y = 0.08 + Math.sin(t * Math.PI) * (1.18 - featherArc * 0.4) + featherLift - featherDrop - t * featherArc * 0.7;
        const z = (Math.random() - 0.5) * 0.38 + side * Math.sin(t * Math.PI) * 0.08;
        const flame = gold.clone().lerp(ruby, 0.2 + featherArc * 0.55 + t * 0.18);
        writePoint(positions, colors, sizes, x, y, z, flame, 0.8 + Math.random() * 1.9);
      }
    }
  }

  // Tail flames.
  for (let ribbon = 0; ribbon < 9; ribbon += 1) {
    const side = ribbon % 2 === 0 ? 1 : -1;
    const offset = (ribbon - 4) * 0.07;

    for (let step = 0; step < 84; step += 1) {
      const t = step / 83;
      const wave = Math.sin(t * Math.PI * 4 + ribbon * 0.83);
      const x = side * (offset + wave * 0.34 * t + (Math.random() - 0.5) * 0.08);
      const y = -1.18 - Math.pow(t, 0.88) * (1.85 + ribbon * 0.04);
      const z = Math.cos(t * Math.PI * 3 + ribbon) * 0.2 * t + (Math.random() - 0.5) * 0.1;
      const color = ember.clone().lerp(gold, 1 - t * 0.84);
      writePoint(positions, colors, sizes, x, y, z, color, 0.7 + Math.random() * 1.6);
    }
  }

  // Atmospheric embers around the figure.
  for (let i = 0; i < 520; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 1.6 + Math.random() * 4.8;
    const x = Math.cos(angle) * radius;
    const y = -2.4 + Math.random() * 5.5;
    const z = -1.4 + Math.random() * 2.8;
    const color = Math.random() > 0.48 ? gold : ruby.clone().lerp(ember, Math.random());
    writePoint(positions, colors, sizes, x, y, z, color, 0.35 + Math.random() * 1.2);
  }

  const positionBuffer = new Float32Array(positions);

  return {
    positions: positionBuffer.slice(),
    basePositions: positionBuffer,
    colors: new Float32Array(colors),
    sizes: new Float32Array(sizes),
  };
}

export function PhoenixParticles({ reducedMotion = false }: PhoenixParticlesProps) {
  const groupRef = useRef<Group>(null);
  const geometryRef = useRef<BufferGeometry>(null);
  const materialRef = useRef<PointsMaterial>(null);
  const phoenix = useMemo(() => buildPhoenix(), []);

  useFrame(({ clock }, delta) => {
    const group = groupRef.current;
    const material = materialRef.current;
    const geometry = geometryRef.current;
    const scroll = reducedMotion ? 0.42 : sceneRuntime.scroll;
    const time = clock.elapsedTime;

    if (group) {
      group.rotation.y += ((sceneRuntime.pointerX * 0.17 + scroll * 0.78) - group.rotation.y) * Math.min(1, delta * 2.4);
      group.rotation.x += ((-sceneRuntime.pointerY * 0.08 + scroll * 0.08) - group.rotation.x) * Math.min(1, delta * 2.2);
      group.position.y = -0.05 + Math.sin(time * 0.45) * 0.035 + scroll * 0.18;
      group.scale.setScalar(1 + scroll * 0.1);
    }

    if (material) {
      material.size = 0.025 + scroll * 0.018 + Math.sin(time * 1.2) * 0.001;
      material.opacity = 0.68 + scroll * 0.24;
    }

    if (geometry && !reducedMotion) {
      const positionAttribute = geometry.attributes.position;
      for (let i = 1; i < positionAttribute.count * 3; i += 3) {
        const xIndex = i - 1;
        const zIndex = i + 1;
        const baseY = phoenix.basePositions[i];
        const baseZ = phoenix.basePositions[zIndex];
        positionAttribute.array[i] = baseY + Math.sin(time * 0.9 + xIndex * 0.003) * 0.018;
        positionAttribute.array[zIndex] = baseZ + Math.cos(time * 0.7 + zIndex * 0.002) * 0.012;
      }
      positionAttribute.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.05, -0.9]} rotation={[0.08, 0, 0]}>
      <Float speed={reducedMotion ? 0 : 1.1} rotationIntensity={0.08} floatIntensity={0.22} floatingRange={[-0.05, 0.05]}>
        <points frustumCulled>
          <bufferGeometry ref={geometryRef}>
            <bufferAttribute attach="attributes-position" args={[phoenix.positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[phoenix.colors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            ref={materialRef}
            vertexColors
            size={0.032}
            transparent
            opacity={0.78}
            depthWrite={false}
            blending={AdditiveBlending}
            sizeAttenuation
            toneMapped={false}
          />
        </points>
      </Float>
      <Sparkles
        count={reducedMotion ? 40 : 115}
        scale={[7.5, 4.8, 2.2]}
        position={[0, -0.05, 0.05]}
        size={reducedMotion ? 1.2 : 2.2}
        speed={reducedMotion ? 0 : 0.42}
        opacity={0.36}
        color="#f4c36a"
      />
    </group>
  );
}
