import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { fetchDevice } from "../utils/http";

export default function DeviceDetailScreen({ navigation, route }) {
  //   const [deviceId, setDeviceId] = useState(route.params.deviceId);

  const deviceId = route.params.deviceId;
  const [device, setDevice] = useState("");
  const [showIndicator, setShowIndicator] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Device ID: ${deviceId}`,
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="#0000ff" />
        </Pressable>
      ),
    });
  }, []);

  async function getDevice(id) {
    setShowIndicator(true);
    const response = await fetchDevice(id);
    setShowIndicator(false);
    setDevice(response);
  }

  useEffect(() => {
    getDevice(deviceId);
  }, []);

  if (showIndicator) {
    return <ActivityIndicator size={"large"} color={"#0000ff"} />;
  }
  return (
    <View>
      <Text>{device.name}</Text>
      <Text>{device.serialNumber}</Text>
      <Text>{device.location}</Text>
      <Text>{device.type}</Text>
      <Text>{device.createdAt}</Text>
    </View>
  );
}
