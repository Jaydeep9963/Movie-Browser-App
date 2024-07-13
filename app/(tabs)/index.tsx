import Loading from "@/components/Loading";
import MovieList from "@/components/MovieList";
import { getMovieList } from "@/redux/reducer/movielist";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const router = useRouter();
  //communicate with redux
  const { isLoading, movieList } = useSelector(
    (state) => state.movieListReducer,
  );
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();

  // Api call
  useEffect(() => {
    dispatch(getMovieList({ page: pageNumber }));
  }, [pageNumber]);

  return (
    <SafeAreaView style={styles.mainContainer} testID="safe-area-view">
      <MovieList
        movies={movieList}
        loadMoreData={() => {
          setPageNumber(pageNumber + 1);
        }}
        onPress={(item) =>
          router.push({
            pathname: "movieDetail",
            params: { movieId: item.id },
          })
        }
      />
      {isLoading && <Loading />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default Home;
