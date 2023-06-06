import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserDetail } from "../../../apiUtils";
import { Users } from "../types";
import "./user-detail.css";
import { isObjectNotEmpty } from "../../../util-functions";
import InputBox from "../../../components/Inputs/input";

export default function UserDetails() {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState<Users>({
    avatar: "",
    email: "",
    first_name: "",
    id: "",
    last_name: "",
  });

  useEffect(() => {
    async function fetchUser(id: string) {
      const user = await fetchUserDetail(id);
      console.log(user)
      setUserDetail(user);
    }
    if (id) fetchUser(id);
  }, [id]);

  const handleChange = (value: string, name: string) => {
    setUserDetail({
      ...userDetail,
      [name]: value,
    });
  };

  const UserDetailsContainer = (userDetail: Users) => (
    <div className="container">
      <div className="user-icon">
        <img src={userDetail.avatar} alt="User Icon" />
      </div>
      <div className="field">
        <InputBox
          label="Email: "
          type="email"
          id="email"
          name="email"
          value={userDetail.email}
          required={true}
          handleChange={handleChange}
        />
      </div>
      <div className="field">
        <InputBox
          label="First Name:"
          type="text"
          id="first_name"
          name="first_name"
          value={userDetail.first_name}
          required={true}
          handleChange={handleChange}
        />
      </div>
      <div className="field">
        <InputBox
          label="Last Name:"
          type="text"
          id="last_name"
          name="last_name"
          value={userDetail.last_name}
          required={true}
          handleChange={handleChange}
        />
      </div>
      <button className="submit-btn" type="submit">
        Submit
      </button>
    </div>
  );

  return (
    <>
      <h1>User Details</h1>
      {userDetail && isObjectNotEmpty(userDetail) && UserDetailsContainer(userDetail)}
    </>
  );
}
