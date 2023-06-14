import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CreateUsers from "../../../pages/users/create/create";
import { Provider } from "react-redux";
import store from "../../../store/store";

jest.mock("../../../apiUtils", () => {
  return {
    createUser: () => Promise.resolve(),
  };
});

beforeEach(() => {
  jest.resetAllMocks();
});

describe("User Details:", () => {
  it("renders correctly", async () => {
    render(
      <Provider store={store}>
        <Router>
          <CreateUsers />
        </Router>
      </Provider>
    );

    const createUserText = screen.getByRole("heading", {
      name: /create user/i,
    });
    expect(createUserText).toBeInTheDocument();
  });

  it("Required Validation Fires Properly", () => {
    render(
      <Provider store={store}>
        <Router>
          <CreateUsers />
        </Router>
      </Provider>
    );
    const name = screen.getByPlaceholderText("Name");
    const job = screen.getByPlaceholderText("Job");

    fireEvent.change(name, { target: { value: "" } });
    fireEvent.change(job, { target: { value: "" } });

    const saveBtn = screen.getByRole("button", { name: "Create User" });
    fireEvent.click(saveBtn);
  });

  it("Create Feature Works Properly", () => {
    render(
      <Provider store={store}>
        <Router>
          <CreateUsers />
        </Router>
      </Provider>
    );
    const name = screen.getByPlaceholderText("Name");
    const job = screen.getByPlaceholderText("Job");

    fireEvent.change(name, { target: { value: "Smit" } });
    fireEvent.change(job, { target: { value: "Software Engineer" } });

    const saveBtn = screen.getByRole("button", { name: "Create User" });
    fireEvent.click(saveBtn);
  });

  //   it("Catch Block Gets Rendered", () => {
  //     jest.resetAllMocks();

  //     jest.spyOn(JestRouter, "useParams").mockReturnValue({ id: "3" });
  //     jest
  //       .spyOn(APIUtils, "updateUser")
  //       .mockRejectedValue(new Error("Something Went Wrong"));
  //     render(
  //       <Router>
  //         <CreateUsers />
  //       </Router>
  //     );
  //     const emailField = screen.getByLabelText("Email :");
  //     const firstName = screen.getByLabelText("First Name :");
  //     const lastName = screen.getByLabelText("Last Name :");

  //     fireEvent.change(emailField, { target: { value: "smit@codal.com" } });
  //     fireEvent.change(firstName, { target: { value: "smit" } });
  //     fireEvent.change(lastName, { target: { value: "raghani" } });

  //     const saveBtn = screen.getByRole("button", { name: "Save" });

  //     // handle catch block

  //     fireEvent.click(saveBtn);
  //   });

  it("Back Button Gets Pressed", () => {
    render(
      <Provider store={store}>
        <Router>
          <CreateUsers />
        </Router>
      </Provider>
    );
    const backBtn = screen.getByTestId("back-btn");
    fireEvent.click(backBtn);
  });
});
