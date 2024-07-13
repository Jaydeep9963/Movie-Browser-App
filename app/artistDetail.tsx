import Loading from "@/components/Loading";
import { Constants } from "@/constants/AppConstants";
import { getArtistDetail } from "@/redux/reducer/artistdetail";
import React, { useEffect } from "react";
import { Colors } from "@/constants/Colors";
import {
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useLocalSearchParams, useRouter } from "expo-router";

const ArtistDetail = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { personId } = params;
  const theme = useColorScheme() ?? "light";

  //communicate with redux
  const dispatch = useDispatch();

  const { isLoading, artistDetail } = useSelector(
    (state) => state.artistDetailReducer
  );

  // Api call
  useEffect(() => {
    dispatch(getArtistDetail({ personId }));
  }, []);

  // main view with loading while api call is going on
  return isLoading ? (
    <Loading />
  ) : (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainView}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <View style={styles.secondContainer}>
        <Image
          style={styles.imageView}
          source={{
            uri: `${Constants.IMAGE_URL}${artistDetail?.profile_path}`,
          }}
        />
        <View style={{ flexWrap: "wrap", flex: 1 }}>
          <View style={styles.artistInfoContainer}>
            <Text
              style={[
                styles.artistName,
                {
                  color:
                    theme === "light"
                      ? Colors.light.black
                      : Colors.dark.whiteColor,
                },
              ]}
            >
              {artistDetail?.name}
            </Text>
            <View style={styles.otherInfoContainer}>
              <Text
                style={[
                  styles.titleContent,
                  {
                    color:
                      theme === "light"
                        ? Colors.light.black
                        : Colors.dark.whiteColor,
                  },
                ]}
              >
                known for
              </Text>
              <Text
                style={[
                  styles.titleData,
                  {
                    color:
                      theme === "light"
                        ? Colors.light.black
                        : Colors.dark.whiteColor,
                  },
                ]}
              >
                {artistDetail?.known_for_department}
              </Text>
            </View>
            <View style={styles.otherInfoContainer}>
              <Text
                style={[
                  styles.titleContent,
                  {
                    color:
                      theme === "light"
                        ? Colors.light.black
                        : Colors.dark.whiteColor,
                  },
                ]}
              >
                Gender
              </Text>
              <Text
                style={[
                  styles.titleData,
                  {
                    color:
                      theme === "light"
                        ? Colors.light.black
                        : Colors.dark.whiteColor,
                  },
                ]}
              >
                {artistDetail?.gender === 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View style={styles.otherInfoContainer}>
              <Text
                style={[
                  styles.titleContent,
                  {
                    color:
                      theme === "light"
                        ? Colors.light.black
                        : Colors.dark.whiteColor,
                  },
                ]}
              >
                Birthday
              </Text>
              <Text
                style={[
                  styles.titleData,
                  {
                    color:
                      theme === "light"
                        ? Colors.light.black
                        : Colors.dark.whiteColor,
                  },
                ]}
              >
                {artistDetail?.birthday}
              </Text>
            </View>
            <View style={styles.otherInfoContainer}>
              <Text
                style={[
                  styles.titleContent,
                  {
                    color:
                      theme === "light"
                        ? Colors.light.black
                        : Colors.dark.whiteColor,
                  },
                ]}
              >
                Place of Birth
              </Text>
              <Text
                style={[
                  styles.titleData,
                  {
                    color:
                      theme === "light"
                        ? Colors.light.black
                        : Colors.dark.whiteColor,
                  },
                ]}
              >
                {artistDetail?.place_of_birth}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Text
        style={[
          styles.biography,
          {
            color:
              theme === "light" ? Colors.light.black : Colors.dark.whiteColor,
          },
        ]}
      >
        Biography
      </Text>
      <Text
        style={[
          {
            color:
              theme === "light" ? Colors.light.black : Colors.dark.whiteColor,
          },
        ]}
      >
        {artistDetail?.biography}
      </Text>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    margin: 8,
  },
  imageView: {
    height: 300,
    width: 190,
    resizeMode: "stretch",
    borderRadius: 16,
  },
  secondContainer: {
    flexDirection: "row",
  },
  artistInfoContainer: {
    paddingLeft: 16,
  },
  artistName: {
    fontSize: 24,
  },
  otherInfoContainer: {
    marginTop: 8,
  },
  titleContent: {
    fontSize: 13,
  },
  titleData: {
    fontSize: 16,
  },
  biography: {
    fontSize: 24,
    marginTop: 16,
    marginBottom: 8,
  },
});
export default ArtistDetail;
