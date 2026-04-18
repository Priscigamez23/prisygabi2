import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroARSceneNavigator,
  ViroNode,
  ViroBox,
  ViroMaterials
} from '@reactvision/react-viro';

ViroMaterials.createMaterials({
  botonMaterial: {
    diffuseColor: "#F8BBD0" 
  }
});

const HelloWorldSceneAR = () => {

  const [sensorData, setSensorData] = useState({
    temperatura: "--",
    humedad: "--",
    ubicacion: "Cargando...",
    estado: "...",
    hora: ""
  });

  const API_URL = "https://mocki.io/v1/af2be996-bedf-438b-bae0-ae28a998271a";

  const obtenerDatos = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("API error");

      const data = await response.json();

      const temp = Number(data.temperatura) || 25;
      const hum = Number(data.humedad) || 60;

      setSensorData({
        temperatura: (temp + (Math.random() * 2 - 1)).toFixed(1),
        humedad: (hum + (Math.random() * 4 - 2)).toFixed(0),
        ubicacion: data.ubicacion || "San Salvador",
        estado: data.estado || "Activo",
        hora: new Date().toLocaleTimeString()
      });

    } catch (error) {
      console.log("ERROR:", error);

      setSensorData({
        temperatura: "Error",
        humedad: "Error",
        ubicacion: "Sin conexión",
        estado: "Offline",
        hora: "--"
      });
    }
  };

  useEffect(() => {
    obtenerDatos();
    const interval = setInterval(obtenerDatos, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ViroARScene autofocus={true}>

      <ViroNode position={[0, 0, -2]}>

        <ViroText
          text="Sensor IoT"
          scale={[0.3, 0.3, 0.3]}
          style={styles.title}
          position={[0, 0.4, 0]}
        />

        <ViroText
          text={`Temperatura: ${sensorData.temperatura} °C`}
          scale={[0.25, 0.25, 0.25]}
          style={styles.text}
          position={[0, 0.2, 0]}
        />

        <ViroText
          text={`Humedad: ${sensorData.humedad} %`}
          scale={[0.25, 0.25, 0.25]}
          style={styles.text}
          position={[0, 0.05, 0]}
        />

        <ViroText
          text={`Ubicación: ${sensorData.ubicacion}`}
          scale={[0.22, 0.22, 0.22]}
          style={styles.text}
          position={[0, -0.1, 0]}
        />

        <ViroText
          text={`Estado: ${sensorData.estado}`}
          scale={[0.22, 0.22, 0.22]}
          style={[
            styles.text,
            { color: sensorData.estado === "Activo" ? "#F48FB1" : "#E57373" }
          ]}
          position={[0, -0.32, 0]}
        />

        <ViroText
          text={`Actualizado: ${sensorData.hora}`}
          scale={[0.18, 0.18, 0.18]}
          style={styles.text}
          position={[0, -0.45, 0]}
        />

        <ViroNode
          position={[0, -0.65, 0]}
          onClickState={(state) => {
            if (state === 1) {
              obtenerDatos();
            }
          }}
        >
          <ViroBox
            scale={[0.5, 0.12, 0.05]} 
            materials={["botonMaterial"]}
          />

          <ViroText
            text="ACTUALIZAR"
            scale={[0.25, 0.25, 0.25]}
            position={[0, 0, 0.04]}
            style={styles.buttonText}
          />
        </ViroNode>

      </ViroNode>

    </ViroARScene>
  );
};

export default function App() {
  return (
    <ViroARSceneNavigator
      initialScene={{ scene: HelloWorldSceneAR }}
      style={{ flex: 1 }}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    color: '#e988af', 
    textAlign: 'center',
    fontWeight: 'bold'
  },
  text: {
    fontSize: 22,
    color: '#ffffff',
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: '#e28fb3', 
    textAlign: 'center',
    fontWeight: 'bold'
  }
});