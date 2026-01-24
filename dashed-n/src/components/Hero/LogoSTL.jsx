"use client";

import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import * as THREE from "three";
import { useRef, useState } from "react";

/* ─────────────────────────────
   LOGO MESH
───────────────────────────── */
function LogoMesh() {
  const geometry = useLoader(STLLoader, "/Desgins/logo.stl");
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  /* Center geometry */
  geometry.computeBoundingBox();
  const center = new THREE.Vector3();
  geometry.boundingBox.getCenter(center);
  geometry.translate(-center.x, -center.y, -center.z);

  /* Normalize scale */
  const size = new THREE.Vector3();
  geometry.boundingBox.getSize(size);
  const maxAxis = Math.max(size.x, size.y, size.z);
  geometry.scale(1 / maxAxis, 1 / maxAxis, 1 / maxAxis);

  /* Mouse-follow + hover animation */
  useFrame(({ mouse }) => {
    if (!meshRef.current) return;

    // Smooth mouse rotation
    meshRef.current.rotation.y +=
      (mouse.x * 0.6 - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.x +=
      (-mouse.y * 0.6 - meshRef.current.rotation.x) * 0.05;

    // Smooth hover scale
    const targetScale = hovered ? 2.6 : 2.3;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.08,
    );
  });

  return (
    <mesh
      ref={meshRef}
      scale={2.3}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial color="#000000" metalness={0.15} roughness={0.55} />
    </mesh>
  );
}

/* ─────────────────────────────
   CANVAS
───────────────────────────── */
export default function LogoSTL() {
  return (
    <Canvas
      camera={{ position: [0, 4.5, 0], fov: 40 }}
      className="w-full h-full"
    >
      {/* Background */}
      <color attach="background" args={["#ffffff"]} />

      {/* Lights */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 6, 6]} intensity={1.3} />
      <directionalLight position={[-4, -3, 3]} intensity={0.6} />

      {/* Logo */}
      <LogoMesh />

      {/* Controls (rotation disabled, mouse driven instead) */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />

      <Environment preset="studio" />
    </Canvas>
  );
}
