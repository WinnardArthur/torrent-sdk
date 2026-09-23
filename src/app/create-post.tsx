import { createPost } from "@/api/post";
import { usePostStore } from "@/store/post-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { z } from "zod";

interface FormValues {
  title: string;
  body: string;
}

export const createPostSchema = z.object({
  title: z.string().min(3, "Title is too short"),

  body: z.string().min(10, "Description is too short"),
});

export default function CreatePostScreen() {
  const addPost = usePostStore((state) => state.addPost);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({ resolver: zodResolver(createPostSchema) });

  const onSubmit = async (data: FormValues) => {
    try {
      console.log("Hello");
      const response = await createPost(data.title, data.body);

      console.log(response);
      addPost({
        ...response,
        id: Date.now(),
      });

      Alert.alert("Success", "Post created successfully");

      router.back();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to create post");
    }
  };

  return (
    <View className="flex-1 bg-slate-50 p-5">
      <Text className="mb-6 text-3xl font-bold">New Article</Text>

      <Controller
        control={control}
        name="title"
        rules={{
          required: "Title is required",
        }}
        render={({ field: { onChange, value } }) => (
          <View className="mb-4 rounded-2xl bg-white p-4 border border-gray-300">
            <TextInput
              placeholder="Title"
              value={value}
              onChangeText={onChange}
              className="mb-4 rounded-2xl bg-white p-4 border border-gray-300"
            />

            {errors.title && (
              <Text className="text-red-500">{errors.title.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="body"
        rules={{
          required: "Description is required",
        }}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              placeholder="Description"
              multiline
              numberOfLines={5}
              value={value}
              onChangeText={onChange}
              className="rounded-2xl bg-white p-4 border border-gray-300"
            />

            {errors.body && (
              <Text className="text-red-500">{errors.body.message}</Text>
            )}
          </>
        )}
      />

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className="mt-6 rounded-2xl bg-blue-600 py-4"
      >
        <Text className="text-center font-semibold text-white">
          {isSubmitting ? "Publishing..." : "Publish"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
