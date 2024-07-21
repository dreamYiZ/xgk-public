import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import { ppplog, THREE_ANIMATE_TYPE } from "../util/util";
import ErrorBoundaryThree from "./ErrorBoundaryThree";

export default function BoxWithModel({ box, sub }) {
  return (
    <ErrorBoundaryThree>
      <Canvas style={{ width: box.width, height: box.height }} camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model
            url={sub.modelUrl}
            animateType={sub.animateType}
            animateSpeed={sub.animateSpeed}
            modelScale={sub.modelScale} // Pass modelScale here
          />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </ErrorBoundaryThree>
  );
}

function Model({ url, animateType, animateSpeed, modelScale }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  ppplog('model-url', url);

  // Ensure the model is at the correct position
  useEffect(() => {
    scene.position.set(0, 0, 0);
    scene.scale.set(...new Array(3).fill(modelScale));
    // scene.position.set(0, 0, 0);

    ppplog('ref.current.rotation', ref.current.rotation)
    // Log the scene and its materials for debugging
    ppplog('Scene:', scene);
    scene.traverse((object) => {
      if (object.isMesh) {
        ppplog('Mesh:', object);
        ppplog('Material:', object.material);
      }
    });
  }, [scene, modelScale]);

  // Animation logic
  // useFrame((state, delta) => {
  //   if (animateType === THREE_ANIMATE_TYPE.AUTO) {
  //     // Rotate the model around the Z axis
  //     // ref.current.rotation.z += animateSpeed * delta;
  //   ppplog('ref.current.rotation', ref.current)

  //   }
  // });


  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime()
  })

  return <primitive object={scene} ref={ref} />;
}
