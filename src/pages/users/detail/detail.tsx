import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserDetail, updateUser } from "../../../apiUtils";
import { UserError, Users } from "../types";
import "./detail.css";
import { isObjectNotEmpty } from "../../../util-functions";
import InputBox from "../../../components/Inputs/input";
import { paths } from "../../../router";
import Image from "../../../components/image";

type EditUserForm = {
  email: string;
  first_name: string;
  last_name: string;
};

export default function UserDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFromSubmitted] = useState(false);
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

  const checkFormError = (formDetails: EditUserForm) => {
    let isFormValid = true;
    let formErrors: EditUserForm = {
      email: "",
      first_name: "",
      last_name: "",
    };
    if (formDetails.email === "") {
      isFormValid = false;
      formErrors.first_name = "First Name is required";
    }
    if (formDetails.first_name === "") {
      isFormValid = false;
      formErrors.last_name = "Last Name is required";
    }
    if (formDetails.last_name === "") {
      isFormValid = false;
      formErrors.email = "Email is required";
    }
    setFormError(formErrors);
    return isFormValid;
  };

  useEffect(() => {
    if (formSubmitted) {
      checkFormError(userDetail);
    }
  }, [userDetail, formSubmitted]);

  const handleSubmit = async () => {
    setFromSubmitted(true);

    const { first_name, last_name, email } = userDetail;
    if (first_name !== "" && last_name !== "" && email !== "") {
      setIsLoading(true);
      const params = {
        name: first_name,
        job: "zion resident",
      };
      await updateUser(id, params);
      setIsLoading(false);
      navigate(paths.userList);
    }
  };

  const UserDetailsContainer = (userDetail: Users) => (
    <div className="center container ">
      <h1>User Details</h1>
      <div className="user-icon">
        <Image src={userDetail.avatar} alt="User Icon" />
      </div>
      <InputBox
        label="Email :"
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
        label="First Name :"
        type="text"
        id="first_name"
        name="first_name"
        placeholder="First Name:"
        value={userDetail.first_name}
        required={true}
        handleChange={handleChange}
      />
      {formError.email && (
        <div className="error-block">{formError.first_name}</div>
      )}
      <InputBox
        label="Last Name :"
        type="text"
        id="last_name"
        name="last_name"
        placeholder="Last Name:"
        value={userDetail.last_name}
        required={true}
        handleChange={handleChange}
      />
      {formError.email && (
        <div className="error-block">{formError.last_name}</div>
      )}
      <button className="save-user" type="button" onClick={handleSubmit}>
        Save
      </button>
      <div
        data-testid="back-btn"
        className="back-btn"
        onClick={() => navigate(paths.userList)}
      >
        Back
      </div>
    </div>
  );

  return (
    <>
      {isLoading && <div className="status-text">Fetching...</div>}
      {userDetail &&
        isObjectNotEmpty(userDetail) &&
        UserDetailsContainer(userDetail)}
    </>
  );
}
