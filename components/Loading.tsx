import { Colors } from "@/constants/Colors";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

const { height, width } = Dimensions.get("window");

const Loading = () => {
  const theme = useColorScheme() ?? "light";

  return (
    <View
      testID="loading-indicator"
      style={[
        styles.containerLoading,
        {
          backgroundColor:
            theme === "light"
              ? Colors.light.loadingBackgroundColor
              : Colors.dark.loadingBackgroundColor,
        },
      ]}
    >
      <View
        style={[
          styles.containerIndicator,
          {
            backgroundColor:
              theme === "light"
                ? Colors.light.transparentColor
                : Colors.dark.transparentColor,
          },
        ]}
      >
        <ActivityIndicator
          size={"large"}
          color={
            theme === "light"
              ? Colors.light.primaryColor
              : Colors.dark.primaryColor
          }
        />
        <Text
          style={[
            styles.loadingTextStyle,
            {
              color:
                theme === "light"
                  ? Colors.light.primaryColor
                  : Colors.dark.primaryColor,
            },
          ]}
        >
          Loading...
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerLoading: {
    width,
    height,
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: width / 1.2,
    borderRadius: 2,
  },
  loadingTextStyle: {
    fontSize: 25,
    marginLeft: 20,
  },
});
export default Loading;
