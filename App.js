import { CameraView, useCameraPermissions } from 'expo-camera';
import { Text, View, Button, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();

  const [sensor, setSensor] = useState({
    temperatura: 0,
    humedad: 0,
    ubicacion: "San Salvador",
    estado: "Activo"
  });

  // 🔵 Simulación de API
  const obtenerDatos = () => {
    setSensor({
      temperatura: Math.floor(Math.random() * 35),
      humedad: Math.floor(Math.random() * 100),
      ubicacion: "San Salvador",
      estado: "Activo"
    });
  };

  // 🔄 cada 5 segundos
  useEffect(() => {
    obtenerDatos();
    const interval = setInterval(obtenerDatos, 5000);
    return () => clearInterval(interval);
  }, []);

  // permisos cámara
  if (!permission) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Cargando cámara...</Text>
    </View>
  );
}
  if (!permission.granted) {
    return <Button title="Permitir cámara" onPress={requestPermission} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView style={StyleSheet.absoluteFill} facing="back">

        {/* 🧊 PANEL AR */}
        <View style={styles.panel}>
          <Text style={styles.text}>🌡 Temp: {sensor.temperatura}°C</Text>
          <Text style={styles.text}>💧 Humedad: {sensor.humedad}%</Text>
          <Text style={styles.text}>📍 Ubicación: {sensor.ubicacion}</Text>
          <Text style={styles.text}>⚡ Estado: {sensor.estado}</Text>
        </View>

        {/* 🔘 BOTÓN */}
        <View style={styles.boton}>
          <Button title="Actualizar" onPress={obtenerDatos} />
        </View>

      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    top: 120,
    left: 30,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 15
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5
  },
  boton: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center'
  }
});