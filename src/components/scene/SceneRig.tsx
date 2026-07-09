import { ReactNode, useRef } from 'react';
import { Group, MathUtils } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { sceneRuntime } from './sceneRuntime';

type SceneRigProps = {
  children: ReactNode;
  reducedMotion?: boolean;
};

export function SceneRig({ children, reducedMotion = false }: SceneRigProps) {
  const rigRef = useRef<Group>(null);
  const { camera } = useThree();

  useFrame((_, delta) => {
    const rig = rigRef.current;
    const scroll = reducedMotion ? 0.32 : sceneRuntime.scroll;

    camera.position.x = MathUtils.damp(camera.position.x, sceneRuntime.pointerX * 0.28, 1.8, delta);
    camera.position.y = MathUtils.damp(camera.position.y, 0.18 + sceneRuntime.pointerY * 0.18 - scroll * 0.14, 1.8, delta);
    camera.position.z = MathUtils.damp(camera.position.z, 6.2 - scroll * 1.1, 1.2, delta);
    camera.lookAt(0, -0.05 + scroll * 0.18, 0);

    if (rig) {
      rig.rotation.z = MathUtils.damp(rig.rotation.z, sceneRuntime.pointerX * -0.025, 1.6, delta);
      rig.position.y = MathUtils.damp(rig.position.y, scroll * 0.24, 1.4, delta);
    }
  });

  return <group ref={rigRef}>{children}</group>;
}
