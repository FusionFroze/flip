import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#161B22" },
        headerTintColor: "#F0F6FC",
        tabBarStyle: { backgroundColor: "#161B22" },
        headerShadowVisible: false,
        tabBarActiveTintColor: "#F5C842",
        sceneStyle: { backgroundColor: "#0D1117" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Flip",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "book-sharp" : "book-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
