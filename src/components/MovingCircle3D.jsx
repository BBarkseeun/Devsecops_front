import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere() {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere args={[2, 100, 200]} scale={1.5}>
        <MeshDistortMaterial
          color="#2d1b4e"  // 어두운 보라색 (검은색과 보라색 섞음)
          distort={0.3}    // 왜곡 정도
          speed={1.5}      // 애니메이션 속도
        />
      </Sphere>
    </Float>
  );
}

function BackgroundSpheres() {
  return (
    <>
      {/* 네온 그린 구체 (왼쪽 위) */}
      <Float speed={2}>
        <Sphere position={[-4, 2, -2]} args={[0.8, 32, 32]}>
          <MeshDistortMaterial color="#00ff88" distort={0.2} speed={1.8} />
        </Sphere>
      </Float>
      
      {/* 진한 초록 구체 (오른쪽 아래) */}
      <Float speed={1.8}>
        <Sphere position={[3, -1, -1]} args={[0.6, 32, 32]}>
          <MeshDistortMaterial color="#0d5f3c" distort={0.25} speed={1.2} />
        </Sphere>
      </Float>
      
      {/* 밝은 초록 구체 (오른쪽 위) */}
      <Float speed={1.2}>
        <Sphere position={[2, 3, -3]} args={[0.7, 32, 32]}>
          <MeshDistortMaterial color="#22c55e" distort={0.15} speed={2.0} />
        </Sphere>
      </Float>
      
      {/* 어두운 초록 구체 (왼쪽 아래) */}
      <Float speed={1.6}>
        <Sphere position={[-2, -2, -2]} args={[0.5, 32, 32]}>
          <MeshDistortMaterial color="#166534" distort={0.3} speed={1.4} />
        </Sphere>
      </Float>
    </>
  );
}

const MovingCircle3D = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '800px',
      height: '800px',
      zIndex: 5,
      pointerEvents: 'none'
    }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[5, 5, 10]} intensity={0.3} color="#00ff88" />
        <AnimatedSphere />      {/* 메인 구체 */}
        <BackgroundSpheres />   {/* 작은 구체들 */}
        {/* OrbitControls는 포인터 이벤트가 없어서 제거 */}
      </Canvas>
    </div>
  )
}

export default MovingCircle3D 