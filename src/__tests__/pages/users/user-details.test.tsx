import { fireEvent, render, screen } from "@testing-library/react";
import UserDetails from "../../../pages/users/detail/user-details";
import { BrowserRouter as Router } from "react-router-dom";
import * as JestRouter from "react-router";
import { act } from "react-dom/test-utils";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: jest.fn(),
}));

jest.mock("../../../apiUtils", () => {
  const user = {
    id: 10,
    email: "smit@codal.com",
    first_name: "Smit",
    last_name: "Raghani",
    avatar: "https://reqres.in/img/faces/3-image.jpg",
  };
  return {
    fetchUserDetail: () => Promise.resolve(user),
  };
});

describe("User Details:", () => {
  it("renders correctly", async () => {
    jest.spyOn(JestRouter, "useParams").mockReturnValue({ id: "1" });
    const setUserDetail = jest.fn();
    await act(async () => {
      render(
        <Router>
          <UserDetails />
        </Router>
      );
    });
    setUserDetail.mockImplementation(() => {
      expect(setUserDetail).toHaveBeenCalled();
    });
    expect(screen.getByRole("heading")).toBeInTheDocument();
    const emailField = screen.getByLabelText("Email:");
    fireEvent.change(emailField, { target: { value: "smit@codal.com" } });
  });
});
