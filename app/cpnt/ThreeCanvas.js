import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import { ppplog } from "../util/util";

export default function BoxWithModel({ box, sub }) {
  return (
    <Canvas style={{ width: box.width, height: box.height }} camera={{ position: [0, 0, 10] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Suspense fallback={null}>
        <Model url={sub.modelUrl} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

function Model({ url }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  ppplog('model-url', url);

  useEffect(() => {
    ppplog('Scene:', scene);
    scene.position.set(0, 0, 6); // Ensure the model is at the origin
  }, [scene]);

  // Iterate through scene's materials and log them
  scene.traverse((object) => {
    if (object.isMesh) {
      ppplog('Mesh:', object);
      ppplog('Material:', object.material);
    }
  });

  return <primitive object={scene} ref={ref} />;
}
