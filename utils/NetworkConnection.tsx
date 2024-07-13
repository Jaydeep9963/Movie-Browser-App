import Feather from "@expo/vector-icons/Feather";
import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { Colors } from "@/constants/Colors";

const { height } = Dimensions.get("window");

NetInfo.configure({
  reachabilityUrl: "https://clients3.google.com/generate_204",
  reachabilityTest: async (response: any) => response.status === 204,
  reachabilityLongTimeout: 60 * 1000, // 60s
  reachabilityShortTimeout: 5 * 1000, // 5s
  reachabilityRequestTimeout: 15 * 1000, // 15s
  reachabilityShouldRun: () => true,
  shouldFetchWiFiSSID: true,
  useNativeReachability: false,
});

const InternetConnection: React.FC = () => {
  const theme = useColorScheme() ?? "light";
  const [isConnected, setConnected] = useState<boolean>(true);

  useEffect(() => {
    let unsubscribe: NetInfoSubscription;
    async function initilize() {
      unsubscribe = NetInfo.addEventListener(handleConnectivityChange);
    }
    function unsubscribeNetInfo() {
      unsubscribe();
    }
    initilize();

    return () => unsubscribeNetInfo();
  }, [isConnected]);

  const handleConnectivityChange = (status: NetInfoState) => {
    if (status) setConnected(status?.isInternetReachable!);
  };

  const refetchConnection = () => {
    NetInfo.refresh().then((state) => {
      setConnected(state.isConnected!);
    });
  };

  return !isConnected && isConnected !== null ? (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme === "dark" ? Colors.light.black : Colors.dark.whiteColor,
        },
      ]}
    >
      <Feather
        name="wifi-off"
        size={48}
        color={theme === "dark" ? Colors.light.whiteColor : Colors.dark.black}
      />
      <Text
        style={[
          styles.bannerText,
          {
            color:
              theme === "dark" ? Colors.light.whiteColor : Colors.dark.black,
            marginBottom: 15,
          },
        ]}
      >
        No internet connection
      </Text>
      <Button title="Try again" onPress={refetchConnection} />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  safeView: { flex: 1 },
  container: {
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerText: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "400",
  },
});

export default InternetConnection;
