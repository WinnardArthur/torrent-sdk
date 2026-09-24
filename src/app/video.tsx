import * as ImagePicker from "expo-image-picker";
import { VideoView, useVideoPlayer } from "expo-video";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

export default function VideoScreen() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const remotePlayer = useVideoPlayer(
    "https://www.w3schools.com/html/mov_bbb.mp4",
  );

  const localPlayer = useVideoPlayer(
    require("../../assets/videos/test.webm"),
  );

  const galleryPlayer = useVideoPlayer(selectedVideo ?? "");

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["videos"],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedVideo(result.assets[0].uri);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-slate-100"
      contentContainerStyle={{
        padding: 16,
      }}
    >
      <Text className="mb-6 text-3xl font-bold">Video Playground</Text>

      {/* Remote Video */}
      <Text className="mb-2 text-lg font-semibold">Remote Video</Text>

      <VideoView
        player={remotePlayer}
        style={{
          width: "100%",
          height: 220,
        }}
        allowsPictureInPicture
        nativeControls
      />

      <TouchableOpacity
        className="mt-2 rounded-xl bg-blue-600 p-3"
        onPress={() => remotePlayer.play()}
      >
        <Text className="text-center text-white">Play Remote Video</Text>
      </TouchableOpacity>

      {/* Local Asset */}
      <Text className="mt-8 mb-2 text-lg font-semibold">Local Asset Video</Text>

      <VideoView
        player={localPlayer}
        style={{
          width: "100%",
          height: 220,
        }}
        nativeControls
      />

      <TouchableOpacity
        className="mt-2 rounded-xl bg-green-600 p-3"
        onPress={() => localPlayer.play()}
      >
        <Text className="text-center text-white">Play Local Video</Text>
      </TouchableOpacity>

      {/* Gallery Picker */}
      <Text className="mt-8 mb-2 text-lg font-semibold">Gallery Video</Text>
      <TouchableOpacity
        className="rounded-xl bg-purple-600 p-4 mb-20"
        onPress={pickVideo}
      >
        <Text className="text-center text-white">Pick Video</Text>
      </TouchableOpacity>

      {selectedVideo && (
        <>
          <Text className="mt-4 text-sm">Selected:</Text>

          <Text numberOfLines={2} className="mb-4 text-xs">
            {selectedVideo}
          </Text>

          <VideoView
            player={galleryPlayer}
            style={{
              width: "100%",
              height: 220,
            }}
            // allowsFullscreen
            nativeControls
          />

          <TouchableOpacity
            className="mt-2 rounded-xl bg-orange-600 p-3"
            onPress={() => galleryPlayer.play()}
          >
            <Text className="text-center text-white">Play Selected Video</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}
