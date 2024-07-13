import Loading from "@/components/Loading";
import { Constants } from "@/constants/AppConstants";
import { getArtist } from "@/redux/reducer/artist";
import { Colors } from "@/constants/Colors";
import { getMovieDetail } from "@/redux/reducer/moviedetail";
import { getSimilarMovie } from "@/redux/reducer/similarmovie";
import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useLocalSearchParams, useRouter } from "expo-router";

const MovieDetail = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const theme = useColorScheme() ?? "light";
  const { movieId } = params;

  //communicate with redux
  const dispatch = useDispatch();

  const { isLoading, movieDetail } = useSelector(
    (state) => state.movieDetailReducer,
  );
  const { movieList } = useSelector((state) => state.similarMovieReducer);
  const { cast } = useSelector((state) => state.artistReducer);

  // Api call
  useEffect(() => {
    dispatch(getMovieDetail({ movieId }));
    dispatch(getSimilarMovie({ movieId: movieId }));
    dispatch(getArtist({ movieId: movieId }));
  }, []);

  const similarItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.movieItemContainer}
        onPress={() =>
          router.replace({
            pathname: "movieDetail",
            params: { movieId: item.id },
          })
        }
      >
        <Image
          style={styles.similarImageView}
          source={{
            uri: `${Constants.IMAGE_URL}${item.poster_path}`,
          }}
        />
      </TouchableOpacity>
    );
  };

  const artistItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.movieItemContainer}
        onPress={() => {
          router.navigate({
            pathname: "artistDetail",
            params: { personId: item.id },
          });
        }}
      >
        <Image
          style={[
            styles.artistImageView,
            {
              borderColor:
                theme === "light"
                  ? Colors.light.inputTextBorderColor
                  : Colors.dark.inputTextBorderColor,
            },
          ]}
          source={{
            uri: `${Constants.IMAGE_URL}${item.profile_path}`,
          }}
        />
      </TouchableOpacity>
    );
  };

  // main view with loading while api call is going on
  return isLoading ? (
    <Loading />
  ) : (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainView}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <Image
        style={styles.imageView}
        source={{
          uri: `${Constants.IMAGE_URL}${movieDetail?.poster_path}`,
        }}
      />
      <View style={styles.secondContainer}>
        <Text
          style={[
            styles.title,
            {
              color:
                theme === "light" ? Colors.light.black : Colors.dark.whiteColor,
            },
          ]}
        >
          {movieDetail.title}
        </Text>
        <View style={styles.thirdContainer}>
          <View style={styles.fourthContainer}>
            <Text
              style={[
                styles.infoTitleData,
                {
                  color:
                    theme === "light"
                      ? Colors.light.black
                      : Colors.dark.whiteColor,
                },
              ]}
            >
              {movieDetail.original_language}
            </Text>
            <Text style={styles.infoTitle}>Language</Text>
          </View>
          <View style={styles.fourthContainer}>
            <Text
              style={[
                styles.infoTitleData,
                {
                  color:
                    theme === "light"
                      ? Colors.light.black
                      : Colors.dark.whiteColor,
                },
              ]}
            >
              {movieDetail.vote_average}
            </Text>
            <Text style={styles.infoTitle}>Rating</Text>
          </View>
          <View style={styles.fourthContainer}>
            <Text
              style={[
                styles.infoTitleData,
                {
                  color:
                    theme === "light"
                      ? Colors.light.black
                      : Colors.dark.whiteColor,
                },
              ]}
            >
              {movieDetail.runtime} min
            </Text>
            <Text style={styles.infoTitle}>Duration</Text>
          </View>
          <View style={styles.fourthContainer}>
            <Text
              style={[
                styles.infoTitleData,
                {
                  color:
                    theme === "light"
                      ? Colors.light.black
                      : Colors.dark.whiteColor,
                },
              ]}
            >
              {movieDetail.release_date}
            </Text>
            <Text style={styles.infoTitle}>Release Date</Text>
          </View>
        </View>
        <Text
          style={[
            styles.description,
            {
              color:
                theme === "light" ? Colors.light.black : Colors.dark.whiteColor,
            },
          ]}
        >
          Description
        </Text>
        <Text
          style={[
            {
              color:
                theme === "light" ? Colors.light.black : Colors.dark.whiteColor,
            },
          ]}
        >
          {movieDetail.overview}
        </Text>
        <Text
          style={[
            styles.description,
            {
              color:
                theme === "light" ? Colors.light.black : Colors.dark.whiteColor,
            },
          ]}
        >
          Similar
        </Text>
        <FlatList
          style={styles.flatListContainer}
          data={movieList}
          renderItem={similarItem}
          keyExtractor={(item, index) => index}
          horizontal={true}
        />
        <Text
          style={[
            styles.description,
            {
              color:
                theme === "light" ? Colors.light.black : Colors.dark.whiteColor,
            },
          ]}
        >
          Artist
        </Text>
        <FlatList
          style={styles.flatListContainer}
          data={cast}
          renderItem={artistItem}
          keyExtractor={(item, index) => index}
          horizontal={true}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  imageView: {
    height: 270,
    resizeMode: "cover",
  },
  secondContainer: {
    flex: 1,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  thirdContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  infoTitle: { fontSize: 12 },
  infoTitleData: { fontSize: 14, fontWeight: "bold" },
  fourthContainer: {
    flex: 1,
  },
  description: {
    marginTop: 8,
    fontSize: 19,
    fontWeight: "bold",
  },
  flatListContainer: {
    flex: 1,
    marginTop: 4,
  },
  movieItemContainer: { margin: 4 },
  similarImageView: {
    height: 150,
    width: 120,
    borderRadius: 12,
    resizeMode: "cover",
  },
  artistImageView: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginHorizontal: 4,
    borderWidth: 1.5,
    resizeMode: "cover",
  },
});
export default MovieDetail;
