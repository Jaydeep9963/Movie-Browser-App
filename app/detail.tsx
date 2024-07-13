import Loading from "@/components/Loading";
import { Constants } from "@/constants/AppConstants";
import { getArtist } from "@/redux/reducer/artist";
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
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const MovieDetail = ({ navigation, route }) => {
  const { movieId } = route.params;
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
        onPress={() => navigation.replace("MovieDetail", { movieId: item.id })}
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
          navigation.navigate("ArtistDetail", { personId: item.id });
        }}
      >
        <Image
          style={styles.artistImageView}
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
    <ScrollView style={styles.mainView}>
      <Image
        style={styles.imageView}
        source={{
          uri: `${Constants.IMAGE_URL}${movieDetail?.poster_path}`,
        }}
      />
      <View style={styles.secondContainer}>
        <Text style={styles.title}>{movieDetail.title}</Text>
        <View style={styles.thirdContainer}>
          <View style={styles.fourthContainer}>
            <Text style={styles.infoTitleData}>
              {movieDetail.original_language}
            </Text>
            <Text style={styles.infoTitle}>Language</Text>
          </View>
          <View style={styles.fourthContainer}>
            <Text style={styles.infoTitleData}>{movieDetail.vote_average}</Text>
            <Text style={styles.infoTitle}>Rating</Text>
          </View>
          <View style={styles.fourthContainer}>
            <Text style={styles.infoTitleData}>{movieDetail.runtime} min</Text>
            <Text style={styles.infoTitle}>Duration</Text>
          </View>
          <View style={styles.fourthContainer}>
            <Text style={styles.infoTitleData}>{movieDetail.release_date}</Text>
            <Text style={styles.infoTitle}>Release Date</Text>
          </View>
        </View>
        <Text style={styles.description}>Description</Text>
        <Text>{movieDetail.overview}</Text>
        <Text style={styles.description}>Similar</Text>
        <FlatList
          style={styles.flatListContainer}
          data={movieList}
          renderItem={similarItem}
          keyExtractor={(item, index) => index}
          horizontal={true}
        />
        <Text style={styles.description}>Artist</Text>
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
    resizeMode: "stretch",
  },
  secondContainer: {
    flex: 1,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  title: {
    fontSize: 20,
    color: COLOR.black,
    fontWeight: "bold",
  },
  thirdContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  infoTitle: { fontSize: 12 },
  infoTitleData: { fontSize: 14, color: COLOR.black, fontWeight: "bold" },
  fourthContainer: {
    flex: 1,
  },
  description: {
    marginTop: 8,
    fontSize: 19,
    color: COLOR.black,
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
    borderColor: COLOR.inputTextBorderColor,
    resizeMode: "cover",
  },
});
export default MovieDetail;
