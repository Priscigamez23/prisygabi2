import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroARSceneNavigator,
  ViroNode
} from '@reactvision/react-viro';

const HelloWorldSceneAR = () => {

  const [sensorData, setSensorData] = useState({
    temperatura: "--",
    humedad: "--",
    ubicacion: "Cargando...",
    estado: "..."
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
        temperatura: temp + Math.floor(Math.random() * 3),
        humedad: hum + Math.floor(Math.random() * 5),
        ubicacion: data.ubicacion || "San Salvador",
        estado: data.estado || "Activo"
      });

    } catch (error) {
      console.log("ERROR:", error);

      setSensorData({
        temperatura: "Error",
        humedad: "Error",
        ubicacion: "Sin conexión",
        estado: "Offline"
      });
    }
  };

  useEffect(() => {
    obtenerDatos();
    const interval = setInterval(obtenerDatos, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ViroARScene>

    
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
          text={`Ubicacion: ${sensorData.ubicacion}`}
          scale={[0.22, 0.22, 0.22]}
          style={styles.text}
          position={[0, -0.1, 0]}
        />

        <ViroText
          text={`Estado: ${sensorData.estado}`}
          scale={[0.22, 0.22, 0.22]}
          style={styles.text}
          position={[0, -0.25, 0]}
        />

        <ViroText
          text="Actualizar"
          scale={[0.28, 0.28, 0.28]}
          style={styles.button}
          position={[0, -0.45, 0]}
          onClick={obtenerDatos}
        />

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
    color: '#9A64A1',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  text: {
    fontSize: 22,
    color: '#ffffff',
    textAlign: 'center',
  },
  button: {
    fontSize: 24,
    color: '#9A64A1',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});