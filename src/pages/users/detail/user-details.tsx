import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { fetchUserDetail } from "../../../apiUtils";
import { UserError, Users } from "../types";
import "./user-detail.css";
import { isObjectNotEmpty } from "../../../util-functions";
import InputBox from "../../../components/Inputs/input";
import { paths } from "../../../router";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState<Users>({
    avatar: "",
    email: "",
    first_name: "",
    id: "",
    last_name: "",
  });
  const [formError, setFormError] = useState<UserError>({
    email: "",
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    async function fetchUser(id: string) {
      const { data } = await fetchUserDetail(id);
      // console.log(data);
      setUserDetail(data);
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
    <div className="center container ">
      <h1>User Details</h1>
      <div className="user-icon">
        <img src={userDetail.avatar} alt="User Icon" />
      </div>
      <InputBox
        label="Email: "
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={userDetail.email}
        required={true}
        handleChange={handleChange}
      />
      {formError.email && <div className="error-block">{formError.email}</div>}
      <InputBox
        label="First Name:"
        type="text"
        id="first_name"
        name="first_name"
        placeholder="First Name:"
        value={userDetail.first_name}
        required={true}
        handleChange={handleChange}
      />
      {formError.email && <div className="error-block">{formError.first_name}</div>}
      <InputBox
        label="Last Name:"
        type="text"
        id="last_name"
        name="last_name"
        placeholder="Last Name:"
        value={userDetail.last_name}
        required={true}
        handleChange={handleChange}
      />
      {formError.email && <div className="error-block">{formError.last_name}</div>}
      <button className="save-user" type="submit">
        Save
      </button>
      <div className="back-btn" onClick={() => navigate(paths.userList)}>
        Back
      </div>
    </div>
  );

  return (
    <>
      {userDetail &&
        isObjectNotEmpty(userDetail) &&
        UserDetailsContainer(userDetail)}
    </>
  );
}
