import { Constants } from "@/constants/AppConstants";
import { Colors } from "@/constants/Colors";
import { MovieItem } from "@/types/MovieItem";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

interface MovieListProps {
  movies: Array<MovieItem>;
  onPress: (item: MovieItem) => void;
  loadMoreData: () => void;
}

const MovieList = (props: MovieListProps) => {
  const { movies, onPress, loadMoreData } = props;
  const [isLoading, setIsLoading] = useState(true);
  const theme = useColorScheme() ?? "light";

  // movie items for movie list
  const movieItem = ({ item }: { item: MovieItem }) => {
    return (
      <TouchableOpacity
        style={styles.movieItemContainer}
        onPress={() => onPress(item)}
      >
        <ImageBackground
          imageStyle={{ borderRadius: 18 }}
          source={
            isLoading
              ? require("../assets/images/placeholder.jpeg")
              : { uri: `${Constants.IMAGE_URL}${item.poster_path}` }
          }
        >
          <Image
            style={styles.imageView}
            source={{
              uri: `${Constants.IMAGE_URL}${item.poster_path}`,
            }}
            onLoadEnd={() => {
              setIsLoading(false);
            }}
          />
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.mainView,
        {
          backgroundColor:
            theme === "light"
              ? Colors.light.whiteColor
              : Colors.dark.whiteColor,
        },
      ]}
    >
      <FlatList
        style={styles.flatListContainer}
        data={movies}
        extraData={movies}
        renderItem={movieItem}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.2}
        onEndReached={() => loadMoreData()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  flatListContainer: {
    marginHorizontal: 4,
    marginTop: 4,
  },
  movieItemContainer: { flex: 1 / 2, margin: 4 },
  imageView: {
    height: 270,
    borderRadius: 18,
    resizeMode: "cover",
  },
});

export default MovieList;
