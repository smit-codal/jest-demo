import { fireEvent, render, screen } from "@testing-library/react";
import UserDetails from "../../../pages/users/detail/detail";
import { BrowserRouter as Router } from "react-router-dom";
import * as JestRouter from "react-router";
import * as APIUtils from "../../../apiUtils";


// mocking the react-router package
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
    fetchUserDetail: () => Promise.resolve({ data: user }),
    updateUser: () => Promise.resolve(),
  };
});

beforeEach(() => {
  jest.resetAllMocks();
});

describe("User Details:", () => {
  it("renders correctly", async () => {
    jest.spyOn(JestRouter, "useParams").mockReturnValue({ id: "1" });
    const setUserDetail = jest.fn();
    // act warning
    // await act(async () => {
    //   render(
    //     <Router>
    //       <UserDetails />
    //     </Router>
    //   );
    // });
    render(
      <Router>
        <UserDetails />
      </Router>
    );
    setUserDetail.mockImplementation(() => {
      expect(setUserDetail).toHaveBeenCalled();
    });
    expect(screen.getByRole("heading")).toBeInTheDocument();

    const ImageElement = await screen.findByRole('img', {  name: /user icon/i })
    expect(ImageElement).toBeInTheDocument()
  });

  it("Required Validation Fires Properly", () => {
    jest.spyOn(JestRouter, "useParams").mockReturnValue({ id: "3" });
    render(
      <Router>
        <UserDetails />
      </Router>
    );
    const emailField = screen.getByLabelText("Email :");
    const firstName = screen.getByLabelText("First Name :");
    const lastName = screen.getByLabelText("Last Name :");

    fireEvent.change(emailField, { target: { value: "" } });
    fireEvent.change(firstName, { target: { value: "" } });
    fireEvent.change(lastName, { target: { value: "" } });

    const saveBtn = screen.getByRole("button", { name: "Save" });
    fireEvent.click(saveBtn);
  });

  it("Edit Feature Works Properly", () => {
    jest.spyOn(JestRouter, "useParams").mockReturnValue({ id: "3" });
    render(
      <Router>
        <UserDetails />
      </Router>
    );
    const emailField = screen.getByLabelText("Email :");
    const firstName = screen.getByLabelText("First Name :");
    const lastName = screen.getByLabelText("Last Name :");

    fireEvent.change(emailField, { target: { value: "smit@codal.com" } });
    fireEvent.change(firstName, { target: { value: "smit" } });
    fireEvent.change(lastName, { target: { value: "raghani" } });

    const saveBtn = screen.getByRole("button", { name: "Save" });
    fireEvent.click(saveBtn);
  });

  it("Catch Block Gets Rendered", () => {
    jest.resetAllMocks();

    jest.spyOn(JestRouter, "useParams").mockReturnValue({ id: "3" });
    jest
      .spyOn(APIUtils, "updateUser")
      .mockRejectedValue(new Error("Something Went Wrong"));
    render(
      <Router>
        <UserDetails />
      </Router>
    );
    const emailField = screen.getByLabelText("Email :");
    const firstName = screen.getByLabelText("First Name :");
    const lastName = screen.getByLabelText("Last Name :");

    fireEvent.change(emailField, { target: { value: "smit@codal.com" } });
    fireEvent.change(firstName, { target: { value: "smit" } });
    fireEvent.change(lastName, { target: { value: "raghani" } });

    const saveBtn = screen.getByRole("button", { name: "Save" });

    // handle catch block

    fireEvent.click(saveBtn);
  });

  it("Back Button Gets Pressed", () => {
    jest.spyOn(JestRouter, "useParams").mockReturnValue({ id: "3" });
    render(
      <Router>
        <UserDetails />
      </Router>
    );
    const backBtn = screen.getByTestId("back-btn");
    fireEvent.click(backBtn);
  });
});
