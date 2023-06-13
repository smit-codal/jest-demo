import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { LoginPage } from "../../../pages/login/login";
import * as apiUtils from "../../../apiUtils";

beforeEach(() => {
  jest.resetAllMocks();
});

// jest.mock("../../../apiUtils", () => {
//     return {
//       loginUser: () =>
//         Promise.resolve({
//           token: "abc",
//         }),
//     };
//   });

describe("Login: ", () => {
  it("Renders Correctly and toogle password works", async () => {
    const { container } = render(
      <Router>
        <LoginPage />
      </Router>
    );

    expect(container.querySelector("h1")).toBeInTheDocument();

    const passwordElement = screen.getByPlaceholderText("Password");
    expect(passwordElement).toHaveAttribute('type', 'password')

    const togglePasswordBtn = screen.getByTestId("password-toggle")
    fireEvent.click(togglePasswordBtn)

    expect(passwordElement).toHaveAttribute('type', 'text')
  });

  it("Invalid Form logic works", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    const userNameElement = screen.getByPlaceholderText("Username");
    const passwordElement = screen.getByPlaceholderText("Password");

    fireEvent.change(userNameElement, { target: { value: "" } });
    fireEvent.change(passwordElement, { target: { value: "" } });

    const loginBtn = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginBtn);
  });

  it("Login Works properly", () => {
    jest.spyOn(apiUtils, "loginUser").mockResolvedValue({ token: "abc" });
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    const userNameElement = screen.getByPlaceholderText("Username");
    const passwordElement = screen.getByPlaceholderText("Password");

    fireEvent.change(userNameElement, { target: { value: "smit@codal.com" } });
    fireEvent.change(passwordElement, { target: { value: "Password@123" } });

    const loginBtn = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginBtn);
  });

  it("Catch block gets Rendered", () => {
    jest
      .spyOn(apiUtils, "loginUser")
      .mockRejectedValue(new Error("Something went wrong"));

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    const userNameElement = screen.getByPlaceholderText("Username");
    const passwordElement = screen.getByPlaceholderText("Password");

    fireEvent.change(userNameElement, { target: { value: "smit@codal.com" } });
    fireEvent.change(passwordElement, { target: { value: "Password@123" } });

    const loginBtn = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginBtn);
  });
});
