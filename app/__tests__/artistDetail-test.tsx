import React from "react";
import { render, screen } from "@testing-library/react-native";
import { useDispatch, useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";
import ArtistDetail from "@/app/artistDetail";
import { getArtistDetail } from "@/redux/reducer/artistdetail";

// Mock hooks from react-redux
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(() => jest.fn()), // Mock dispatch function
  useSelector: jest.fn(),
}));

// Mock hooks from expo-router
jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(() => ({ personId: "56322" })),
  useRouter: jest.fn(),
}));

describe("ArtistDetail component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render Loading component when isLoading is true", () => {
    (useSelector as jest.Mock).mockReturnValue({
      isLoading: true,
      artistDetail: null,
    });

    render(<ArtistDetail />);

    expect(screen.getByTestId("loading-indicator")).toBeTruthy();
  });

  it("should render artist details correctly when isLoading is false", () => {
    (useSelector as jest.Mock).mockReturnValue({
      isLoading: false,
      artistDetail: {
        profile_path: "profile.jpg",
        name: "Artist Name",
        known_for_department: "Acting",
        gender: 1,
        birthday: "1990-01-01",
        place_of_birth: "Place of Birth",
        biography: "This is a biography.",
      },
    });

    render(<ArtistDetail />);

    expect(screen.getByText("Artist Name")).toBeTruthy();
    expect(screen.getByText("known for")).toBeTruthy();
    expect(screen.getByText("Acting")).toBeTruthy();
    expect(screen.getByText("Gender")).toBeTruthy();
    expect(screen.getByText("Female")).toBeTruthy();
    expect(screen.getByText("Birthday")).toBeTruthy();
    expect(screen.getByText("1990-01-01")).toBeTruthy();
    expect(screen.getByText("Biography")).toBeTruthy();
    expect(screen.getByText("This is a biography.")).toBeTruthy();
  });

  it("should call getArtistDetail with correct personId on mount", () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    render(<ArtistDetail />);

    expect(mockDispatch).toHaveBeenCalledWith(
      getArtistDetail({ personId: "56322" }),
    );
  });
});
