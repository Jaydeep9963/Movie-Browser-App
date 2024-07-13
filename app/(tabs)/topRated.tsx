import Loading from "@/components/Loading";
import MovieList from "@/components/MovieList";
import { getTopRatedMovie } from "@/redux/reducer/toprated";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const TopRatedScreen = () => {
  const router = useRouter();
  //communicate with redux
  const { isLoading, movieList } = useSelector(
    (state) => state.popularMovieReducer,
  );
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();

  // Api call
  useEffect(() => {
    dispatch(getTopRatedMovie({ page: pageNumber }));
  }, [pageNumber]);

  // main view with loading while api call is going on
  return (
    <SafeAreaView style={styles.mainContainer}>
      <MovieList
        movies={movieList}
        onPress={(item) =>
          router.navigate({
            pathname: "detail",
            params: { movieId: item.id },
          })
        }
        loadMoreData={() => {
          setPageNumber(pageNumber + 1);
        }}
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

export default TopRatedScreen;
