import { useCameraStore } from "@/store/camera-store";
import { Image, View } from "react-native";


export default function PreviewScreen() {
  const photoUri = useCameraStore((state) => state.photoUri);

  return (
    <View className="flex-1 bg-black">
      <Image
        source={{
          uri: photoUri,
        }}
        className="flex-1"
      />
    </View>
  );
}
