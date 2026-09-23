import { getPostById } from "@/api/post";
import { Post } from "@/types/post";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPostById();
  }, []);

  const fetchPostById = async () => {
    try {
      const data = await getPostById(id.toString());
      setPost(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-semibold text-blue-500">Loading...</Text>
      </View>
    );
  }

  if (post === undefined) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-semibold text-blue-500">
          Post not found
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50 p-5">
      <Text className="text-3xl font-bold text-slate-900">{post.title}</Text>

      <Text className="mt-6 text-base leading-7 text-slate-600">
        {post.body}
      </Text>

      <TouchableOpacity className="mt-8 rounded-2xl bg-blue-600 py-4">
        <Text className="text-center font-semibold text-white">
          Edit Article
        </Text>
      </TouchableOpacity>
    </View>
  );
}
