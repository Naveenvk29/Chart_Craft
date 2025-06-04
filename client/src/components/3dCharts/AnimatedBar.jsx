// components/AnimatedBar.jsx
import React, { useState } from "react";
import { Html } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

export default function AnimatedBar({ x, height, label, color }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const spring = useSpring({
    scale: [1, height, 1],
    position: [x, height / 2, 0],
    config: { mass: 1, tension: 170, friction: 26 },
  });

  return (
    <group>
      <animated.mesh
        scale={spring.scale}
        position={spring.position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial color={clicked ? "#f87171" : color} />
      </animated.mesh>

      {hovered && (
        <Html center position={[x, height + 0.5, 0]}>
          <div className="bg-white text-black text-xs px-2 py-1 rounded shadow">
            {label}: {height}
          </div>
        </Html>
      )}
    </group>
  );
}
