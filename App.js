import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroARSceneNavigator,
  ViroNode,
  ViroBox
} from '@reactvision/react-viro';

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

      setSensorData({
        temperatura: data.temperatura,
        humedad: data.humedad,
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

        {/* TÍTULO */}
        <ViroText
          text="Sensor IoT"
          scale={[0.3, 0.3, 0.3]}
          style={styles.title}
          position={[0, 0.4, 0]}
        />

        {/* DATOS */}
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
            { color: sensorData.estado === "Activo" ? "#efb6df" : "#d76db2" }
          ]}
          position={[0, -0.3, 0]}
        />

        <ViroText
          text={`Actualizado: ${sensorData.hora}`}
          scale={[0.18, 0.18, 0.18]}
          style={styles.text}
          position={[0, -0.45, 0]}
        />

        {/* BOTÓN REAL */}
        <ViroNode position={[0, -0.7, 0]} onClick={obtenerDatos}>
          <ViroBox
            scale={[0.6, 0.2, 0.1]}
          />
          <ViroText
            text="ACTUALIZAR"
            scale={[0.2, 0.2, 0.2]}
            style={styles.buttonText}
            position={[0, 0, 0.06]}
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
    color: '#F8BBD0', // rosado
    textAlign: 'center',
    fontWeight: 'bold'
  },
  text: {
    fontSize: 22,
    color: '#ffffff', // valores en blanco
    textAlign: 'center'
  },
  label: {
    fontSize: 22,
    color: '#F8BBD0', // etiquetas en rosado
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});