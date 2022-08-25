import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const BASE_URL = "https://mockend.com/learningmachine00/testAPI/Device";

  const [allDevices, setAllDevices] = useState([]);
  const [filterDevices, setFilterDevices] = useState(allDevices);

  useEffect(() => {
    async function getDevices() {
      const response = await axios.get(BASE_URL);
      // console.log(JSON.stringify(response));
      setAllDevices(response.data);
      setFilterDevices(allDevices);
    }
    getDevices();
  }, []);

  function renderDeviceItem(deviceData) {
    const device = deviceData.item;
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

  function textChanged(text) {
    if (text === "") {
      setFilterDevices(allDevices);
      return;
    }
    const fDevices = allDevices.filter((device) => {
      return (
        device.name.toLowerCase().includes(text.toLowerCase()) ||
        device.location.toLowerCase().includes(text.toLowerCase())
      );
    });
    setFilterDevices(fDevices);
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={"Search by Name or Locations"}
        style={styles.input}
        onChangeText={textChanged}
      />
      <FlatList
        data={filterDevices}
        renderItem={renderDeviceItem}
        keyExtractor={(item) => item.serialNumbera}
      />
      <Text>Hello World.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  card: {
    padding: 8,
    marginHorizontal: 24,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  input: {
    paddingHorizontal: 8,
    marginTop: 50,
    marginHorizontal: 24,
    height: 50,
    backgroundColor: "#f1f1f1",
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 10,
  },
});
