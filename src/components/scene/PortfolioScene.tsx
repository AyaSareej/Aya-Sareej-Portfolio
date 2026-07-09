import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, Preload } from '@react-three/drei';
import { PhoenixParticles } from './PhoenixParticles';
import { NeuralArtifact } from './NeuralArtifact';
import { SceneRig } from './SceneRig';

type PortfolioSceneProps = {
  reducedMotion?: boolean;
};

export function PortfolioScene({ reducedMotion = false }: PortfolioSceneProps) {
  return (
    <div className="scene-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.7]}
        camera={{ position: [0, 0.18, 6.2], fov: 42, near: 0.1, far: 90 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        <color attach="background" args={['#070304']} />
        <fog attach="fog" args={['#070304', 7, 16]} />
        <ambientLight intensity={0.16} />
        <pointLight position={[2.8, 2.6, 3.4]} intensity={1.4} color="#f1b65b" />
        <pointLight position={[-3.4, -1.2, 2.4]} intensity={1.15} color="#8a1119" />
        <spotLight position={[0, 5.6, 4.2]} angle={0.4} penumbra={0.8} intensity={2.1} color="#ffd98c" />
        <Suspense fallback={null}>
          <SceneRig reducedMotion={reducedMotion}>
            <PhoenixParticles reducedMotion={reducedMotion} />
            <NeuralArtifact reducedMotion={reducedMotion} />
          </SceneRig>
          <Preload all />
        </Suspense>
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}
