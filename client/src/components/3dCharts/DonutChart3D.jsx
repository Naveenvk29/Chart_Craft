import React, { useState } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const DonutChart3D = ({ data, xKey, yKey }) => {
  const total = data.reduce((sum, item) => sum + +item[yKey], 0);
  let startAngle = 0;

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      {data.map((item, idx) => {
        const [hovered, setHovered] = useState(false);
        const value = +item[yKey];
        const angle = (value / total) * Math.PI * 2;
        const endAngle = startAngle + angle;
        const color = `hsl(${(idx * 50) % 360}, 70%, 60%)`;

        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.absarc(0, 0, 2, startAngle, endAngle, false);
        shape.lineTo(0, 0); // fill center visually like donut

        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: 0.5,
          bevelEnabled: false,
        });

        const midAngle = startAngle + angle / 2;
        const labelX = Math.cos(midAngle) * 2.5;
        const labelY = Math.sin(midAngle) * 2.5;
        startAngle = endAngle;

        return (
          <group key={idx}>
            <mesh
              geometry={geometry}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
            >
              <meshStandardMaterial color={color} />
            </mesh>
            {hovered && (
              <Html position={[labelX, 0.3, labelY]}>
                <div className="bg-white text-black text-xs px-2 py-1 rounded shadow">
                  {item[xKey]}: {item[yKey]}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
};

export default DonutChart3D;
