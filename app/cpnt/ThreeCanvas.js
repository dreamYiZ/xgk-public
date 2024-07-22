// createBoxThreeCanvas function and BASIC_PAYLOAD_THREE_CANVAS object (unchanged)

// BoxWithModel Component
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import { ppplog, THREE_ANIMATE_TYPE } from "../util/util";
import ErrorBoundaryThree from "./ErrorBoundaryThree";

export default function BoxWithModel({ box, sub }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const stopPropagation = (e) => e.stopPropagation();

      canvas.addEventListener('click', stopPropagation);
      canvas.addEventListener('mousemove', stopPropagation);
      canvas.addEventListener('mousedown', stopPropagation);
      canvas.addEventListener('mouseup', stopPropagation);
      canvas.addEventListener('touchstart', stopPropagation);
      canvas.addEventListener('touchmove', stopPropagation);
      canvas.addEventListener('touchend', stopPropagation);

      return () => {
        canvas.removeEventListener('click', stopPropagation);
        canvas.removeEventListener('mousemove', stopPropagation);
        canvas.removeEventListener('mousedown', stopPropagation);
        canvas.removeEventListener('mouseup', stopPropagation);
        canvas.removeEventListener('touchstart', stopPropagation);
        canvas.removeEventListener('touchmove', stopPropagation);
        canvas.removeEventListener('touchend', stopPropagation);
      };
    }
  }, [canvasRef]);

  return (
    <ErrorBoundaryThree>
      <Canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model
            url={sub.modelUrl}
            animateType={sub.animateType}
            animateSpeed={sub.animateSpeed}
            modelScale={sub.modelScale}
            positionX={sub.positionX}
            positionY={sub.positionY}
            positionZ={sub.positionZ}
          />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </ErrorBoundaryThree>
  );
}

function Model({ url, animateType, animateSpeed, modelScale, positionX, positionY, positionZ }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  useEffect(() => {
    scene.position.set(positionX||0, positionY||0, positionZ||0);
    scene.scale.set(...new Array(3).fill(modelScale));
    scene.traverse((object) => {
      if (object.isMesh) {
        object.onClick = (e) => e.stopPropagation();
        object.onPointerUp = (e) => e.stopPropagation();
        object.onPointerDown = (e) => e.stopPropagation();
        object.onPointerOver = (e) => e.stopPropagation();
        object.onPointerOut = (e) => e.stopPropagation();
      }
    });
  }, [scene, modelScale, positionX, positionY, positionZ]);

  useFrame(({ clock }) => {
    if (animateType === THREE_ANIMATE_TYPE.AUTO) {
      ref.current.rotation.y = clock.getElapsedTime();
    }
  });

  return <primitive object={scene} ref={ref} />;
}
