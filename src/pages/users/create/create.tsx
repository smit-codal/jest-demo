import { useEffect, useState } from "react";
import "./create.css";
import { useNavigate } from "react-router-dom";
import InputBox from "../../../components/Inputs/input";
import { createUser } from "../../../apiUtils";
import { paths } from "../../../router";

export default function CreateUsers() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  type CreateUserForm = {
    name: string;
    job: string;
  };
  const [formDetails, setFormDetails] = useState<CreateUserForm>({
    name: "",
    job: "",
  });

  const [formError, setFormError] = useState<CreateUserForm>({
    name: "",
    job: "",
  });

  const [formSubmitted, setFromSubmitted] = useState(false);

  const handleInputChange = (value: string, key: string) => {
    setFormDetails({
      ...formDetails,
      [key]: value,
    });
  };

  const checkFormError = (formDetails: CreateUserForm) => {
    let isFormValid = true;
    let formErrors = {
      name: "",
      job: "",
    };
    if (formDetails.name === "") {
      isFormValid = false;
      formErrors.name = "Name is required";
    }
    if (formDetails.job === "") {
      isFormValid = false;
      formErrors.job = "Job is required";
    }
    setFormError(formErrors);
    return isFormValid;
  };

  useEffect(() => {
    if (formSubmitted) {
      checkFormError(formDetails);
    }
  }, [formDetails, formSubmitted]);

  const handleSubmit = async () => {
    setFromSubmitted(true);

    const { name, job } = formDetails;
    if (name !== "" && job !== "") {
      setIsLoading(true);
      try {
        const result = await createUser(formDetails);
        setIsLoading(false);
        navigate(paths.userList);
      } catch (e) {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className="user-container center">
        <h1>Create User</h1>
        {isLoading && <div className="status-text">Submitting...</div>}
        <form>
          <InputBox
            type="text"
            placeholder="Name"
            value={formDetails.name}
            name="name"
            handleChange={handleInputChange}
          />
          {formError.name && (
            <div className="error-block">{formError.name}</div>
          )}
          <InputBox
            type="text"
            placeholder="Job"
            value={formDetails.job}
            name="job"
            handleChange={handleInputChange}
          />
          {formError.job && <div className="error-block">{formError.job}</div>}
          
          <div className="submit-btn">
            <button type="button" className="" onClick={handleSubmit}>
              Create User
            </button>
          </div>
          <div className="back-btn" onClick={() => navigate(paths.userList)}>Back</div>
        </form>
      </div>
    </>
  );
}
