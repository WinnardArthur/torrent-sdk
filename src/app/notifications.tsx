import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NotificationsScreen() {
  const [permission, setPermission] = useState("Not requested");
  const [lastNotification, setLastNotification] = useState("None");

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        setLastNotification(
          notification.request.content.title ?? "Notification received",
        );
      },
    );

    return () => subscription.remove();
  }, []);

  const requestPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();

    setPermission(status);

    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Notification permission was not granted.",
      );
    }
  };

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello from Torrent SDK",
        body: "This is a local notification.",
      },
      trigger: null,
    });
  };

  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Scheduled notification",
        body: "This notification was scheduled 10 seconds ago.",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 10,
        repeats: false,
      },
    });

    Alert.alert("Scheduled", "A notification will appear in 10 seconds.");
  };

  const cancelScheduledNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();

    Alert.alert("Cancelled", "All scheduled notifications were cancelled.");
  };

  return (
    <View className="flex-1 bg-gray-50 p-5">
      <Text className="mt-10 text-3xl font-bold">Notification Playground</Text>

      <Text className="mt-2 text-gray-500">
        Test local and scheduled notifications.
      </Text>

      {/* Permission */}
      <View className="mt-8 rounded-2xl bg-white p-5">
        <Text className="text-lg font-bold">Permission</Text>

        <Text className="mt-2 text-gray-500">Status: {permission}</Text>

        <TouchableOpacity
          onPress={requestPermission}
          className="mt-4 rounded-xl bg-blue-600 p-4"
        >
          <Text className="text-center font-semibold text-white">
            Request Permission
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mt-4 rounded-2xl bg-white p-5">
        <Text className="text-lg font-bold">Local Notification</Text>

        <Text className="mt-2 text-gray-500">
          Send a notification immediately.
        </Text>

        <TouchableOpacity
          onPress={sendNotification}
          className="mt-4 rounded-xl bg-green-600 p-4"
        >
          <Text className="text-center font-semibold text-white">
            Send Notification
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mt-4 rounded-2xl bg-white p-5">
        <Text className="text-lg font-bold">Scheduled Notification</Text>

        <TouchableOpacity
          onPress={scheduleNotification}
          className="mt-4 rounded-xl bg-purple-600 p-4"
        >
          <Text className="text-center font-semibold text-white">
            Schedule 10 Seconds
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={cancelScheduledNotifications}
          className="mt-3 rounded-xl border border-gray-300 p-4"
        >
          <Text className="text-center font-semibold">Cancel Scheduled</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-4 rounded-2xl bg-white p-5">
        <Text className="text-lg font-bold">Last Notification</Text>

        <Text className="mt-2 text-gray-500">{lastNotification}</Text>
      </View>
    </View>
  );
}
