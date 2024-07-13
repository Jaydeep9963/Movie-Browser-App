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
  Text,
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
        <View
          style={[
            styles.movieItemView,
            {
              backgroundColor:
                theme === "light" ? Colors.light.black : Colors.dark.whiteColor,
            },
          ]}
        >
          <Image
            style={styles.imageView}
            source={
              isLoading
                ? require("../assets/images/placeholder.jpeg")
                : { uri: `${Constants.IMAGE_URL}${item.poster_path}` }
            }
            onLoadEnd={() => {
              setIsLoading(false);
            }}
          />
          <View style={[styles.movieDetailsContainer]}>
            <Text
              style={[
                styles.title,
                {
                  color:
                    theme === "light"
                      ? Colors.light.whiteColor
                      : Colors.dark.black,
                },
              ]}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text
                style={[
                  styles.infoTitleData,
                  {
                    color:
                      theme === "light"
                        ? Colors.light.whiteColor
                        : Colors.dark.black,
                  },
                ]}
              >
                {new Date(item.release_date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </Text>
              <Text
                style={[
                  styles.infoTitleData,
                  {
                    color:
                      theme === "light"
                        ? Colors.light.whiteColor
                        : Colors.dark.black,
                  },
                ]}
              >
                ⭐️{item.vote_average.toFixed(2) + "/10"}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.mainView,
        {
          backgroundColor:
            theme === "light" ? Colors.light.whiteColor : Colors.dark.black,
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
        testID="flat-list"
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
  movieItemView: {
    flex: 1,
    borderRadius: 18,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  movieDetailsContainer: {
    padding: 8,
  },
  infoTitleData: { fontSize: 10, fontWeight: "500" },
});

export default MovieList;
