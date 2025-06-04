import { useMemo } from "react";
import { Text } from "@react-three/drei";

const BarChart3D = ({ data, xKey, yKey, color = "#3b82f6" }) => {
  const maxVal = Math.max(...data.map((d) => +d[yKey]));

  const bars = useMemo(() => {
    return data.map((item, index) => {
      const height = (+item[yKey] / maxVal) * 10;
      return {
        x: index * 2 - data.length,
        y: height / 2,
        height,
        label: item[xKey],
      };
    });
  }, [data, xKey, yKey]);

  return (
    <>
      {bars.map((bar, idx) => (
        <group key={idx} position={[bar.x, 0, 0]}>
          <mesh position={[0, bar.y, 0]}>
            <boxGeometry args={[1, bar.height, 1]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <Text
            position={[0, -0.8, 0]}
            fontSize={0.5}
            color="black"
            anchorX="center"
            anchorY="middle"
          >
            {bar.label}
          </Text>
        </group>
      ))}
    </>
  );
};

export default BarChart3D;
