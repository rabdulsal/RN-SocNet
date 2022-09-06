import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import Card from "../components/Card";

export default function DevicesScreen() {
  const BASE_URL = "https://mockend.com/learningmachine00/testAPI/Device";

  const [allDevices, setAllDevices] = useState([]);
  const [filterDevices, setFilterDevices] = useState([]);

  useEffect(() => {
    async function getDevices() {
      const response = await axios.get(BASE_URL);
      const deviceData = await response.data;
      setAllDevices(deviceData);
      setFilterDevices(deviceData);
    }
    getDevices();
  }, []);

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

  function renderDevices(deviceItem) {
    const device = deviceItem.item;

    return (
      //   <View style={styles.card}>
      //     <Text>{device.name}</Text>
      //     <Text>{device.serialNumber}</Text>
      //     <Text>{device.location}</Text>
      //     <Text>{device.type}</Text>
      //     <Text>{device.createdAt}</Text>
      //   </View>
      <Card device={device} />
    );
  }

  return (
    <View>
      <TextInput
        placeholder={"Search by Name or Location"}
        style={styles.input}
        onChangeText={textChanged}
      />
      <View style={styles.countRow}>
        <Text style={styles.countLabel}>Devices Count:</Text>
        <Text style={styles.countText}>{filterDevices.length}</Text>
      </View>
      <FlatList
        data={filterDevices}
        keyExtractor={(item) => item.serialNumber + Math.random()}
        renderItem={renderDevices}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  countRow: {
    flexDirection: "row",
    marginHorizontal: 24,
    marginVertical: 10,
  },
  countLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#aaa",
  },
  countText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 8,
  },
  card: {
    padding: 8,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    paddingHorizontal: 8,
    marginTop: 10,
    marginHorizontal: 16,
    height: 50,
    backgroundColor: "#f5f5f5",
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 10,
  },
});
