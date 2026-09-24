import { usePostStore } from "@/store/post-store";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const posts = usePostStore((state) => state.posts);
  const loading = usePostStore((state) => state.loading);
  const fetchPosts = usePostStore((state) => state.fetchPosts);

  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-semibold text-blue-500">Loading...</Text>
      </View>
    );
  }

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <View className="bg-slate-50 flex-1">
      <View className="px-5 pt-6 pb-4">
        <View className="flex flex-row justify-between items-center">
          <Text className="text-3xl font-bold text-slate-900">Discover</Text>

          <View className="flex flex-row items-center gap-6">
            <TouchableOpacity
              className="block"
              onPress={() => router.push("/profile")}
            >
              <Text className="text-blue-500 font-bold">Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="block"
              onPress={() => router.push("/video")}
            >
              <Text className="text-purple-500 font-bold">Videos</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text className="mt-2 text-slate-500">
          Browse the latest articles and updates.
        </Text>
      </View>

      <View className="px-5 mb-4">
        <TextInput
          placeholder="Search articles..."
          value={query}
          onChangeText={setQuery}
          className="rounded-2xl bg-white p-4 border border-gray-300"
        />
      </View>

      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchPosts} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mb-4 rounded-3x bg-white p-5"
            onPress={() =>
              router.push({ pathname: "/details", params: { id: item.id } })
            }
          >
            <Text className="text-lg font-semibold text-slate-900">
              {item.title}
            </Text>

            <Text className="mt-2 text-slate-500 leading-6" numberOfLines={3}>
              {item.body}
            </Text>

            <View className="mt-4 flex-row justify-between">
              <Text className="text-xs text-slate-400">Article #{item.id}</Text>

              <Text className="text-xs font-medium text-blue-600">
                Read More
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="items-center py-16">
            <Text className="text-slate-500">No articles found</Text>
          </View>
        }
      />

      <TouchableOpacity
        onPress={() => router.push("/create-post")}
        className="absolute bottom-20 right-6 h-16 w-16 items-center justify-center rounded-full bg-blue-600"
      >
        <Text className="text-3xl text-white">+</Text>
      </TouchableOpacity>
    </View>
  );
}
