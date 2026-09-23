import { useCameraStore } from "@/store/camera-store";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const { setPhoto } = useCameraStore((state) => state);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading permissions...</Text>
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync();

    if (!photo) return;

    setPhoto(photo.uri);
    router.push("/photo-preview");

    console.log(photo.uri);
  };

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center p-5">
        <Text className="mb-4 text-center">Camera access is required.</Text>

        <TouchableOpacity
          onPress={requestPermission}
          className="rounded-xl bg-blue-600 px-6 py-4"
        >
          <Text className="text-white">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />

      <TouchableOpacity
        onPress={takePicture}
        className="absolute bottom-10 self-center rounded-full bg-white p-6"
      />
    </View>
  );
}
