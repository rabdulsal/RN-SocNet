import { View, Text, StyleSheet } from "react-native";

export default function Card({ device }) {
  return (
    <View style={styles.card}>
      <Text>{device.name}</Text>
      <Text>{device.serialNumber}</Text>
      <Text>{device.location}</Text>
      <Text>{device.type}</Text>
      <Text>{device.createdAt}</Text>
    </View>
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
