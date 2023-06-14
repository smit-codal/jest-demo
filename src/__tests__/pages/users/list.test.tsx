import { fireEvent, render, screen } from "@testing-library/react";
import UsersList from "../../../pages/users/list/list";
import { BrowserRouter as Router } from "react-router-dom";
jest.mock("../../../apiUtils", () => {
  const users = [
    {
      id: 1,
      email: "smit@codal.com",
      first_name: "Smit",
      last_name: "Raghani",
      avatar: "https://reqres.in/img/faces/1-image.jpg",
    },
  ];
  return {
    getUsers: () => Promise.resolve({ data: users }),
  };
});

afterEach(() => jest.clearAllMocks());

describe("Users: ", () => {
  it("users renders correctly and apis get mocked", async () => {
    const { container } = render(
      <Router>
        <UsersList />
      </Router>
    );

    // find heading Element
    const headingElement = screen.getByRole("heading");
    expect(headingElement).toBeInTheDocument();

    // find table element

    const unorderListElement = await screen.findByRole("table");
    expect(unorderListElement).toBeInTheDocument();

    const tableBody = container.querySelector("tbody");

    const row = tableBody?.querySelector("tr");

    if (row) {
      fireEvent.click(row);
    }
  });

  it("user gets logout", () => {
    render(
      <Router>
        <UsersList />
      </Router>
    );
    const headingElement = screen.getByTestId("logout-btn");
    fireEvent.click(headingElement)

    const createUserBtn = screen.getByRole("button")
    fireEvent.click(createUserBtn)
  })
  
});
