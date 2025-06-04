// components/Axis3D.jsx
import React from "react";
import { Html } from "@react-three/drei";

export default function Axis3D({ labels, maxValue, offset }) {
  return (
    <>
      {/* X Axis Labels */}
      {labels.map((label, idx) => (
        <Html key={idx} center position={[idx - offset, -0.3, 0]}>
          <div className="text-white text-xs select-none">{label}</div>
        </Html>
      ))}

      {/* X Axis Line */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[labels.length, 0.02, 0.02]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Y Axis Lines and Labels */}
      {Array.from({ length: maxValue + 1 }).map((_, i) => (
        <group key={i}>
          <mesh position={[0, i, 0]}>
            <boxGeometry args={[labels.length, 0.005, 0.005]} />
            <meshStandardMaterial color="gray" />
          </mesh>
          <Html position={[-offset - 0.5, i, 0]}>
            <div className="text-white text-xs select-none">{i}</div>
          </Html>
        </group>
      ))}
    </>
  );
}
