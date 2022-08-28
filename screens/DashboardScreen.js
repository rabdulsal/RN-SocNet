import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Card from "../components/Card";
import * as Networking from "../utils/http";

export default function DashboardScreen() {
  //   let filteredDevices = devices;
  const [allDevices, setAllDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [showIndicator, setShowIndicator] = useState(false);

  const filters = [
    {
      title: "Switch",
      filter: "f",
    },
    {
      title: "Router",
      filter: "d",
    },
    {
      title: "Cable Modem",
      filter: "e",
    },
  ];

  useEffect(() => {
    async function fetchDevices() {
      setShowIndicator(true);
      const response = await Networking.fetchDevices();
      setShowIndicator(false);
      setAllDevices(response);
      setFilteredDevices(response);
    }
    fetchDevices();
  }, []);

  const buttons = [];

  function pressedFilterButton(title) {
    const filtered = allDevices.filter((device) => device.location === title);
    setFilteredDevices(filtered);
    // filteredDevices = filtered;
  }

  function renderDevice(deviceData) {
    const device = deviceData.item;
    return (
      <Card device={device} />
      //   <View>
      //     {/* <Card device={device} /> */}
      //     <Text>Test Clip</Text>
      //   </View>
    );
  }

  for (var idx = 0; idx < filters.length; idx++) {
    // console.log(title);
    const filter = filters[idx];
    buttons.push(
      <Pressable
        style={styles.button}
        onPress={pressedFilterButton.bind(this, filter.filter)}
      >
        <Text style={styles.buttonTitle}>{filter.title}</Text>
      </Pressable>
    );
  }

  if (!showIndicator) {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.filterTitle}>Filters:</Text>
          <View style={styles.filterButtons}>{buttons}</View>
          <View style={styles.info}>
            <Text style={styles.infoTitle}>Total Devices</Text>
            <Text style={styles.infoText}>{filteredDevices.length}</Text>
          </View>
          <FlatList
            data={filteredDevices}
            keyExtractor={(item) =>
              item.serialNumber + new Date() + Math.random()
            }
            renderItem={renderDevice}
          />
        </View>
      </>
    );
  }
  return (
    <ActivityIndicator
      size="large"
      color="#0000ff"
      style={{ justifyContent: "center", alignItems: "center" }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  filterTitle: {
    color: "#aaa",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  filterButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 5,
    backgroundColor: "blue",
    width: "30%",
    borderRadius: 6,
  },
  buttonTitle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  info: {
    flexDirection: "row",
    marginVertical: 10,
  },
  infoTitle: {
    color: "#aaa",
    fontSize: 12,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
