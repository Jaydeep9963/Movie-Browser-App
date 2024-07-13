import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Now Playing",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="popular"
        options={{
          title: "Popular",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "analytics" : "analytics-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="topRated"
        options={{
          title: "Top Rated",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "star" : "star-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="upcoming"
        options={{
          title: "UpComing",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "chevron-up" : "chevron-up-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
