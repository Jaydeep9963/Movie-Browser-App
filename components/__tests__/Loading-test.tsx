import React from "react";
import { render } from "@testing-library/react-native";
import Loading from "@/components/Loading"; // Adjust the path as necessary
import { ActivityIndicator } from "react-native";

describe("Loading component", () => {
  it("should render correctly", () => {
    const { getByTestId, getByText } = render(<Loading />);
    const loadingIndicator = getByTestId("loading-indicator");
    const loadingText = getByText("Loading...");

    expect(loadingIndicator).toBeTruthy();
    expect(loadingText).toBeTruthy();
  });

  it("should display the activity indicator and loading text", () => {
    const { getByTestId, getByText } = render(<Loading />);
    const activityIndicator =
      getByTestId("loading-indicator").findByType(ActivityIndicator);
    const loadingText = getByText("Loading...");

    expect(activityIndicator).toBeTruthy();
    expect(loadingText).toBeTruthy();
  });
});
