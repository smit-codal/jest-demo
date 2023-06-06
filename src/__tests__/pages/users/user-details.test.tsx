import { render, screen } from "@testing-library/react";
import UserDetails from "../../../pages/users/detail/user-details";
import { BrowserRouter as Router } from "react-router-dom";


jest.mock("../../../apiUtils", () => {
  const user = {
    "id": 10,
    "email": "smit@codal.com",
    "first_name": "Smit",
    "last_name": "Raghani",
    "avatar": "https://reqres.in/img/faces/3-image.jpg"
}
  return {
    fetchUserDetail: () => Promise.resolve(user)
  }
})

describe("User Details:", () => {
  it("renders correctly", async () => {
    render(
      <Router>
        <UserDetails />
      </Router>
    );

    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});
