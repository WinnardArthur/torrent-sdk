import "@/global.css";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />

      <Stack.Screen
        name="details"
        options={{
          title: "Details",
        }}
      />

      <Stack.Screen
        name="create-post"
        options={{
          title: "Create Post",
        }}
      />

      <Stack.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />

      <Stack.Screen
        name="camera"
        options={{
          title: "Camera",
        }}
      />

      <Stack.Screen
        name="video"
        options={{
          title: "Videos",
        }}
      />
    </Stack>
  );
}
