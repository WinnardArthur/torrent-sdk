import { useProfileStore } from "@/store/profile-store";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { updateAvatar, updateProfile, avatar, name, email } = useProfileStore(
    (state) => state,
  );

  const [visible, setVisible] = useState(false);

  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      updateAvatar(result.assets[0].uri);
    }
  };

  return (
    <View>
      <View className="bg-slate-50 p-5">
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1789349050760-cc196eed88b1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          className="h-32 w-full self-center rounded-3xl"
        />

        <Text className="mt-8 text-2xl text-center">{newName}</Text>
        <Text className="text-center">{newEmail}</Text>

        <Image
          source={
            avatar
              ? { uri: avatar }
              : require("../../assets/images/lake antorno.jpeg")
          }
          className="h-32 w-32 rounded-full self-center mt-12"
        />

        <TouchableOpacity
          onPress={pickImage}
          className="mt-4 rounded-xl bg-blue-600 px-4 py-3"
        >
          <Text className="text-center text-white">Change Avatar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setVisible(true)}
          className="mt-5 rounded-xl border border-slate-300 py-4"
        >
          <Text className="text-center text-black">Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/camera")}
          className="mt-5 rounded-xl border border-slate-100 py-4"
        >
          <Text className="text-center text-black">Selfie</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={visible} animationType="slide">
        <View className="flex-1 bg-white p-5">
          <Text className="mb-5 text-2xl font-bold">Edit Profile</Text>

          <TextInput
            value={newName}
            className="mb-4 rounded-xl border border-slate-200 p-4"
            onChangeText={setNewName}
          />

          <TextInput
            value={newEmail}
            className="rounded-xl border border-slate-200 p-4"
            onChangeText={setNewEmail}
          />

          <TouchableOpacity
            onPress={() => {
              updateProfile(name, email);
              setVisible(false);
            }}
            className="mt-5 rounded-xl bg-blue-600 py-4"
          >
            <Text className="text-center text-white">Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
