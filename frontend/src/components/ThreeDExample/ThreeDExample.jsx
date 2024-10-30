import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';

const CameraLookAt = ({ target }) => {
    useFrame(({ camera }) => {
        camera.lookAt(...target);
    });
    return null;
};

const Model = (props) => {
    const modelRef = useRef();

    useFrame(() => {
        modelRef.current && (modelRef.current.rotation.y += 0.01);
    });

    const { scene } = useGLTF("/models/scene.gltf");
    return <primitive ref={modelRef} object={scene} {...props} />;
};

function ThreeDExample() {
    const [rotation, setRotation] = useState(-90);

  return (
    <div style={{ width: '100vw', height: '80vh' }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 75 }}>
        <ambientLight intensity={10} />
        <pointLight position={[5, 5, 5]} />
        <CameraLookAt target={[ 0, 0, 0 ]}/>
        <Model
        // rotation={[0, rotation, 0]}
        scale={[1, 1, 1]} position={[0, 0, 0]} />
        {/* <OrbitControls 
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        /> */}
      </Canvas>
      <div>
        {/* <input
          type="range"
          min='-90'
          max={2 * Math.PI - 90}
          step='0.01'
          value={rotation}
          onChange={(e) => setRotation(parseFloat(e.target.value))}
        />
        <div>{rotation}</div> */}
            </div>
        </div>
    );
}

export default ThreeDExample;
