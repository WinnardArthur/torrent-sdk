import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default function MapScreen() {
  const location = {
    latitude: 7.3247,
    longitude: -2.3051,
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          ...location,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={location}
          title="Test Location"
          description="Google Maps test"
        />
      </MapView>

      <View className="absolute left-4 right-4 top-14 rounded-2xl bg-white p-4">
        <Text className="text-lg font-bold">Google Maps</Text>

        <Text className="mt-1 text-gray-500">Map playground</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
