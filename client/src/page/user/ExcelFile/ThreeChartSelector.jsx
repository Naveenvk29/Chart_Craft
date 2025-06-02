import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const chartTypes = ["bar", "line", "pie", "doughnut"];

const ThreeChartSelector = ({ data }) => {
  const [chartType, setChartType] = useState("bar");
  const [xField, setXField] = useState("");
  const [yField, setYField] = useState("");

  const mountRef = useRef(null);
  const fontRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);

  const dataFields = data.length > 0 ? Object.keys(data[0]) : [];

  // Load font only once
  useEffect(() => {
    const loader = new FontLoader();
    loader.load(
      "https://unpkg.com/three@0.126.0/examples/fonts/helvetiker_regular.typeface.json",
      (font) => {
        fontRef.current = font;
      }
    );
  }, []);

  // Main chart render effect
  useEffect(() => {
    if (!fontRef.current || !xField || !yField || data.length === 0) return;

    // Cleanup previous scene
    if (rendererRef.current) {
      rendererRef.current.dispose();
      if (mountRef.current) {
        mountRef.current.innerHTML = "";
      }
    }

    const width = 600;
    const height = 400;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 50);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 20, 20);
    scene.add(light);

    const axesHelper = new THREE.AxesHelper(20);
    scene.add(axesHelper);

    const objectsToDispose = [];

    if (chartType === "bar") {
      const barWidth = 1;
      const gap = 0.5;
      const maxVal = Math.max(...data.map((d) => Number(d[yField])));

      data.forEach((d, i) => {
        const value = Number(d[yField]);
        const heightVal = (value / maxVal) * 15;

        const geometry = new THREE.BoxGeometry(barWidth, heightVal, barWidth);
        const material = new THREE.MeshStandardMaterial({ color: 0x0074d9 });
        const bar = new THREE.Mesh(geometry, material);

        bar.position.x =
          i * (barWidth + gap) - ((data.length - 1) * (barWidth + gap)) / 2;
        bar.position.y = heightVal / 2;

        scene.add(bar);
        objectsToDispose.push(geometry, material);

        // Label
        const textGeo = new TextGeometry(String(d[xField]), {
          font: fontRef.current,
          size: 0.7,
          height: 0.1,
        });
        const textMat = new THREE.MeshBasicMaterial({ color: 0x333333 });
        const textMesh = new THREE.Mesh(textGeo, textMat);

        textMesh.position.set(bar.position.x - 0.5, -1.5, 0);
        textMesh.rotation.x = -Math.PI / 8;

        scene.add(textMesh);
        objectsToDispose.push(textGeo, textMat);
      });
    }

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    controlsRef.current = controls;

    // Cleanup function
    return () => {
      controls.dispose();
      renderer.dispose();
      objectsToDispose.forEach((obj) => obj.dispose && obj.dispose());
      if (mountRef.current) {
        mountRef.current.innerHTML = "";
      }
    };
  }, [chartType, xField, yField, data]);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <label>
          Chart Type:{" "}
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            {chartTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label style={{ marginLeft: 16 }}>
          X Field:{" "}
          <select value={xField} onChange={(e) => setXField(e.target.value)}>
            <option value="">Select</option>
            {dataFields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </label>
        <label style={{ marginLeft: 16 }}>
          Y Field:{" "}
          <select value={yField} onChange={(e) => setYField(e.target.value)}>
            <option value="">Select</option>
            {dataFields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div
        ref={mountRef}
        style={{ width: 600, height: 400, border: "1px solid #ccc" }}
      />
    </div>
  );
};

export default ThreeChartSelector;
