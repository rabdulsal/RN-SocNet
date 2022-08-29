import { View, Text, StyleSheet, Pressable } from "react-native";

export default function Card({ device, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress.bind(this, device.id)}>
      <Text>{device.name}</Text>
      <Text>{device.serialNumber}</Text>
      <Text>{device.location}</Text>
      <Text>{device.type}</Text>
      <Text>{device.createdAt}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 8,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
});
