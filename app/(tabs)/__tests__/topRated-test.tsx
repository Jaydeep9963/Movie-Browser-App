import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import * as redux from "react-redux";
import TopRated from "@/app/(tabs)/topRated"; // Adjust the path as necessary

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockedUseDispatch = redux.useDispatch as jest.Mock;
const mockedUseSelector = redux.useSelector as jest.Mock;

describe("TopRated component", () => {
  beforeEach(() => {
    mockedUseDispatch.mockClear();
    mockedUseSelector.mockClear();
  });

  it("should render correctly", () => {
    // Mock the dispatch function
    const mockDispatch = jest.fn();
    mockedUseDispatch.mockReturnValue(mockDispatch);

    // Mock the state returned by useSelector
    mockedUseSelector.mockReturnValue({
      isLoading: false,
      movieList: [],
    });

    const { getByTestId } = render(<TopRated />);
    expect(getByTestId("safe-area-view")).toBeTruthy();
  });

  it("should load more data when the end is reached", () => {
    const mockDispatch = jest.fn();
    mockedUseDispatch.mockReturnValue(mockDispatch);
    mockedUseSelector.mockReturnValue({
      isLoading: false,
      movieList: [
        {
          id: 1,
          title: "Test Movie",
          poster_path: "",
          release_date: "",
          vote_average: 0,
        },
      ],
    });

    const { getByTestId } = render(<TopRated />);

    fireEvent.scroll(getByTestId("flat-list"), {
      nativeEvent: {
        contentOffset: {
          y: 500,
        },
        contentSize: {
          height: 1000,
          width: 100,
        },
        layoutMeasurement: {
          height: 500,
          width: 100,
        },
      },
    });

    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
